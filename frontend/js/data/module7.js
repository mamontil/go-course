// js/data/module7.js
export const module7Lessons = [
    {
        id: 48,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 48: Горутина и канал",
        theory: `
            <h2>Урок 48: go + chan</h2>
            <p>Слово <code class="inline">go</code> запускает функцию параллельно. Канал <code class="inline">chan string</code> — точка встречи: отправитель <code class="inline">ch &lt;- "hi"</code> ждёт, пока читатель <code class="inline">&lt;-ch</code> не заберёт значение.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func hello(ch chan string)</code>, отправляющую «hi». В main: создай канал, запусти <code class="inline">go hello(c)</code>, прочитай значение в переменную и напечатай её.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">hi</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="12" placeholder='func hello(ch chan string) {\n    ch &lt;- &quot;hi&quot;\n}\n\nfunc main() {\n    c := make(chan string)\n    go hello(c)\n    msg := &lt;-c\n    fmt.Println(msg)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "hi"
    },
    {
        id: 49,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 49: sync.WaitGroup",
        theory: `
            <h2>Урок 49: Ждём группу горутин</h2>
            <p>Протокол: <code class="inline">wg.Add(1)</code> перед <code class="inline">go</code>, <code class="inline">defer wg.Done()</code> первым делом внутри, <code class="inline">wg.Wait()</code> в main. Без Wait main умрёт раньше рабочих.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: <code class="inline">var wg sync.WaitGroup</code>, цикл <code class="inline">for i := 0; i &lt; 3; i++</code> с горутиной, печатающей «done». После цикла — wg.Wait().</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">три строки done</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="13" placeholder='func main() {\n    var wg sync.WaitGroup\n    for i := 0; i &lt; 3; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            fmt.Println(&quot;done&quot;)\n        }()\n    }\n    wg.Wait()\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "done\ndone\ndone"
    },
    {
        id: 50,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 50: Канал как рукопожатие",
        theory: `
            <h2>Урок 50: Синхронизация приёмом</h2>
            <p>Приём <code class="inline">&lt;-ch</code> — это и получение данных, и сигнал «можно продолжать». Отправивший <code class="inline">ch &lt;- выражение</code> ждёт ровно до приёма.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func worker(ch chan int)</code>, отправляющую результат <code class="inline">6 * 7</code>. В main создай небуферизованный канал, запусти go worker(ch) и напечатай <code class="inline">&lt;-ch</code> прямо внутри Println.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">42</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="11" placeholder='func worker(ch chan int) {\n    ch &lt;- 6 * 7\n}\n\nfunc main() {\n    ch := make(chan int)\n    go worker(ch)\n    fmt.Println(&lt;-ch)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "42"
    },
    {
        id: 51,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 51: Буфер: len и cap канала",
        theory: `
            <h2>Урок 51: Буферизация</h2>
            <p><code class="inline">make(chan int, 3)</code> — очередь на 3: отправка свободна, пока очередь не полна. <code class="inline">len(ch)</code> считает лежащие в очереди значения, <code class="inline">cap(ch)</code> — вместимость.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: создай буфер на 3, запиши 1, 2, 3 (не читая!) и напечатай <code class="inline">len(ch), cap(ch)</code> одним Println.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">3 3</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="9" placeholder='func main() {\n    ch := make(chan int, 3)\n    ch &lt;- 1\n    ch &lt;- 2\n    ch &lt;- 3\n    fmt.Println(len(ch), cap(ch))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "3 3"
    },
    {
        id: 52,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 52: Дедлок и его лечение",
        theory: `
            <h2>Урок 52: Deadlock</h2>
            <p>Запись в небуферизованный канал без читателя (или чтение без писателя) вешает программу навсегда: «fatal error: all goroutines are asleep». Лечение — вторая сторона в горутине.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: создай канал, запусти <code class="inline">go func() { ch &lt;- 7 }()</code>, сохрани приём в переменную v и напечатай v.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">7</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="8" placeholder='func main() {\n    ch := make(chan int)\n    go func() { ch &lt;- 7 }()\n    v := &lt;-ch\n    fmt.Println(v)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "7"
    },
    {
        id: 53,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 53: close + for range",
        theory: `
            <h2>Урок 53: Перебор канала</h2>
            <p>Канал закрывает отправитель: <code class="inline">close(ch)</code>. <code class="inline">for v := range ch</code> вычитывает очередь и завершается только когда канал закрыт и пуст.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: буфер на 4; циклом <code class="inline">for i := 1; i &lt;= 4; i++</code> запиши числа; закрой канал; просуммируй range-циклом в <code class="inline">sum</code> и напечатай sum.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">10 (сумма 1+2+3+4)</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    ch := make(chan int, 4)\n    for i := 1; i &lt;= 4; i++ {\n        ch &lt;- i\n    }\n    close(ch)\n    sum := 0\n    for v := range ch {\n        sum += v\n    }\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "10"
    },
    {
        id: 54,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 54: select и default",
        theory: `
            <h2>Урок 54: Неблокирующий select</h2>
            <p>select выбирает готовый кейс. С кейсом <code class="inline">default:</code> он не ждёт вообще: каналы пусты — мгновенно执行 default. Это фундамент таймаутов и опросов.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: пустой канал ch; result := 0; select: кейс <code class="inline">case v := &lt;-ch</code> присваивает result = v, в default — result = 99. Напечатай result.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">99 (канал пуст, сработал default)</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="13" placeholder='func main() {\n    ch := make(chan int)\n    result := 0\n    select {\n    case v := &lt;-ch:\n        result = v\n    default:\n        result = 99\n    }\n    fmt.Println(result)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "99"
    },
    {
        id: 55,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 55: sync.Mutex",
        theory: `
            <h2>Урок 55: Замок на данных</h2>
            <p><code class="inline">count++</code> из разных горутин без защиты теряет обновления (гонка). <code class="inline">mu.Lock()</code> впускает внутрь ровно одну горутину; <code class="inline">mu.Unlock()</code> выпускает.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: WaitGroup + <code class="inline">var mu sync.Mutex</code> + count. В цикле 500 горутин: Lock, count++, Unlock. После wg.Wait() напечатай count.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">500 — ровно, без гонок</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    var wg sync.WaitGroup\n    var mu sync.Mutex\n    count := 0\n    for i := 0; i &lt; 500; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            mu.Lock()\n            count++\n            mu.Unlock()\n        }()\n    }\n    wg.Wait()\n    fmt.Println(count)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "500"
    }
];
