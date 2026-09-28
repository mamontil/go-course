// js/data/module9.js
export const module9Lessons = [
    {
        id: 64,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 64: Handler — любой объект с методом ServeHTTP",
        theory: `
            <h2>Урок 64: Интерфейс http.Handler</h2>
            <p>Весь веб в Go держится на одном крошечном интерфейсе: у обработчика должен быть метод <code class="inline">ServeHTTP(w ResponseWriter, r *Request)</code>. Всё остальное — детали реализации.</p>
            <p><code class="inline">ResponseWriter</code> — это тоже интерфейс «куда можно писать байты». Поэтому вместо настоящего сетевого writer'а в тестах и песочницах подставляют обычный <code class="inline">bytes.Buffer</code> — он тоже имеет метод Write.</p>
            <p>Ты уже умеешь это: в разделе 4 struct с методом стал реализацией интерфейса. Здесь та же магия, только на службе HTTP.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Метод <code class="inline">ServeHTTP</code> уже записал ответ в буфер. Выведи содержимое буфера через <code class="inline">fmt.Println(buf.String())</code> — на экране должно быть <code class="inline">Hello, HTTP!</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"bytes"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"io"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">type</span> Greeter <span style="color: #ff7b72;">struct</span>{}<br><br>
            <span style="color: #ff7b72;">func</span> (g Greeter) <span style="color: #d2a8ff;">ServeHTTP</span>(w io.Writer) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Fprint(w, <span style="color: #a5d6ff;">"Hello, HTTP!"</span>)<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> buf bytes.Buffer<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Greeter{}.ServeHTTP(&amp;buf)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(buf.String())' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"bytes"\n\t"fmt"\n\t"io"\n)\n\ntype Greeter struct{}\n\nfunc (g Greeter) ServeHTTP(w io.Writer) {\n\tfmt.Fprint(w, "Hello, HTTP!")\n}\n\nfunc main() {\n\tvar buf bytes.Buffer\n\tGreeter{}.ServeHTTP(&buf)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Hello, HTTP!"
    },
    {
        id: 65,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 65: Роутер — map вместо if-цепочки",
        theory: `
            <h2>Урок 65: Маршрутизация запросов</h2>
            <p>Сервер получает URL и должен понять, какой функции его отдать. Наивный вариант — цепочка <code class="inline">if r.URL.Path == "/ping" {...}</code>. У каждого нормального фреймворка роутер устроен иначе: <b>мапа</b> «путь → обработчик».</p>
            <p>Значениями мапы могут быть функции: <code class="inline">map[string]func(string) string</code>. Поиск нужного обработчика становится одним O(1) обращением — быстро и читаемо.</p>
            <p>Так работает и стандартный <code class="inline">http.ServeMux</code>: внутри — та же мапа, снаружи — вызов <code class="inline">mux.HandleFunc("/ping", handler)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Роутер уже нашёл обработчик для пути <code class="inline">"/ping"</code> в переменную <code class="inline">handler</code>. Вызови его и выведи результат: <code class="inline">fmt.Println(handler())</code> — ответ <code class="inline">pong</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;routes := <span style="color: #ff7b72;">map</span>[<span style="color: #79c0ff;">string</span>]func() <span style="color: #79c0ff;">string</span>{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"/hello"</span>: <span style="color: #ff7b72;">func</span>() <span style="color: #79c0ff;">string</span> { <span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"Hi!"</span> },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"/ping"</span>:&nbsp; <span style="color: #ff7b72;">func</span>() <span style="color: #79c0ff;">string</span> { <span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"pong"</span> },<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;handler := routes[<span style="color: #a5d6ff;">"/ping"</span>]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(handler())' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\troutes := map[string]func() string{\n\t\t"/hello": func() string { return "Hi!" },\n\t\t"/ping":  func() string { return "pong" },\n\t}\n\thandler := routes["/ping"]\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "pong"
    },
    {
        id: 66,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 66: Middleware — функция, оборачивающая функцию",
        theory: `
            <h2>Урок 66: Промежуточные слои (middleware)</h2>
            <p>Авторизация, логирование, замер времени нужны у <i>каждого</i> handler, но копировать код в каждый — плохая идея. Решение — <b>middleware</b>: функция, которая принимает обработчик и возвращает новый, «обёрнутый».</p>
            <pre><code class="block">protected := withAuth(hello)   // hello "внутри" проверки</code></pre>
            <p>В реальных серверах цепочки собирают так: <code class="inline">logIn(withAuth(hello))</code> — каждый слой пропускает запрос дальше через вызов <code class="inline">next(...)</code> или отсекает его, вернув ошибку.</p>
            <p>Ты тренировался в этом весь курс: defer, интерфейсы и функции как значения — всё вместе и есть middleware.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Внутри <code class="inline">withAuth</code> имя пустое — возврат 401 уже готов. Если же имя есть, нужно передать запрос «ниже» по цепочке. Допиши вызов <code class="inline">next(name)</code> — программа напечатает <code class="inline">Hi, Ann</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">hello</span>(name <span style="color: #79c0ff;">string</span>) <span style="color: #79c0ff;">string</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"Hi, "</span> + name<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">withAuth</span>(next func(<span style="color: #79c0ff;">string</span>) <span style="color: #79c0ff;">string</span>) func(<span style="color: #79c0ff;">string</span>) <span style="color: #79c0ff;">string</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> func(name <span style="color: #79c0ff;">string</span>) <span style="color: #79c0ff;">string</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> name == <span style="color: #a5d6ff;">""</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"401 unauthorized"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <textarea id="user-code" rows="2" placeholder='next(name)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;protected := withAuth(hello)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(protected(<span style="color: #a5d6ff;">"Ann"</span>))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc hello(name string) string {\n\treturn "Hi, " + name\n}\n\nfunc withAuth(next func(string) string) func(string) string {\n\treturn func(name string) string {\n\t\tif name == "" {\n\t\t\treturn "401 unauthorized"\n\t\t}\n\t\treturn ${input}\n\t}\n}\n\nfunc main() {\n\tprotected := withAuth(hello)\n\tfmt.Println(protected("Ann"))\n}`,
        validate: (stdout) => stdout.trim() === "Hi, Ann"
    },
    {
        id: 67,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 67: Репозиторий — безопасное хранилище задач",
        theory: `
            <h2>Урок 67: Потокобезопасный Store</h2>
            <p>Пока нет базы данных, её роль играет мапа в памяти. Но HTTP-сервер исполняет каждый запрос в своей горутине — и все они лезут в одну мапу. Гонка данных (урок 55) на мапе не просто теряет записи, а роняет процесс: <code class="inline">concurrent map writes</code> — fatal error.</p>
            <p>Поэтому репозиторий всегда прячут за struct: <code class="inline">mu sync.Mutex</code> + <code class="inline">data map[int]string</code>. Каждый публичный метод сам берёт блокировку и отпускает её через defer.</p>
            <p>Приём «метод-реципиент сам знает про свой замок» снимает с вызывающего обязанность помнить о синхронизации.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Метод <code class="inline">Add</code> записал задачу в хранилище под id 1. Выведи значение по ключу 1 — <code class="inline">fmt.Println(s.data[1])</code>. Ожидается <code class="inline">Learn Go</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">type</span> Store <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;mu&nbsp;&nbsp; sync.Mutex<br>
            &nbsp;&nbsp;&nbsp;&nbsp;data <span style="color: #ff7b72;">map</span>[<span style="color: #79c0ff;">int</span>]<span style="color: #79c0ff;">string</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> (s *Store) <span style="color: #d2a8ff;">Add</span>(id <span style="color: #79c0ff;">int</span>, task <span style="color: #79c0ff;">string</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.mu.Lock()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> s.mu.Unlock()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.data[id] = task<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s := &amp;Store{data: <span style="color: #ff7b72;">map</span>[<span style="color: #79c0ff;">int</span>]<span style="color: #79c0ff;">string</span>{}}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.Add(<span style="color: #79c0ff;">1</span>, <span style="color: #a5d6ff;">"Learn Go"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(s.data[1])' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\ntype Store struct {\n\tmu   sync.Mutex\n\tdata map[int]string\n}\n\nfunc (s *Store) Add(id int, task string) {\n\ts.mu.Lock()\n\tdefer s.mu.Unlock()\n\ts.data[id] = task\n}\n\nfunc main() {\n\ts := &Store{data: map[int]string{}}\n\ts.Add(1, "Learn Go")\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Learn Go"
    },
    {
        id: 68,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 68: Очередь задач — воркер-потребитель",
        theory: `
            <h2>Урок 68: Фоновые очереди</h2>
            <p>Тяжёлую работу (отправка писем, генерация отчётов) не делают прямо в обработчике — иначе запрос висит секундами. Её кладут в <b>очередь задач</b>, а отдельный воркер вынимает и исполняет в фоне.</p>
            <p>В Go очередь — это канал. Продюсер пишет задания <code class="inline">jobs &lt;- n</code>, воркер крутит бесконечный <code class="inline">for job := range jobs</code>, завершая работу при закрытии канала (урок 53).</p>
            <p>Знакомо? Это ровно то, что делает сам HTTP-сервер: accept-горoutine кладёт входящие соединения в очередь, а воркеры их выполняют.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Воркер уже обработал все задания из канала и посчитал их сумму в <code class="inline">sum</code>. Выведи <code class="inline">sum</code> на экран — ответ <code class="inline">6</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;jobs := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;jobs &lt;- <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;jobs &lt;- <span style="color: #79c0ff;">2</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;jobs &lt;- <span style="color: #79c0ff;">3</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(jobs)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;sum := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> job := <span style="color: #ff7b72;">range</span> jobs {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sum += job<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(sum)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tjobs := make(chan int, 3)\n\tjobs <- 1\n\tjobs <- 2\n\tjobs <- 3\n\tclose(jobs)\n\tsum := 0\n\tfor job := range jobs {\n\t\tsum += job\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "6"
    },
    {
        id: 69,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 69: Ошибки в сервисном слое",
        theory: `
            <h2>Урок 69: Контекст ошибки на каждом слое</h2>
            <p>Хороший бэкенд по логам определяет, <i>где</i> сломалось. Правило: каждый слой оборачивает ошибку снизу своим контекстом через <code class="inline">%w</code> (урок 46): <code class="inline">fmt.Errorf("loadUser(%d): %w", id, err)</code>.</p>
            <p>В итоге вместо безликого <code class="inline">not found</code> в логах читается цепочка: <code class="inline">handler: service: loadUser(42): not found</code> — и виновник виден сразу.</p>
            <p>А верхний слой (HTTP) решает, что показать клиенту: 404, 500 или текст ошибки. Клиенту почти никогда не отправляют внутренности приложения.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">loadUser(42)</code> вернула обёрнутую ошибку. Выведи её через <code class="inline">fmt.Println(err)</code> — ожидается точный текст <code class="inline">loadUser(42): not found</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"errors"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">var</span> ErrNotFound = errors.New(<span style="color: #a5d6ff;">"not found"</span>)<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">loadUser</span>(id <span style="color: #79c0ff;">int</span>) (<span style="color: #79c0ff;">string</span>, <span style="color: #79c0ff;">error</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> id != <span style="color: #79c0ff;">1</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">""</span>, fmt.Errorf(<span style="color: #a5d6ff;">"loadUser(%d): %w"</span>, id, ErrNotFound)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"Ann"</span>, <span style="color: #79c0ff;">nil</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;_, err := loadUser(<span style="color: #79c0ff;">42</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(err)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nvar ErrNotFound = errors.New("not found")\n\nfunc loadUser(id int) (string, error) {\n\tif id != 1 {\n\t\treturn "", fmt.Errorf("loadUser(%d): %w", id, ErrNotFound)\n\t}\n\treturn "Ann", nil\n}\n\nfunc main() {\n\t_, err := loadUser(42)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "loadUser(42): not found"
    },
    {
        id: 70,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend",
        title: "Урок 70: 🏁 Финальный проект — трекер задач",
        theory: `
            <h2>Урок 70: Финальный проект</h2>
            <p>Поздравляем, это вершина курса! Соберём всё вместе: struct, слайсы, methods, указатели и цикл — маленький консольный трекер задач.</p>
            <p>Сервису нужно уметь считать, сколько задач ещё <b>не выполнено</b>. Функция <code class="inline">remaining</code> принимает слайс задач и возвращает счётчик незакрытых.</p>
            <p>Твоя задача — дописать тело: пройдись циклом <code class="inline">for _, t := range tasks</code> и увеличивай <code class="inline">count</code> для каждой задачи с <code class="inline">!t.Done</code>.</p>
            <p>Из трёх задач одна не сделана — программа должна напечатать <code class="inline">1</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши цикл внутри функции <code class="inline">remaining</code>. Решение одной строкой не поместится — пиши с переносами, как в настоящем коде.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Task <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Title <span style="color: #79c0ff;">string</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Done&nbsp; <span style="color: #79c0ff;">bool</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">remaining</span>(tasks []Task) <span style="color: #79c0ff;">int</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;count := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="5" placeholder='for _, t := range tasks {\n\tif !t.Done {\n\t\tcount++\n\t}\n}' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> count<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tasks := []Task{{<span style="color: #a5d6ff;">"Learn Go"</span>, <span style="color: #79c0ff;">true</span>}, {<span style="color: #a5d6ff;">"Build API"</span>, <span style="color: #79c0ff;">false</span>}, {<span style="color: #a5d6ff;">"Deploy"</span>, <span style="color: #79c0ff;">true</span>}}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(remaining(tasks))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Task struct {\n\tTitle string\n\tDone  bool\n}\n\nfunc remaining(tasks []Task) int {\n\tcount := 0\n\t${input}\n\treturn count\n}\n\nfunc main() {\n\ttasks := []Task{{"Learn Go", true}, {"Build API", false}, {"Deploy", true}}\n\tfmt.Println(remaining(tasks))\n}`,
        validate: (stdout) => stdout.trim() === "1"
    }
];
