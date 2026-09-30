// js/data/module12.js
export const module12Lessons = [
    {
        id: 87,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 87: Табличные тесты",
        theory: `
            <h2>Урок 87: Тест-кейсы слайсом структур</h2>
            <p>Стиль Go — одна функция тест + таблица <code class="inline">[]struct{a, b, want int}{...}</code> и цикл-проверка. Так живут реальные *_test.go.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши add(a, b int) int. В main: таблица из кейсов {1,2,3}, {10,5,15}, {-1,1,0}; флаг ok=true; цикл: если add != want — ok=false. Напечатай ok.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">true</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func add(a, b int) int { return a + b }\n\nfunc main() {\n    tests := []struct{ a, b, want int }{\n        {1, 2, 3},\n        {10, 5, 15},\n        {-1, 1, 0},\n    }\n    ok := true\n    for _, t := range tests {\n        if add(t.a, t.b) != t.want {\n            ok = false\n        }\n    }\n    fmt.Println(ok)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "true"
    },
    {
        id: 88,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 88: Две ошибки из двух вызовов",
        theory: `
            <h2>Урок 88: Проверяем обе ветки</h2>
            <p>Знакомство с err «на сухую»: <code class="inline">e1 == nil</code> — булеан-доказательство, что успех прошёл без ошибки.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши divide(a, b float64) (float64, error) с errors.New("div0") на нуле. В main: два вызова divide(10,2) и divide(5,0); одним Println напечатай r1, e1==nil, r2, e2!=nil.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">5 true 0 true</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"errors"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(&quot;div0&quot;)\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    r1, e1 := divide(10, 2)\n    r2, e2 := divide(5, 0)\n    fmt.Println(r1, e1 == nil, r2, e2 != nil)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"errors"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "5 true 0 true"
    },
    {
        id: 89,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 89: Правильная инициализация map",
        theory: `
            <h2>Урок 89: nil map паникует</h2>
            <p>Читать из nil-мапы можно, писать — паника. Инициализация: <code class="inline">map[string]int{}</code> или <code class="inline">make(map[string]int)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: создай scores как map[string]int{}; запиши «go»=10, «rust»=8; напечатай len(scores) и scores["go"] через Println.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">2 10</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="8" placeholder='func main() {\n    scores := map[string]int{}\n    scores[&quot;go&quot;] = 10\n    scores[&quot;rust&quot;] = 8\n    fmt.Println(len(scores), scores[&quot;go&quot;])\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "2 10"
    },
    {
        id: 90,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 90: Рефакторинг в чистую функцию",
        theory: `
            <h2>Урок 90: Одна функция — одна работа</h2>
            <p>Формула периметра <code class="inline">2 * (w + h)</code> заслуживает имени: main только дергает, функция считает. Чистая = легко тестировать.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func perimeter(w, h int) int</code>. В main: печать perimeter(3, 4).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">14</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="9" placeholder='func perimeter(w, h int) int {\n    return 2 * (w + h)\n}\n\nfunc main() {\n    fmt.Println(perimeter(3, 4))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "14"
    },
    {
        id: 91,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 91: Zero values по умолчанию",
        theory: `
            <h2>Урок 91: Go не оставляет мусора</h2>
            <p>У всего есть нуль: int→0, string→"", bool→false. Формат <code class="inline">Printf("%d|%s|%t", ...)</code> выведет их как есть: %d — число, %s — строка, %t — false/true.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main обяви var i int; var s string; var b bool и напечатай их одним Printf с этим форматом.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">0||false</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="8" placeholder='func main() {\n    var i int\n    var s string\n    var b bool\n    fmt.Printf(&quot;%d|%s|%t&quot;, i, s, b)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "0||false"
    },
    {
        id: 92,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 92: strings.Builder против конкатенации",
        theory: `
            <h2>Урок 92: Собираем строки правильно</h2>
            <p><code class="inline">var sb strings.Builder</code> + <code class="inline">sb.WriteString(x)</code> — без реаллокаций на каждый кусок. Пробелы вставляй только между словами (i &gt; 0).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: words := []string{"Go", "is", "fun"}; построй строку через Builder; печать sb.String().</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">Go is fun</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"strings"<br>)<br><br><textarea id="user-code" rows="13" placeholder='func main() {\n    var sb strings.Builder\n    words := []string{&quot;Go&quot;, &quot;is&quot;, &quot;fun&quot;}\n    for i, w := range words {\n        if i &gt; 0 {\n            sb.WriteString(&quot; &quot;)\n        }\n        sb.WriteString(w)\n    }\n    fmt.Println(sb.String())\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"strings"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "Go is fun"
    },
    {
        id: 93,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 93: Чистый JSON с omitempty",
        theory: `
            <h2>Урок 93: Меньше мусора в ответе</h2>
            <p>Тег <code class="inline">json:"items,omitempty"</code> убирает поле из JSON, если оно пустое (nil-слайс — пустое).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Опиши Order{ID int <code class="inline">\`json:"id"\`</code>; Items []string <code class="inline">\`json:"items,omitempty"\`</code>}. В main: Marshal(Order{ID: 1}) и печать string(data).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">{"id":1} — Items исчезло</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"encoding/json"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br><textarea id="user-code" rows="11" placeholder='type Order struct {\n    ID    int      &#96;json:&quot;id&quot;&#96;\n    Items []string &#96;json:&quot;items,omitempty&quot;&#96;\n}\n\nfunc main() {\n    data, _ := json.Marshal(Order{ID: 1})\n    fmt.Println(string(data))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"encoding/json"
	"fmt"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "{\"id\":1}"
    },
    {
        id: 94,
        moduleId: 12,
        moduleTitle: "Раздел 12: Чистый код и качество",
        title: "Урок 94: Финал — полный конвейер",
        theory: `
            <h2>Урок 94: Дипломный проект</h2>
            <p>Финал собирает весь курс: worker pool + pipeline + WaitGroup + close + range. Порядок из урока 71: jobs заполнены и закрыты → воркеры отработали → wg.Wait → close(out) → потребитель.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>3 воркера возводят задания в квадрат (jobs → out). main кладёт 1..5, закрывает jobs, ждёт WaitGroup, закрывает out, суммирует out и печатает сумму.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">55 = 1+4+9+16+25</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sync"<br>)<br><br><textarea id="user-code" rows="14" placeholder='func main() {\n    var wg sync.WaitGroup\n    jobs := make(chan int, 5)\n    out := make(chan int, 5)\n    for w := 0; w &lt; 3; w++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            for j := range jobs {\n                out &lt;- j * j\n            }\n        }()\n    }\n    for i := 1; i &lt;= 5; i++ {\n        jobs &lt;- i\n    }\n    close(jobs)\n    wg.Wait()\n    close(out)\n    sum := 0\n    for v := range out {\n        sum += v\n    }\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sync"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "55",
        errorMessage: "Потребитель не заканчивает range: стадия обязана закрыть выходной канал перед Wait.",
        isLast: true
    }
];
