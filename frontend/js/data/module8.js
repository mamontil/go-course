// js/data/module8.js
export const module8Lessons = [
    {
        id: 56,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 56: Интерфейс any и проверка типа",
        theory: `
            <h2>Урок 56: any — коробка для чего угодно</h2>
            <p>Тип <code class="inline">any</code> (он же <code class="inline">interface{}</code>) — это универсальная «коробка», в которую можно положить значение любого типа: число, строку, struct.</p>
            <p>Но чтобы достать содержимое, коробку надо открыть — сделать <b>проверку типа</b>: <code class="inline">value.(string)</code>. Если тип не совпал, программа запаникует, поэтому в бою используют безопасную форму с двумя возвращаемыми значениями: <code class="inline">s, ok := value.(string)</code>.</p>
            <p>С «коробкой» any математические операции недоступны — сначала распакуй значение в конкретный тип.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В переменную <code class="inline">value</code> типа <code class="inline">any</code> упакован float64. Распакуй его обратно как <code class="inline">value.(float64)</code> — программа умножит число на 2 и напечатает <code class="inline">6</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> value <span style="color: #79c0ff;">any</span> = <span style="color: #79c0ff;">3.14</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;num := <textarea id="user-code" rows="2" placeholder='value.(float64)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Printf(<span style="color: #a5d6ff;">"%.0f\\n"</span>, num*<span style="color: #79c0ff;">2</span>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tvar value any = 3.14\n\tnum := ${input}\n\tfmt.Printf("%.0f\\n", num*2)\n}`,
        validate: (stdout) => stdout.trim() === "6"
    },
    {
        id: 57,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 57: Type switch — ветвление по типу",
        theory: `
            <h2>Урок 57: Type switch</h2>
            <p>Когда типов-кандидатов несколько, проверок <code class="inline">x.(T)</code> подряд не хватит. Для этого есть <b>type switch</b>:</p>
            <pre><code class="block">switch v := i.(type) {
case int:
    // v имеет тип int
case string:
    // v имеет тип string
}</code></pre>
            <p>Переменная <code class="inline">v</code> в каждом кейсе автоматически получает нужный тип — можно сразу вызывать профильные методы. Так пишут универсальные сериализаторы и логгеры.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">describe</code> уже готова. Вызови её с числом <code class="inline">42</code> и выведи результат — программа должна напечатать <code class="inline">int 42</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"strconv"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">describe</span>(i <span style="color: #79c0ff;">any</span>) <span style="color: #79c0ff;">string</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">switch</span> v := i.(<span style="color: #ff7b72;">type</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> <span style="color: #79c0ff;">int</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"int "</span> + strconv.Itoa(v)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> <span style="color: #79c0ff;">string</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"string "</span> + v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">default</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"unknown"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(describe(42))' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"strconv"\n)\n\nfunc describe(i any) string {\n\tswitch v := i.(type) {\n\tcase int:\n\t\treturn "int " + strconv.Itoa(v)\n\tcase string:\n\t\treturn "string " + v\n\tdefault:\n\t\treturn "unknown"\n\t}\n}\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "int 42"
    },
    {
        id: 58,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 58: JSON — сериализация структур",
        theory: `
            <h2>Урок 58: JSON.Marshal</h2>
            <p>JSON — язык общения бэкенда: API, конфиги, логи. В Go за него отвечает пакет <code class="inline">encoding/json</code>.</p>
            <p><code class="inline">json.Marshal(v)</code> превращает структуру в массив байтов JSON. Чтобы поле попало в JSON, оно <b>обязательно должно быть экспортируемым</b> (с большой буквы), а каноническое имя задаётся тегом: <code class="inline">json:"name"</code> в обратных кавычках.</p>
            <p>Без тега поле всё равно уйдёт в JSON, но с именем «как в Go» — Name вместо name. Для API это моветон.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Структура уже упакована в <code class="inline">data</code>. Выведи её как строку через <code class="inline">fmt.Println(string(data))</code> — ожидается точный JSON из двух полей.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"encoding/json"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">type</span> User <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Name <span style="color: #79c0ff;">string</span> <span style="color: #a5d6ff;">&#96;json:"name"&#96;</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp; <span style="color: #79c0ff;">int</span>&nbsp;&nbsp; <span style="color: #a5d6ff;">&#96;json:"age"&#96;</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;data, _ := json.Marshal(User{"Ann", <span style="color: #79c0ff;">25</span>})<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(string(data))' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => 'package main\n\nimport (\n\t"encoding/json"\n\t"fmt"\n)\n\ntype User struct {\n\tName string `json:"name"`\n\tAge  int    `json:"age"`\n}\n\nfunc main() {\n\tdata, _ := json.Marshal(User{"Ann", 25})\n\t' + input + '\n}',
        validate: (stdout) => stdout.trim() === '{"name":"Ann","age":25}'
    },
    {
        id: 59,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 59: JSON — десериализация в структуру",
        theory: `
            <h2>Урок 59: JSON.Unmarshal</h2>
            <p>Обратная операция: <code class="inline">json.Unmarshal(bytes, &target)</code> читает JSON и раскладывает поля по структуре-получателю.</p>
            <p>Вторым аргументом всегда передают <b>указатель</b> (<code class="inline">&amp;b</code>) — иначе unmarshal не сможет заполнить твою переменную, ведь Go копирует аргументы (помнишь урок 42?).</p>
            <p>Лишние поля в JSON молча игнорируются, а недостающие остаются zero-value. Строгая проверка — это уже уровень <code class="inline">Decoder.DisallowUnknownFields()</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>JSON уже распарсен в структуру <code class="inline">b</code>. Выведи <code class="inline">b.Title</code> и <code class="inline">b.Price</code> через Println (в одну строку через пробел) — ожидается <code class="inline">Go Book 10</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"encoding/json"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">type</span> Book <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Title <span style="color: #79c0ff;">string</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Price <span style="color: #79c0ff;">int</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;raw := <span style="color: #a5d6ff;">"{\\"title\\":\\"Go Book\\",\\"price\\":10}"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> b Book<br>
            &nbsp;&nbsp;&nbsp;&nbsp;json.Unmarshal([]<span style="color: #79c0ff;">byte</span>(raw), &amp;b)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(b.Title, b.Price)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"encoding/json"\n\t"fmt"\n)\n\ntype Book struct {\n\tTitle string\n\tPrice int\n}\n\nfunc main() {\n\traw := "{\\"title\\":\\"Go Book\\",\\"price\\":10}"\n\tvar b Book\n\tjson.Unmarshal([]byte(raw), &b)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Go Book 10"
    },
    {
        id: 60,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 60: strings и strconv — строковые утилиты",
        theory: `
            <h2>Урок 60: Строки и конвертация</h2>
            <p>Строка — это байты, а число — это машинное значение. Между ними мостит пакет <code class="inline">strconv</code>: <code class="inline">strconv.Atoi("100")</code> превращает строку в int (от ASCII to integer), а <code class="inline">strconv.Itoa(100)</code> — наоборот.</p>
            <p>Нельзя просто сложить <code class="inline">"100" + 50</code> — Go заставит сначала сконвертировать типы.</p>
            <p>Рядом живёт пакет <code class="inline">strings</code> с утилитами <code class="inline">Contains</code>, <code class="inline">Split</code>, <code class="inline">Join</code> и <code class="inline">TrimSpace</code> — весь ежедневный инструментарий бэкендера.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Строка <code class="inline">str := "100"</code> уже сконвертирована в <code class="inline">num</code>. Выведи <code class="inline">num + 50</code> — программа должна напечатать <code class="inline">150</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"strconv"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;str := <span style="color: #a5d6ff;">"100"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;num, _ := strconv.Atoi(str)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(num + 50)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"strconv"\n)\n\nfunc main() {\n\tstr := "100"\n\tnum, _ := strconv.Atoi(str)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "150"
    },
    {
        id: 61,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 61: Сортировка — sort.Slice и компаратор",
        theory: `
            <h2>Урок 61: sort.Slice</h2>
            <p>Пакет <code class="inline">sort</code> умеет сортировать что угодно. Самый гибкий инструмент — <code class="inline">sort.Slice</code>, которому передаёшь слайс и <b>функцию-компаратор</b>.</p>
            <p>Компаратор <code class="inline">func(i, j int) bool</code> получает индексы двух элементов и отвечает на вопрос: «должен ли элемент i стоять ПЕРЕД элементом j?».</p>
            <p><code class="inline">s[i] &lt; s[j]</code> — сортировка по возрастанию, <code class="inline">s[i] &gt; s[j]</code> — по убыванию. Так же сортируют и struct-ы: по имени, по цене, по дате.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Отсортируй слайс <code class="inline">nums</code> по убыванию, вернув из компаратора условие <code class="inline">nums[i] > nums[j]</code>. Ответ программы: <code class="inline">[9 5 2]</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sort"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;nums := []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">5</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">9</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;sort.Slice(nums, <span style="color: #ff7b72;">func</span>(i, j <span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">bool</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <textarea id="user-code" rows="2" placeholder='nums[i] > nums[j]' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;})<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(nums)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sort"\n)\n\nfunc main() {\n\tnums := []int{5, 2, 9}\n\tsort.Slice(nums, func(i, j int) bool {\n\t\treturn ${input}\n\t})\n\tfmt.Println(nums)\n}`,
        validate: (stdout) => stdout.trim() === "[9 5 2]"
    },
    {
        id: 62,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 62: Время — time.Duration",
        theory: `
            <h2>Урок 62: Длительности</h2>
            <p>Тип <code class="inline">time.Duration</code> — это число наносекунд, но записывается оно человекочитаемо: <code class="inline">5 * time.Second</code>, <code class="inline">3 * time.Minute</code>, <code class="inline">250 * time.Millisecond</code>.</p>
            <p>Длительности можно складывать, делить друг на друга и сравнивать. Деление <code class="inline">timeout / time.Second</code> даёт «сколько секунд прошло», но результат всё ещё имеет тип Duration — для чистого числа его приводят через <code class="inline">int(...)</code>.</p>
            <p>Таймауты, retry-паузы, расчёт возраста — всё это Duration. Ошибка новичка — писать <code class="inline">time.Sleep(3)</code>: это sleep на 3 наносекунды, то есть почти мгновенно.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Константа <code class="inline">timeout</code> не задана. Запиши длительность <code class="inline">3 * time.Minute</code> — программа переведёт её в секунды и напечатает <code class="inline">180</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"time"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">const</span> timeout = <textarea id="user-code" rows="2" placeholder='3 * time.Minute' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(int(timeout / time.Second))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc main() {\n\tconst timeout = ${input}\n\tfmt.Println(int(timeout / time.Second))\n}`,
        validate: (stdout) => stdout.trim() === "180"
    },
    {
        id: 63,
        moduleId: 8,
        moduleTitle: "Раздел 8: Стандартная библиотека и данные",
        title: "Урок 63: Дженерики — код для многих типов",
        theory: `
            <h2>Урок 63: Дженерики</h2>
            <p>До Go 1.18 для «универсальной» функции приходилось писать кучу копий под каждый тип или терять типы ради <code class="inline">any</code>. Теперь есть <b>дженерики</b>:</p>
            <pre><code class="block">func first[T any](s []T) T {
    return s[0]
}</code></pre>
            <p>Квадратные скобки <code class="inline">[T any]</code> — параметр типа: Go подставит конкретный тип при вызове. Ограничение <code class="inline">any</code> разрешает любой тип, а <code class="inline">[T cmp.Ordered]</code> — только сравниваемые числа/строки.</p>
            <p>Тип выводится автоматически: <code class="inline">first([]string{"a"})</code> — и T уже string, указывать руками не нужно.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дженерик-функция <code class="inline">first</code> готова. Вызови её со слайсом <code class="inline">[]string{"Go", "course"}</code> внутри Println — программа напечатает <code class="inline">Go</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">first</span>[T <span style="color: #79c0ff;">any</span>](s []T) T {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> s[<span style="color: #79c0ff;">0</span>]<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<textarea id="user-code" rows="2" placeholder='first([]string{"Go", "course"})' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc first[T any](s []T) T {\n\treturn s[0]\n}\n\nfunc main() {\n\tfmt.Println(${input})\n}`,
        validate: (stdout) => stdout.trim() === "Go"
    }
];
