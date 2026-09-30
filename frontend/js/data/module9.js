// js/data/module9.js
export const module9Lessons = [
    {
        id: 64,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 64: Куда пишет обработчик",
        theory: `
            <h2>Урок 64: Ответ как поток байтов</h2>
            <p>Настоящий HTTP-handler пишет ответ в <code class="inline">io.Writer</code> (ResponseWriter). Тот же интерфейс реализует <code class="inline">bytes.Buffer</code>: <code class="inline">var body bytes.Buffer; body.WriteString("...")</code>, а <code class="inline">body.String()</code> возвращает результат.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func handler() string</code>: в buffer запиши три куски — «HTTP 200 OK», « | », «Welcome to Go server» — и верни <code class="inline">body.String()</code>. В main — <code class="inline">fmt.Print(handler())</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">HTTP 200 OK | Welcome to Go server</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"bytes"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="13" placeholder='func handler() string {\n    var body bytes.Buffer\n    body.WriteString(&quot;HTTP 200 OK&quot;)\n    body.WriteString(&quot; | &quot;)\n    body.WriteString(&quot;Welcome to Go server&quot;)\n    return body.String()\n}\n\nfunc main() {\n    fmt.Print(handler())\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"bytes"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "HTTP 200 OK | Welcome to Go server"
    },
    {
        id: 65,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 65: Роутер на map",
        theory: `
            <h2>Урок 65: Маршрутизация за O(1)</h2>
            <p><code class="inline">map[string]func() string</code> — пути к обработчикам-функциям. Вызов нужного: <code class="inline">routes["/about"]()</code> — сначала мапа даёт функцию, затем круглые скобки запускают её.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: собери мапу с двумя путями: «/» → «home», «/about» → «about us». Напечатай результат обработчика «/about».</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">about us</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="9" placeholder='func main() {\n    routes := map[string]func() string{\n        &quot;/&quot;:      func() string { return &quot;home&quot; },\n        &quot;/about&quot;: func() string { return &quot;about us&quot; },\n    }\n    fmt.Println(routes[&quot;/about&quot;]())\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "about us"
    },
    {
        id: 66,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 66: Middleware — обёртка над обработчиком",
        theory: `
            <h2>Урок 66: Функция, возвращающая функцию</h2>
            <p>Middleware принимает обработчик <code class="inline">next</code> и возвращает новый: сначала своя логика (проверка), затем <code class="inline">next(n)</code>. Так устроены auth, логирование, тайминги в реальных серверах.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">double(n int) string</code> через fmt.Sprintf("%d", n*2) и <code class="inline">wrap(next func(int) string) func(int) string</code>: при n &lt; 0 верни «invalid», иначе next(n). В main: <code class="inline">h := wrap(double)</code>, печать h(21).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">42</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func double(n int) string {\n    return fmt.Sprintf(&quot;%d&quot;, n*2)\n}\n\nfunc wrap(next func(int) string) func(int) string {\n    return func(n int) string {\n        if n &lt; 0 {\n            return &quot;invalid&quot;\n        }\n        return next(n)\n    }\n}\n\nfunc main() {\n    h := wrap(double)\n    fmt.Println(h(21))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "42"
    },
    {
        id: 67,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 67: Потокобезопасный Store",
        theory: `
            <h2>Урок 67: Репозиторий под замком</h2>
            <p>Обычная map падает от конкурентных записей. Обёртка: struct с <code class="inline">mu sync.Mutex</code> + данные; каждый метод сам берёт <code class="inline">Lock()</code> и отпускает <code class="inline">defer Unlock()</code>. Метод — на <b>указателе-реципиенте</b>, иначе замок копируется.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши struct Store{mu sync.Mutex; data map[int]string} и метод Add(id int, v string) с блокировкой. В main: <code class="inline">s := &amp;Store{data: map[int]string{}}</code>, Add(1, "task"), печать s.data[1].</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">task</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='type Store struct {\n    mu   sync.Mutex\n    data map[int]string\n}\n\nfunc (s *Store) Add(id int, v string) {\n    s.mu.Lock()\n    defer s.mu.Unlock()\n    s.data[id] = v\n}\n\nfunc main() {\n    s := &amp;Store{data: map[int]string{}}\n    s.Add(1, &quot;task&quot;)\n    fmt.Println(s.data[1])\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "task"
    },
    {
        id: 68,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 68: Очередь задач",
        theory: `
            <h2>Урок 68:Producer → queue → consumer</h2>
            <p>Тяжёлую работу не делают в обработчике: задания кладут в канал-очередь, а потребитель вычитывает их через range. Закрытие канала говорит «всё, хватит».</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: буфер на 3, запиши 10, 20, 30, закрой канал, просуммируй range-ом и напечатай сумму.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">60</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    jobs := make(chan int, 3)\n    jobs &lt;- 10\n    jobs &lt;- 20\n    jobs &lt;- 30\n    close(jobs)\n    total := 0\n    for j := range jobs {\n        total += j\n    }\n    fmt.Println(total)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "60"
    },
    {
        id: 69,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 69: Ошибки сервисного слоя",
        theory: `
            <h2>Урок 69: Контекст в каждом слое</h2>
            <p>Хороший сервис оборачивает чужую ошибку своей подписью: <code class="inline">fmt.Errorf("load %d: %w", id, ErrNoUser)</code>. В логах видно и место, и причину.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Обяви <code class="inline">var ErrNoUser = errors.New("no user")</code>. Функция <code class="inline">load(id int) (string, error)</code>: для id==1 верни «Ann», nil; иначе обёртку с id. В main: <code class="inline">_, err := load(5)</code>, печать err.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">load 5: no user</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"errors"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="14" placeholder='var ErrNoUser = errors.New(&quot;no user&quot;)\n\nfunc load(id int) (string, error) {\n    if id != 1 {\n        return &quot;&quot;, fmt.Errorf(&quot;load %d: %w&quot;, id, ErrNoUser)\n    }\n    return &quot;Ann&quot;, nil\n}\n\nfunc main() {\n    _, err := load(5)\n    fmt.Println(err)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"errors"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "load 5: no user"
    },
    {
        id: 70,
        moduleId: 9,
        moduleTitle: "Раздел 9: Боевой Backend (основы)",
        title: "Урок 70: Мини-проект — трекер задач",
        theory: `
            <h2>Урок 70: Всё вместе</h2>
            <p>Struct Task{Title string; Done bool}, функция подсчёта и main — композиция тем, что ты знал с раздела 4.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши: struct Task (Title string, Done bool); <code class="inline">func pending(tasks []Task) int</code> — счётчик задач с !t.Done (цикл по срезу); в main <code class="inline">[]Task{{"a", true}, {"b", false}, {"c", false}}</code> и печать pending(tasks).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">2</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='type Task struct {\n    Title string\n    Done  bool\n}\n\nfunc pending(tasks []Task) int {\n    n := 0\n    for _, t := range tasks {\n        if !t.Done {\n            n++\n        }\n    }\n    return n\n}\n\nfunc main() {\n    tasks := []Task{{&quot;a&quot;, true}, {&quot;b&quot;, false}, {&quot;c&quot;, false}}\n    fmt.Println(pending(tasks))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "2"
    }
];
