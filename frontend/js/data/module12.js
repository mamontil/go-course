// js/data/module12.js
export const module12Lessons = [
    {
        id: 87,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 87: Табличные тесты — как тестируют в Go",
        theory: `
            <h2>Урок 87: Table-driven tests</h2>
            <p>В Go не пишут десять функций TestAddOne, TestAddTwo... Пишут <b>одну</b>: слайс структур «вход → ожидаемый выход», цикл, сравнение. Это табличные тесты — стандарт де-факто во всей индустрии Go.</p>
            <p>Сам фреймворк <code class="inline">go test</code> — отдельная экосистема (файлы <code class="inline">*_test.go</code>), недоступная в песочнице, но <b>логика таблицы</b> живёт и в main: слайс кейсов + проверка + PASS/FAIL.</p>
            <p>Третий кейс таблицы ждёт правильный <code class="inline">want</code>: что вернёт add(-5, 5)?</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Допиши ожидаемое значение для кейса "cancel" — программа должна напечатать три PASS и <code class="inline">passed: 3</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">add</span>(a, b <span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">int</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> a + b<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tests := []<span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name string<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a, b int<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;want int<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #a5d6ff;">"positive"</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>, <span style="color: #79c0ff;">5</span>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #a5d6ff;">"with zero"</span>, <span style="color: #79c0ff;">0</span>, <span style="color: #79c0ff;">7</span>, <span style="color: #79c0ff;">7</span>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #a5d6ff;">"cancel"</span>, -<span style="color: #79c0ff;">5</span>, <span style="color: #79c0ff;">5</span>, <textarea id="user-code" rows="2" placeholder='0' style="color: #79c0ff; font-weight: normal;"></textarea>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;passed := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, t := <span style="color: #ff7b72;">range</span> tests {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> add(t.a, t.b) == t.want {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"PASS:"</span>, t.name)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;passed++<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <span style="color: #ff7b72;">else</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"FAIL:"</span>, t.name)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"passed:"</span>, passed)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc add(a, b int) int {\n\treturn a + b\n}\n\nfunc main() {\n\ttests := []struct {\n\t\tname   string\n\t\ta, b   int\n\t\twant   int\n\t}{\n\t\t{"positive", 2, 3, 5},\n\t\t{"with zero", 0, 7, 7},\n\t\t{"cancel", -5, 5, ${input}},\n\t}\n\tpassed := 0\n\tfor _, t := range tests {\n\t\tif add(t.a, t.b) == t.want {\n\t\t\tfmt.Println("PASS:", t.name)\n\t\t\tpassed++\n\t\t} else {\n\t\t\tfmt.Println("FAIL:", t.name)\n\t\t}\n\t}\n\tfmt.Println("passed:", passed)\n}`,
        validate: (stdout) => stdout.trim() === "PASS: positive\nPASS: with zero\nPASS: cancel\npassed: 3"
    },
    {
        id: 88,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 88: Напиши саму проверку — тест своими руками",
        theory: `
            <h2>Урок 88: Сердце тест-раннера</h2>
            <p>В прошлом уроке каркас был готов — теперь ты пишешь ядро. Сравнение <code class="inline">got == want</code> — вся механика assert из библиотек <code class="inline">testify</code> и стандартного <code class="inline">testing</code> в трёх строках.</p>
            <p>Обрати внимание: тестируем <b>чистую функцию</b> isEven — без баз данных, файлов и сети. Чистые функции (вход → выход) тестируются бесплатно; поэтому весь курс мы писали именно их.</p>
            <p>Если хоть один кейс даст FAIL — тест-сьют считается упавшим, CI блокирует мёрж. Так живут реальные проекты.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Допиши проверку в цикле: вызвать isEven(t.input), сравнить с t.want и напечатать PASS или FAIL с числом. Ожидание: <code class="inline">PASS 2</code>, <code class="inline">PASS 4</code>, <code class="inline">PASS 7</code> построчно.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">isEven</span>(n <span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">bool</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> n%<span style="color: #79c0ff;">2</span> == <span style="color: #79c0ff;">0</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tests := []<span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input int<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;want&nbsp; bool<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">true</span>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #79c0ff;">4</span>, <span style="color: #79c0ff;">true</span>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span style="color: #79c0ff;">7</span>, <span style="color: #79c0ff;">false</span>},<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, t := <span style="color: #ff7b72;">range</span> tests {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="6" placeholder='if isEven(t.input) == t.want {\n\t\t\tfmt.Println("PASS", t.input)\n\t\t} else {\n\t\t\tfmt.Println("FAIL", t.input)\n\t\t}' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc isEven(n int) bool {\n\treturn n%2 == 0\n}\n\nfunc main() {\n\ttests := []struct {\n\t\tinput int\n\t\twant  bool\n\t}{\n\t\t{2, true},\n\t\t{4, true},\n\t\t{7, false},\n\t}\n\tfor _, t := range tests {\n\t\t${input}\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "PASS 2\nPASS 4\nPASS 7"
    },
    {
        id: 89,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 89: Ловушка nil-мапы",
        theory: `
            <h2>Урок 89: nil map — мина замедленного действия</h2>
            <p>Объявить мапу через <code class="inline">var m map[string]int</code> — законно, но это <b>nil</b>: структуры нет, есть только нулевой указатель. Читать из неё можно (вернётся zero-value), а запись роняет программу: <code class="inline">panic: assignment to entry in nil map</code>.</p>
            <p>Правильно — инициализировать: <code class="inline">scores := map[string]int{}</code> (или <code class="inline">make(map[string]int)</code>, это одно и то же).</p>
            <p>Почему так: Go принципиально не создаёт буфер «за спиной» — разработчик явно решает, где allocate-ится память (привет, урок 38).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Программа паникует на записи. Замени инициализацию <code class="inline">scores</code> на живую пустую мапу — Println(len(scores)) даст <code class="inline">2</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;scores := <textarea id="user-code" rows="2" placeholder='map[string]int{}' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;scores[<span style="color: #a5d6ff;">"go"</span>] = <span style="color: #79c0ff;">10</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;scores[<span style="color: #a5d6ff;">"rust"</span>] = <span style="color: #79c0ff;">9</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(len(scores))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tscores := ${input}\n\tscores["go"] = 10\n\tscores["rust"] = 9\n\tfmt.Println(len(scores))\n}`,
        validate: (stdout) => stdout.trim() === "2",
        errorMessage: "Panic — это не баг, а подсказка: nil-мапа не умеет хранить записи."
    },
    {
        id: 90,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 90: Рефакторинг — выделение чистой функции",
        theory: `
            <h2>Урок 90: Разделяй и властвуй</h2>
            <p>Функция в 80 строк, где чтение, подсчёт и печать перемешаны — нечитаема и нетестируема. Рефакторинг номер один: вынести <b>чистое вычисление</b> в отдельную функцию, а main оставить «дирижёром».</p>
            <p>average([]int) — маленький чистый алгоритм: сумма в цикле + деление на длину. Единственное место, где легко допустить ошибку деления на ноль (для пустого слайса len == 0!).</p>
            <p>Правило: функция делает одну вещь и названа так, чтобы было понятно какую.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Сумма уже в <code class="inline">total</code>. Допиши финальную строку функции — вернуть среднее арифметическое. Для [2, 4, 6] ответ: <code class="inline">4</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">average</span>(nums []<span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">int</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, n := <span style="color: #ff7b72;">range</span> nums {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='return total / len(nums)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(average([]<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">4</span>, <span style="color: #79c0ff;">6</span>}))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc average(nums []int) int {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\t${input}\n}\n\nfunc main() {\n\tfmt.Println(average([]int{2, 4, 6}))\n}`,
        validate: (stdout) => stdout.trim() === "4"
    },
    {
        id: 91,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 91: Zero values — Go не оставляет мусора",
        theory: `
            <h2>Урок 91: Zero Value</h2>
            <p>В Go <b>не бывает неинициализированных переменных</b>. Любая объявленная переменная получает zero value: числа — 0, строка — "", bool — false, указатель/слайс/мапа — nil. Мусора как в C нет по определению.</p>
            <p>Дизайн-принцип: zero value должен быть полезным. <code class="inline">var sb strings.Builder</code> готов к работе, <code class="inline">var mu sync.Mutex</code> уже разблокирован, <code class="inline">var cfg Config</code> — валидная конфигурация по умолчанию.</p>
            <p>Отсюда идиома: часто конструктор не нужен — достаточно <code class="inline">var</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Объяви переменную cfg типа Config через var — и Println покажет zero value полей: <code class="inline">0 false</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Config <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;MaxRetries <span style="color: #79c0ff;">int</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Debug&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #79c0ff;">bool</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> cfg <textarea id="user-code" rows="2" placeholder='Config' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(cfg.MaxRetries, cfg.Debug)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Config struct {\n\tMaxRetries int\n\tDebug      bool\n}\n\nfunc main() {\n\tvar cfg ${input}\n\tfmt.Println(cfg.MaxRetries, cfg.Debug)\n}`,
        validate: (stdout) => stdout.trim() === "0 false"
    },
    {
        id: 92,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 92: strings.Builder — перестань складывать строки в цикле",
        theory: `
            <h2>Урок 92: Производительность строк</h2>
            <p>Строка в Go неизменяема. Конкатенация <code class="inline">s += x</code> в цикле — это каждый раз НОВЫЙ буфер и копирование всего старого содержимого: O(n²) для тысячи итераций.</p>
            <p><code class="inline">strings.Builder</code> — растущий буфер с аллокацией один раз. Пишем через <code class="inline">fmt.Fprintf(&amp;sb, ...)</code> — Builder реализует io.Writer (урок 82!), поэтому fmt пишет в него как в файл или сокет.</p>
            <p>Бенчмарки показывают разницу в десятки раз на больших склейках. На собеседовании на эту ловушку проверяют почти все.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В цикл уже вставлен fmt.Fprintf, но не указан получатель. Передай Builder по адресу (&sb) — вывод после TrimSpace: <code class="inline">1 2 3</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"strings"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> sb strings.Builder<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">1</span>; i &lt;= <span style="color: #79c0ff;">3</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Fprintf(&amp;<textarea id="user-code" rows="2" placeholder='sb' style="color: #79c0ff; font-weight: normal;"></textarea>, <span style="color: #a5d6ff;">"%d "</span>, i)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(strings.TrimSpace(sb.String()))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"strings"\n)\n\nfunc main() {\n\tvar sb strings.Builder\n\tfor i := 1; i <= 3; i++ {\n\t\tfmt.Fprintf(&${input}, "%d ", i)\n\t}\n\tfmt.Println(strings.TrimSpace(sb.String()))\n}`,
        validate: (stdout) => stdout.trim() === "1 2 3"
    },
    {
        id: 93,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 93: Чистый JSON API — тег omitempty",
        theory: `
            <h2>Урок 93: Дисциплина API-ответов</h2>
            <p>Клиенту API не нужны пустые поля: лишний <code class="inline">"items":null</code> — шум в трафике и работа на парсере. Тег <code class="inline">omitempty</code> убирает из JSON поля с zero value (0, "", nil, пустой слайс).</p>
            <pre><code class="block">Items []string ` + "`json:\"items,omitempty\"`" + `</code></pre>
            <p>Дисциплина тегов — часть контракт-дизайна: имена в JSON стабильны (snake_case), структура Go свободна, а API не ломается при ренейме полей.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>JSON уже в <code class="inline">data</code>. Выведи его строкой — на экране должен остаться только <code class="inline">{"id":7}</code> (пустой Items исчез).</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"encoding/json"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">type</span> Order <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ID&nbsp;&nbsp;&nbsp; <span style="color: #79c0ff;">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: #a5d6ff;">&#96;json:"id"` + `&#96;</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Items []<span style="color: #79c0ff;">string</span> <span style="color: #a5d6ff;">&#96;json:"items,omitempty"` + `&#96;</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;o := Order{ID: <span style="color: #79c0ff;">7</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;data, _ := json.Marshal(o)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<textarea id="user-code" rows="2" placeholder='string(data)' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => 'package main\n\nimport (\n\t"encoding/json"\n\t"fmt"\n)\n\ntype Order struct {\n\tID    int      `json:"id"`\n\tItems []string `json:"items,omitempty"`\n}\n\nfunc main() {\n\to := Order{ID: 7}\n\tdata, _ := json.Marshal(o)\n\tfmt.Println(' + input + ')\n}',
        validate: (stdout) => stdout.trim() === '{"id":7}'
    },
    {
        id: 94,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 94: 🏁 Финал — собери конвейер сам",
        theory: `
            <h2>Урок 94: Вершина курса</h2>
            <p>Финальная задача собирает весь курс в одном файле: буферизованные каналы (м5), гортины и range (м7), закрытие каналов и генераторы (м10), чистые преобразования (м12).</p>
            <p>Конвейер готов: числа 1,2,3 уже в канале, первая стадия возводит в квадрат и пишет в <code class="inline">out</code>. Потребитель в main суммирует через <code class="inline">for range out</code>.</p>
            <p>Но range по <code class="inline">out</code> никогда не закончится, если стадия не сообщит о завершении. Догадайся, какая одна команда нужна после внутреннего цикла — и программа выведет <code class="inline">total: 14</code> (1+4+9).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Закрой выходной канал стадии. Это всё, что отделяет тебя от диплома этого курса.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;in := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;out := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, n := <span style="color: #ff7b72;">range</span> []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">1</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>} {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in &lt;- n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(in)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> n := <span style="color: #ff7b72;">range</span> in {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out &lt;- n * n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='close(out)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> out {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"total:"</span>, total)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tin := make(chan int, 3)\n\tout := make(chan int, 3)\n\tfor _, n := range []int{1, 2, 3} {\n\t\tin <- n\n\t}\n\tclose(in)\n\tgo func() {\n\t\tfor n := range in {\n\t\t\tout <- n * n\n\t\t}\n\t\t${input}\n\t}()\n\ttotal := 0\n\tfor v := range out {\n\t\ttotal += v\n\t}\n\tfmt.Println("total:", total)\n}`,
        validate: (stdout) => stdout.trim() === "total: 14",
        errorMessage: "Deadlock: потребитель ждёт, пока стадия сообщит о конце. Закрой канал."
    }
];
