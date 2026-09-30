// js/data/module8.js
export const module8Lessons = [
    {
        id: 56,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 56: any и проверка типа",
        theory: `
            <h2>Урок 56: Коробка any</h2>
            <p><code class="inline">var v any = ...</code> хранит значение любого типа. Вернуть конкретный тип можно проверкой <code class="inline">v.(string)</code> — иначе арифметика/len недоступны.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: <code class="inline">var val any = "golang"</code>; распакуй в <code class="inline">s := val.(string)</code> и напечатай <code class="inline">len(s)</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">6</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="7" placeholder='func main() {\n    var val any = &quot;golang&quot;\n    s := val.(string)\n    fmt.Println(len(s))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "6"
    },
    {
        id: 57,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 57: Type switch",
        theory: `
            <h2>Урок 57: Ветвление по типу</h2>
            <p><code class="inline">switch x := v.(type)</code> в каждом кейсе даёт x уже нужным типом: <code class="inline">case int:</code>, <code class="inline">case string:</code>, <code class="inline">default:</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func describe(v any) string</code>: для int верни <code class="inline">fmt.Sprintf("int %d", x)</code>, для string — «string » + x, иначе «unknown». В main напечатай describe(42).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">int 42</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func describe(v any) string {\n    switch x := v.(type) {\n    case int:\n        return fmt.Sprintf(&quot;int %d&quot;, x)\n    case string:\n        return &quot;string &quot; + x\n    default:\n        return &quot;unknown&quot;\n    }\n}\n\nfunc main() {\n    fmt.Println(describe(42))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "int 42"
    },
    {
        id: 58,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 58: JSON — сериализация",
        theory: `
            <h2>Урок 58: json.Marshal</h2>
            <p>Структура User с тегами <code class="inline">json:"name"</code> и <code class="inline">json:"age"</code> дана в скелете. <code class="inline">json.Marshal(u)</code> возвращает <code class="inline">([]byte, error)</code> — байты JSON. Печатать нужно через <code class="inline">string(data)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: собери <code class="inline">User{"Ann", 30}</code>, замаршализуй (ошибку проглоти через _) и напечатай строку.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">{"name":"Ann","age":30}</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"encoding/json"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br>type User struct {<br>&nbsp;&nbsp;&nbsp;&nbsp;Name string &#96;json:"name"&#96;<br>&nbsp;&nbsp;&nbsp;&nbsp;Age  int   &#96;json:"age"&#96;<br>}<br><br><textarea id="user-code" rows="7" placeholder='func main() {\n    u := User{&quot;Ann&quot;, 30}\n    data, _ := json.Marshal(u)\n    fmt.Println(string(data))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	Name string \`json:"name"\`
	Age  int   \`json:"age"\`
}

${input}
`,
        validate: (stdout) => stdout.trim() === "{\"name\":\"Ann\",\"age\":30}"
    },
    {
        id: 59,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 59: JSON — разбор в структуру",
        theory: `
            <h2>Урок 59: json.Unmarshal</h2>
            <p>В скелете: Book и строка raw с JSON. <code class="inline">json.Unmarshal([]byte(raw), &amp;b)</code> разберёт JSON в переменную — обязательно по <b>адресу</b> (урок 42!). Имена полей матчатся нечувствительно к регистру.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: обяви <code class="inline">var b Book</code>, распакуй raw в &amp;b и напечатай b.Title и b.Price через Println (в одну строку).</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">Go 10</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"encoding/json"<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>)<br><br>type Book struct {<br>&nbsp;&nbsp;&nbsp;&nbsp;Title string<br>&nbsp;&nbsp;&nbsp;&nbsp;Price int<br>}<br><br>const raw = &#96;{"title":"Go","price":10}&#96;<br><br><textarea id="user-code" rows="7" placeholder='func main() {\n    var b Book\n    json.Unmarshal([]byte(raw), &amp;b)\n    fmt.Println(b.Title, b.Price)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"encoding/json"
	"fmt"
)

type Book struct {
	Title string
	Price int
}

const raw = \`{"title":"Go","price":10}\`

${input}
`,
        validate: (stdout) => stdout.trim() === "Go 10"
    },
    {
        id: 60,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 60: strconv.Atoi",
        theory: `
            <h2>Урок 60: Строка → число</h2>
            <p><code class="inline">strconv.Atoi("55")</code> возвращает <code class="inline">(int, error)</code>: число и nil, либо ошибку, если строка не число. Пропускать проверку err — плохая привычка.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: переведи «55» в n с проверкой err (при ошибке печать «bad» и return). Напечатай <code class="inline">n + 45</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">100</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"strconv"<br>)<br><br><textarea id="user-code" rows="10" placeholder='func main() {\n    n, err := strconv.Atoi(&quot;55&quot;)\n    if err != nil {\n        fmt.Println(&quot;bad&quot;)\n        return\n    }\n    fmt.Println(n + 45)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"strconv"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "100"
    },
    {
        id: 61,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 61: sort.Slice с компаратором",
        theory: `
            <h2>Урок 61: Сортировка</h2>
            <p><code class="inline">sort.Slice(nums, func(i, j int) bool { ... })</code> сортирует на месте. Компаратор отвечает на вопрос «элемент i должен идти ПЕРЕД j?». <code class="inline">nums[i] &gt; nums[j]</code> = по убыванию.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: слайс []int{3, 1, 4, 1, 5}; отсортируй по убыванию и напечатай слайс целиком.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">[5 4 3 1 1]</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"sort"<br>)<br><br><textarea id="user-code" rows="9" placeholder='func main() {\n    nums := []int{3, 1, 4, 1, 5}\n    sort.Slice(nums, func(i, j int) bool {\n        return nums[i] &gt; nums[j]\n    })\n    fmt.Println(nums)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"sort"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "[5 4 3 1 1]"
    },
    {
        id: 62,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 62: Время замеры — time.Now / Since",
        theory: `
            <h2>Урок 62: time.Duration</h2>
            <p><code class="inline">start := time.Now()</code> ... работа ... <code class="inline">time.Since(start)</code> — сколько длилось. Duration можно присвоить переменной и «проглотить» через <code class="inline">_ =</code>, чтобы импорт time был задействован.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В main: запомни start, в цикле просуммируй <code class="inline">sum += i</code> для i от 0 до 99999, сделай <code class="inline">elapsed := time.Since(start)</code> и <code class="inline">_ = elapsed</code>. Напечатай sum.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">4999950000</code></p>`,
        renderEditor: () => `\n            package main<br><br>import (<br>&nbsp;&nbsp;&nbsp;&nbsp;"fmt"<br>&nbsp;&nbsp;&nbsp;&nbsp;"time"<br>)<br><br><textarea id="user-code" rows="12" placeholder='func main() {\n    start := time.Now()\n    sum := 0\n    for i := 0; i &lt; 100000; i++ {\n        sum += i\n    }\n    elapsed := time.Since(start)\n    _ = elapsed\n    fmt.Println(sum)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import (
	"fmt"
	"time"
)

${input}
`,
        validate: (stdout) => stdout.trim() === "4999950000"
    },
    {
        id: 63,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 63: Первая дженерик-функция",
        theory: `
            <h2>Урок 63: [T any]</h2>
            <p><code class="inline">func first[T any](s []T) T { return s[0] }</code> — работает с любым типом слайса, тип выводится из вызова. Никакого any-кастинга внутри!</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши функцию first по примеру выше. В main: <code class="inline">fmt.Println(first([]string{"Go", "Rust"}))</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">Go</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="9" placeholder='func first[T any](s []T) T {\n    return s[0]\n}\n\nfunc main() {\n    fmt.Println(first([]string{&quot;Go&quot;, &quot;Rust&quot;}))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "Go"
    }
];
