package main

import (
	"crypto/sha256"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/mail"
	"net/url"
	"strconv"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type VerifyRequest struct {
	LessonID int    `json:"lesson_id"`
	Code     string `json:"code"`
}

type VerifyResponse struct {
	Success bool   `json:"success"`
	Stdout  string `json:"stdout"`
	Errors  string `json:"errors,omitempty"`
}

type SaveProgressRequest struct {
	LessonID int `json:"lesson_id"`
}

// Новая структура для красивого ответа прогресса, как просил фронтенд
type ProgressResponse struct {
	PassedLessons []int `json:"passed_lessons"`
	IsProActive   bool  `json:"is_pro_active"`
}

var AppSalt string

const OldSalt = "SuperSecretSaltGoCourse2026"

func hashWithSalt(password, salt string) string {
	h := sha256.New()
	h.Write([]byte(password + salt))
	return fmt.Sprintf("%x", h.Sum(nil))
}

func main() {
	var err error
	db, err = sql.Open("sqlite3", "./course.db")
	if err != nil {
		log.Fatalf("Ошибка открытия БД: %v", err)
	}
	defer db.Close()

	initDatabase()

	fs := http.FileServer(http.Dir("./frontend"))
	http.Handle("/", fs)

	http.HandleFunc("/api/auth/register", handleRegister)
	http.HandleFunc("/api/auth/login", handleLogin)
	http.HandleFunc("/api/lessons/progress", handleGetProgress)
	http.HandleFunc("/api/lessons/verify", handleVerify)
	http.HandleFunc("/api/lessons/save-progress", handleSaveProgress)

	// Наш новый тестовый эндпоинт для эмуляции успешной оплаты
	http.HandleFunc("/api/auth/test-pay", handleTestPay)

	port := ":8081"
	fmt.Printf("🚀 Сервер запущен на http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}

func initDatabase() {
	queries := []string{
		// Добавили поле is_pro_active. В SQLite булево значение — это INTEGER (0 или 1)
		`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          is_pro_active INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
       );`,

		`CREATE TABLE IF NOT EXISTS user_progress (
          user_id INTEGER NOT NULL,
          lesson_id INTEGER NOT NULL,
          passed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, lesson_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
       );`,

		`CREATE INDEX IF NOT EXISTS idx_users_email_password ON users(email, password);`,
		`CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_progress(lesson_id);`,
	}

	for _, q := range queries {
		_, err := db.Exec(q)
		if err != nil {
			log.Fatalf("Ошибка инициализации структуры БД: %v", err)
		}
	}
}

func handleRegister(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	// 1. Проверка на пустоту
	if req.Email == "" || req.Password == "" {
		http.Error(w, "Email и пароль не могут быть пустыми", http.StatusBadRequest)
		return
	}

	// 2. Валидация email по маске
	_, err := mail.ParseAddress(req.Email)
	if err != nil {
		http.Error(w, "Некорректный формат Email", http.StatusBadRequest)
		return
	}

	securePassword := hashWithSalt(req.Password, AppSalt)

	_, err = db.Exec("INSERT INTO users (email, password) VALUES (?, ?)", req.Email, securePassword)
	if err != nil {
		http.Error(w, "Пользователь с таким Email уже существует", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Регистрация успешна"})
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	// 1. Получаем ID и текущий хэш из БД
	var userID int
	var dbHash string
	err := db.QueryRow("SELECT id, password FROM users WHERE email = ?", req.Email).Scan(&userID, &dbHash)
	if err != nil {
		http.Error(w, "Неверный email или пароль", http.StatusUnauthorized)
		return
	}

	// 2. Проверяем пароль
	// Сначала пытаемся проверить с НОВОЙ солью (AppSalt)
	currentHash := hashWithSalt(req.Password, AppSalt)

	if dbHash != currentHash {
		// Если не подошло, проверяем со СТАРОЙ солью (OldSalt)
		oldHash := hashWithSalt(req.Password, OldSalt)
		if dbHash == oldHash {
			// Пароль верный, но он на старой соли. Срочно обновляем хэш в БД!
			_, err = db.Exec("UPDATE users SET password = ? WHERE id = ?", currentHash, userID)
			if err != nil {
				log.Printf("Ошибка миграции пароля для юзера %d: %v", userID, err)
			}
		} else {
			// Пароль не подошел ни по одной соли
			http.Error(w, "Неверный email или пароль", http.StatusUnauthorized)
			return
		}
	}

	// 3. Если дошли сюда — логин успешен. Ставим куку
	cookie := &http.Cookie{
		Name:     "user_id",
		Value:    strconv.Itoa(userID),
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(24 * time.Hour),
	}
	http.SetCookie(w, cookie)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "user_id": userID})
}

func getUserIDFromCookie(r *http.Request) (int, error) {
	cookie, err := r.Cookie("user_id")
	if err != nil {
		return 0, err
	}
	return strconv.Atoi(cookie.Value)
}

// ОБНОВЛЕННЫЙ МЕТОД: Возвращает и прогресс, и статус PRO
func handleGetProgress(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromCookie(r)
	if err != nil {
		http.Error(w, "Не авторизован", http.StatusUnauthorized)
		return
	}

	// 1. Получаем статус PRO пользователя
	var isProInt int
	err = db.QueryRow("SELECT is_pro_active FROM users WHERE id = ?", userID).Scan(&isProInt)
	if err != nil {
		isProInt = 0
	}

	// 2. Получаем список пройденных уроков
	rows, err := db.Query("SELECT lesson_id FROM user_progress WHERE user_id = ?", userID)
	if err != nil {
		http.Error(w, "Ошибка базы данных", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	passedLessons := []int{}
	for rows.Next() {
		var lid int
		if err := rows.Scan(&lid); err == nil {
			passedLessons = append(passedLessons, lid)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	// Отдаем строго по структуре
	json.NewEncoder(w).Encode(ProgressResponse{
		PassedLessons: passedLessons,
		IsProActive:   isProInt == 1,
	})
}

func handleVerify(w http.ResponseWriter, r *http.Request) {
	//_, err := getUserIDFromCookie(r)
	//if err != nil {
	//	http.Error(w, "Не авторизован", http.StatusUnauthorized)
	//	return
	//}

	if r.Method != http.MethodPost {
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	var req VerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	resp, err := http.PostForm("https://play.golang.org/compile", url.Values{
		"version": {"2"},
		"body":    {req.Code},
	})
	if err != nil {
		http.Error(w, "Ошибка связи с компилятором Google", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)

	var googleResponse struct {
		Errors string `json:"Errors"`
		Events []struct {
			Message string `json:"Message"`
		} `json:"Events"`
	}
	if err := json.Unmarshal(bodyBytes, &googleResponse); err != nil {
		http.Error(w, "Ошибка разбора ответа компилятора", http.StatusInternalServerError)
		return
	}

	if googleResponse.Errors != "" {
		json.NewEncoder(w).Encode(VerifyResponse{
			Success: false,
			Errors:  googleResponse.Errors,
		})
		return
	}

	var stdoutBuilder strings.Builder
	for _, event := range googleResponse.Events {
		stdoutBuilder.WriteString(event.Message)
	}
	stdout := stdoutBuilder.String()

	json.NewEncoder(w).Encode(VerifyResponse{
		Success: true,
		Stdout:  stdout,
	})
}

func handleSaveProgress(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromCookie(r)
	if err != nil {
		http.Error(w, "Не авторизован", http.StatusUnauthorized)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	var req SaveProgressRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	_, err = db.Exec(`INSERT INTO user_progress (user_id, lesson_id) 
                      VALUES (?, ?) 
                      ON CONFLICT(user_id, lesson_id) DO NOTHING`, userID, req.LessonID)
	if err != nil {
		log.Printf("Ошибка сохранения прогресса: %v", err)
		http.Error(w, "Ошибка БД", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

// ТЕСТОВЫЙ ОБРАБОТЧИК ДЛЯ ЭМУЛЯЦИИ ОПЛАТЫ
func handleTestPay(w http.ResponseWriter, r *http.Request) {
	userID, err := getUserIDFromCookie(r)
	if err != nil {
		http.Error(w, "Не авторизован", http.StatusUnauthorized)
		return
	}

	// Переключаем флаг на 1 (true)
	_, err = db.Exec("UPDATE users SET is_pro_active = 1 WHERE id = ?", userID)
	if err != nil {
		log.Printf("Ошибка активации PRO: %v", err)
		http.Error(w, "Ошибка обновления статуса в БД", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "message": "PRO статус успешно активирован!"})
}
