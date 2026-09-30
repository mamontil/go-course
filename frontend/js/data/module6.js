// js/data/module6.js
export const module6Lessons = [
    {
        id: 41,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 41: Указатели — & и *",
        theory: `
            <h2>Урок 41: Указатели</h2>
            <p>Указатель хранит адрес переменной в памяти. <code class="inline">&amp;x</code> берёт адрес x, тип указателя — <code class="inline">*int</code>. Запись <code class="inline">*p = 25</code> меняет значение по адресу, то есть сам x.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В <code class="inline">main</code>: создай <code class="inline">x := 10</code>, возьми указатель <code class="inline">p := &amp;x</code>, присвой <code class="inline">*p = 25</code> и напечатай <b>через Println именно x</b>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">25 — изменился оригинал, а не копия</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="8" placeholder='func main() {\n    x := 10\n    p := &amp;x\n    *p = 25\n    fmt.Println(x)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "25"
    },
    {
        id: 42,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 42: Функция, меняющая данные по указателю",
        theory: `
            <h2>Урок 42: Pointer-аргумент</h2>
            <p>Go копирует аргументы. Чтобы функция изменила оригинал — передавай адрес. Тело <code class="inline">*p = *p * *p</code> возводит лежащее по адресу число в квадрат.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши функцию <code class="inline">func square(p *int)</code> с телом <code class="inline">*p = *p * *p</code>. В main: <code class="inline">n := 7</code>, вызов <code class="inline">square(&amp;n)</code>, печать n через Println.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">49</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="11" placeholder='func square(p *int) {\n    *p = *p * *p\n}\n\nfunc main() {\n    n := 7\n    square(&amp;n)\n    fmt.Println(n)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "49"
    },
    {
        id: 43,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 43: nil-указатель и проверка",
        theory: `
            <h2>Урок 43: nil</h2>
            <p>Объявленный, но ни на что не направленный указатель равен <code class="inline">nil</code>. Разыменование такого указателя — паника, поэтому сначала проверяют <code class="inline">if p == nil</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: обяви <code class="inline">var ptr *int</code>. Если ptr равен nil — напечатай «nil», иначе напечатай <code class="inline">*ptr</code> (эта ветка не сработает).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">nil</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="10" placeholder='func main() {\n    var ptr *int\n    if ptr == nil {\n        fmt.Println(&quot;nil&quot;)\n    } else {\n        fmt.Println(*ptr)\n    }\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "nil"
    },
    {
        id: 44,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 44: Возврат error и if err != nil",
        theory: `
            <h2>Урок 44: error — второй результат</h2>
            <p>В скелете дана <code class="inline">divide(a, b int) (int, error)</code>: при b==0 она возвращает ошибку <code class="inline">div by zero</code>, иначе частное и nil.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main вызови <code class="inline">res, err := divide(10, 0)</code>. Если err не nil — напечатай «Error: » и err (через Println с двумя аргументами) и сделай <code class="inline">return</code>. Иначе напечатай res.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">Error: div by zero</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"errors"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br>func divide(a, b int) (int, error) {<br>&nbsp;&nbsp;&nbsp;&nbsp;if b == 0 {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 0, errors.New("div by zero")<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;return a / b, nil<br>}<br><br><textarea id="user-code" rows="10" placeholder='func main() {\n    res, err := divide(10, 0)\n    if err != nil {\n        fmt.Println(&quot;Error:&quot;, err)\n        return\n    }\n    fmt.Println(res)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"errors"
	"fmt"
)

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("div by zero")
	}
	return a / b, nil
}

${input}
`,
        validate: (stdout) => stdout.trim() === "Error: div by zero"
    },
    {
        id: 45,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 45: Своя функция с errors.New",
        theory: `
            <h2>Урок 45: Создаём ошибку</h2>
            <p><code class="inline">errors.New("текст")</code> создаёт значение типа error. Соглашение Go: текст ошибки строчными буквами, без точки в конце.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func findUser(id int) (string, error)</code>: для id==1 верни «Ann» и nil, иначе верни <code class="inline">"", errors.New("user not found")</code>. В main: <code class="inline">_, err := findUser(9)</code> и печать err.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">user not found</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"errors"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="13" placeholder='func findUser(id int) (string, error) {\n    if id == 1 {\n        return &quot;Ann&quot;, nil\n    }\n    return &quot;&quot;, errors.New(&quot;user not found&quot;)\n}\n\nfunc main() {\n    _, err := findUser(9)\n    fmt.Println(err)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"errors"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "user not found"
    },
    {
        id: 46,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 46: Обёртка %w и errors.Is",
        theory: `
            <h2>Урок 46: Цепочки ошибок</h2>
            <p><code class="inline">fmt.Errorf("db: %w", ErrNotFound)</code> добавляет контекст, сохраняя исходную ошибку внутри. Достать её из цепочки можно только через <code class="inline">errors.Is(err, ErrNotFound)</code> — обычное == не сработает.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>На верхнем уровне обяви <code class="inline">var ErrNotFound = errors.New("not found")</code>. Функция <code class="inline">getUser() error</code> пусть вернёт обёртку через %w. В main: если errors.Is — печать «handled».</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">handled</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"errors"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="14" placeholder='var ErrNotFound = errors.New(&quot;not found&quot;)\n\nfunc getUser() error {\n    return fmt.Errorf(&quot;db: %w&quot;, ErrNotFound)\n}\n\nfunc main() {\n    err := getUser()\n    if errors.Is(err, ErrNotFound) {\n        fmt.Println(&quot;handled&quot;)\n    }\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"errors"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "handled"
    },
    {
        id: 47,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 47: panic / recover",
        theory: `
            <h2>Урок 47: Ловим панику</h2>
            <p>Деление на ноль — паника. Спасает <code class="inline">defer func() { if r := recover(); r != nil { ... } }()</code>. С именованным результатом <code class="inline">(res int)</code> внутри recover можно подменить возвращаемое число.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func safeDiv(a, b int) (res int)</code>: defer с recover присваивает res = -1; затем <code class="inline">res = a / b</code> и просто <code class="inline">return</code>. В main напечатай safeDiv(10, 0).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">-1 (паника перехвачена, программа жива)</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func safeDiv(a, b int) (res int) {\n    defer func() {\n        if r := recover(); r != nil {\n            res = -1\n        }\n    }()\n    res = a / b\n    return\n}\n\nfunc main() {\n    fmt.Println(safeDiv(10, 0))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "-1"
    }
];
