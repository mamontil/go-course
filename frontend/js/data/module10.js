// js/data/module10.js
export const module10Lessons = [
    {
        id: 71,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 71: Worker Pool",
        theory: `
            <h2>Урок 71: Пул рабочих</h2>
            <p>N горутин-воркеров читают один канал заданий (<code class="inline">for j := range jobs</code>) — Go сам раздаёт работу. Порядок: создали каналы → запустили воркеров (WaitGroup) →fill jobs → close(jobs) → wg.Wait() → close(res) → собираем.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>2 воркера возводят задания в квадрат и пишут в res. main заполняет jobs числами 1..4, ждёт завершения (wg.Wait), закрывает res, суммирует range-ом и печатает сумму.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">30 = 1+4+9+16</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    jobs := make(chan int, 4)\n    res := make(chan int, 4)\n    var wg sync.WaitGroup\n    for w := 0; w &lt; 2; w++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            for j := range jobs {\n                res &lt;- j * j\n            }\n        }()\n    }\n    for i := 1; i &lt;= 4; i++ {\n        jobs &lt;- i\n    }\n    close(jobs)\n    wg.Wait()\n    close(res)\n    total := 0\n    for v := range res {\n        total += v\n    }\n    fmt.Println(total)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "30"
    },
    {
        id: 72,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 72: Pipeline — конвейер стадий",
        theory: `
            <h2>Урок 72: Конвейер</h2>
            <p>Стадия — функция, принимающая канал, возвращающая канал и крутящая горутину с range + close. Цепочка <code class="inline">square(gen(1, 2, 3))</code> — классический pipeline.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">gen(nums ...int) chan int</code> (отправляет числа, close) и <code class="inline">square(in chan int) chan int</code> (берёт range-ом, шлёт n*n, close). В main просуммируй квадрат(ген(1,2,3)) и напечатай.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">14 = 1+4+9</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func gen(nums ...int) chan int {\n    out := make(chan int)\n    go func() {\n        for _, n := range nums {\n            out &lt;- n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc square(in chan int) chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            out &lt;- n * n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    sum := 0\n    for v := range square(gen(1, 2, 3)) {\n        sum += v\n    }\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "14"
    },
    {
        id: 73,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 73: Fan-in — слияние источников",
        theory: `
            <h2>Урок 73: Fan-in</h2>
            <p>Несколько производителей пишут в один канал. Кто закрывает общий канал? Тот, кто знает, что все закончили: отдельная горутина ждёт <code class="inline">wg.Wait()</code> и делает <code class="inline">close(out)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>3 горутины шлют в out числа: i-я отправляет start и start+1, где start = i*2 (сохрани i параметром! иначе гонка за переменную цикла). Закрывающая горутина ждёт WaitGroup. main суммирует и печатает.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">27 = 2+3+4+5+6+7</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    out := make(chan int, 6)\n    var wg sync.WaitGroup\n    for s := 1; s &lt;= 3; s++ {\n        wg.Add(1)\n        go func(start int) {\n            defer wg.Done()\n            for i := start; i &lt;= start+1; i++ {\n                out &lt;- i\n            }\n        }(s * 2)\n    }\n    go func() {\n        wg.Wait()\n        close(out)\n    }()\n    sum := 0\n    for v := range out {\n        sum += v\n    }\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "27"
    },
    {
        id: 74,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 74: sync/atomic",
        theory: `
            <h2>Урок 74: Атомики</h2>
            <p><code class="inline">atomic.AddInt64(&amp;counter, 1)</code> — инкремент одной машинной операцией, замок не нужен. Переменная должна быть <code class="inline">int64</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: <code class="inline">var counter int64</code>; 1000 горутин (WaitGroup) делают atomic.AddInt64(&amp;counter, 1). После Wait напечатай counter.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">1000</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync/atomic"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    var counter int64\n    var wg sync.WaitGroup\n    for i := 0; i &lt; 1000; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            atomic.AddInt64(&amp;counter, 1)\n        }()\n    }\n    wg.Wait()\n    fmt.Println(counter)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "1000"
    },
    {
        id: 75,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 75: Rate limiter — жетоны",
        theory: `
            <h2>Урок 75: Пропускная способность</h2>
            <p>Буферизованный канал как «касса с билетами»: попытка положить жетон при полной очереди через select+default не блокируется, а отказывает. Так ограничивают одновременные запросы.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: tokens := make(chan int, 3); цикл из 5 попыток: select <code class="inline">case tokens &lt;- i: allowed++</code>, default — ничего. Напечатай allowed.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">3 (билетов больше не было)</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    tokens := make(chan int, 3)\n    allowed := 0\n    for i := 0; i &lt; 5; i++ {\n        select {\n        case tokens &lt;- i:\n            allowed++\n        default:\n        }\n    }\n    fmt.Println(allowed)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "3"
    },
    {
        id: 76,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 76: Генератор потока",
        theory: `
            <h2>Урок 76: Функция-генератор</h2>
            <p>Генератор возвращает канал и сам наполняет его из горутины, в конце <b>обязательно</b> close — иначе range потребителя не закончится никогда.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func counter(n int) chan int</code>: шлёт 1..n, close. В main суммируй range по counter(5) и напечатай.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">15 = 1+2+3+4+5</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func counter(n int) chan int {\n    out := make(chan int)\n    go func() {\n        for i := 1; i &lt;= n; i++ {\n            out &lt;- i\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    sum := 0\n    for v := range counter(5) {\n        sum += v\n    }\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "15",
        errorMessage: "Программа зависла? range по каналу ждёт вечно — генератор обязан сделать close(out)."
    },
    {
        id: 77,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 77: Таймаут через time.After",
        theory: `
            <h2>Урок 77: Гонка с таймером</h2>
            <p><code class="inline">select</code> из рабочего канала и <code class="inline">&lt;-time.After(2 * time.Second)</code>: выигрывает тот, кто поспел. Долгая операция (50ms) успевает раньше таймаута.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: горутина спит 50ms и шлёт «finished» в канал done; select ждёт done или time.After(2 секунды) с печатью «timeout». Запусти и убедись — печатается ответ.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">finished</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"time"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    done := make(chan string)\n    go func() {\n        time.Sleep(50 * time.Millisecond)\n        done &lt;- &quot;finished&quot;\n    }()\n    select {\n    case msg := &lt;-done:\n        fmt.Println(msg)\n    case &lt;-time.After(2 * time.Second):\n        fmt.Println(&quot;timeout&quot;)\n    }\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"time"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "finished"
    },
    {
        id: 78,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 78: Отмена всех — broadcast по close",
        theory: `
            <h2>Урок 78: Wide-вещание</h2>
            <p>Чтение с закрытого канала мгновенно возвращает zero-value — поэтому один <code class="inline">close(done)</code> будит ВСЕХ, кто ждал <code class="inline">&lt;-done</code>. Так работает отмена в context.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>3 горутины (WaitGroup) ждут &lt;-done, затем шлют 1 в stopped. main делает close(done), wg.Wait() и печатает сумму трёх приёмов из stopped.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">3</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    done := make(chan struct{})\n    var wg sync.WaitGroup\n    stopped := make(chan int, 3)\n    for i := 0; i &lt; 3; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            &lt;-done\n            stopped &lt;- 1\n        }()\n    }\n    close(done)\n    wg.Wait()\n    fmt.Println(&lt;-stopped + &lt;-stopped + &lt;-stopped)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "3",
        errorMessage: "Deadlock: горутины так и ждут сигнала. Открой кран — закрой канал done."
    }
];
