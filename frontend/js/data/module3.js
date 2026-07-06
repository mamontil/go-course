// js/data/module3.js
export const module3Lessons = [
    {
        id: 21,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 21: Массивы (Arrays) фиксированной длины",
        theory: `
            <h2>Урок 21: Массивы (Arrays) фиксированной длины</h2>
            <p>В Go массивы имеют <b>строго фиксированную длину</b>, которую нужно указывать при создании. Изменить размер массива после создания нельзя.</p>
            <p>Синтаксис объявления: <code class="inline">[размер]тип{элементы}</code>. Индексация, как и везде, начинается с нуля.</p>
            <p>Пример массива из 3 целых чисел: <code class="inline">nums := [3]int{10, 20, 30}</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Объяви массив с именем <code class="inline">prices</code>, который состоит ровно из <b>2 элементов</b> типа <code class="inline">int</code> со значениями <code class="inline">450</code> и <code class="inline">900</code>.</p>
            <p>После объявления выведи этот массив на экран через <code class="inline">fmt.Println(prices)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='prices := [2]int{450, 900}\nfmt.Println(prices)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "[450 900]"
    },
    {
        id: 22,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 22: Слайсы (Slices) — динамические массивы",
        theory: `
            <h2>Урок 22: Слайсы (Slices) — динамические массивы</h2>
            <p>Так как массивы фиксированы, в реальной разработке на Go в 99% случаев используют <b>Слайсы (срезы)</b>. Слайс — это динамический массив, который может расти.</p>
            <p>Синтаксис такой же, как у массива, но размер в квадратных скобках <b>не указывается</b>: <code class="inline">[]тип{элементы}</code>.</p>
            <p>Пример: <code class="inline">names := []string{"Илья", "Валли"}</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создай слайс строк с именем <code class="inline">langs</code>, содержащий три элемента: <code class="inline">"Go"</code>, <code class="inline">"PHP"</code>, <code class="inline">"JS"</code>.</p>
            <p>Выведи его в консоль с помощью <code class="inline">fmt.Println(langs)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='langs := []string{"Go", "PHP", "JS"}\nfmt.Println(langs)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "[Go PHP JS]"
    },
    {
        id: 23,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 23: Добавление элементов в слайс (append)",
        theory: `
            <h2>Урок 23: Добавление элементов в слайс (append)</h2>
            <p>Чтобы добавить новый элемент в конец слайса, используется встроенная функция <code class="inline">append(слайс, элемент)</code>.</p>
            <p><b>Важно:</b> функция <code class="inline">append</code> не изменяет старый слайс на месте, а возвращает <i>новый модифицированный слайс</i>. Поэтому результат нужно обязательно присвоить обратно в переменную.</p>
            <p>Пример: <code class="inline">todo = append(todo, "Купить молоко")</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде уже создан слайс <code class="inline">cart := []string{"phone"}</code>.</p>
            <p>Добавь в него элемент <code class="inline">"case"</code> с помощью функции <code class="inline">append</code> (не забудь перезаписать переменную <code class="inline">cart</code>!) и выведи обновленный слайс на экран.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cart := []<span style="color: #a5d6ff;">string</span>{<span style="color: #a5d6ff;">"phone"</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='cart = append(cart, "case")\nfmt.Println(cart)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tcart := []string{"phone"}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "[phone case]"
    },
    {
        id: 24,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 24: Обход слайса через for range",
        theory: `
            <h2>Урок 24: Обход слайса через for range</h2>
            <p>Для перебора элементов слайсов и массивов в Go используется специальная форма цикла — <code class="inline">for index, value := range слайс</code>.</p>
            <p>На каждом круге Go возвращает два значения: индекс элемента (0, 1, 2...) и само значение этого элемента.</p>
            <p>Если индекс внутри цикла не нужен, его нельзя просто оставить, иначе Go выдаст ошибку о неиспользуемой переменной. Вместо него пишут знак нижнего подчеркивания <code class="inline">_</code> (пустой идентификатор).</p>
            <p>Пример:<br>
            <pre><code class="block">for _, val := range items {
    fmt.Println(val)
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дан слайс <code class="inline">digits := []int{5, 9}</code>. Используя цикл <code class="inline">for _, v := range digits</code>, выведи каждое значение на экран с новой строки.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;digits := []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">5</span>, <span style="color: #79c0ff;">9</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder="for _, v := range digits {\n    fmt.Println(v)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tdigits := []int{5, 9}\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "59"
    },
    {
        id: 25,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 25: Карты (Maps) — ключ/значение",
        theory: `
            <h2>Урок 25: Карты (Maps) — ключ/значение</h2>
            <p>Карта (<code class="inline">map</code>) — это встроенная хэш-таблица или ассоциативный массив. Она хранит данные в формате «ключ — значение».</p>
            <p>Синтаксис объявления: <code class="inline">map[тип_ключа]тип_значения{"ключ": значение}</code>.</p>
            <p>Пример карты, где ключ — строка, а значение — число: <code class="inline">ages := map[string]int{"Илья": 37, "Валли": 5}</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создай мапу с именем <code class="inline">hosts</code>, где ключом будет строка, а значением — целое число (<code class="inline">int</code>).</p>
            <p>Положи туда одну пару: ключ <code class="inline">"localhost"</code> и значение <code class="inline">8080</code>. Выведи мапу на экран через <code class="inline">fmt.Println(hosts)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='hosts := map[string]int{"localhost": 8080}\nfmt.Println(hosts)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "map[localhost:8080]"
    },
    {
        id: 26,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 26: Работа со значениями в Map",
        theory: `
            <h2>Урок 26: Работа со значениями в Map</h2>
            <p>Получить или изменить значение в мапе очень просто: достаточно указать ключ в квадратных скобках: <code class="inline">m["key"] = 100</code>.</p>
            <p>Если ключа в мапе нет, Go не падает с ошибкой, а возвращает дефолтное "нулевое" значение для этого типа (например, 0 для чисел или пустую строку для string).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде дана мапа <code class="inline">prices := map[string]int{"apple": 100}</code>.</p>
            <p>Добавь в неё новый ключ <code class="inline">"banana"</code> со значением <code class="inline">150</code>, а затем выведи только значение банана на экран: <code class="inline">fmt.Println(prices["banana"])</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;prices := <span style="color: #ff7b72;">map</span>[<span style="color: #a5d6ff;">string</span>]<span style="color: #79c0ff;">int</span>{<span style="color: #a5d6ff;">"apple"</span>: <span style="color: #79c0ff;">100</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='prices["banana"] = 150\nfmt.Println(prices["banana"])' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tprices := map[string]int{"apple": 100}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "150"
    },
    {
        id: 27,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 27: Создание функций (func)",
        theory: `
            <h2>Урок 27: Создание функций (func)</h2>
            <p>Функции помогают разделять код на независимые переиспользуемые блоки. Функция объявляется ключевым словом <code class="inline">func</code>, за которым идет имя, круглые скобки с аргументами и тип возвращаемого значения.</p>
            <p>Пример функции, принимающей число и ничего не возвращающей:<br>
            <pre><code class="block">func sayNumber(n int) {
    fmt.Println(n)
}</code></pre></p>
            <p><b>Внимание:</b> Наш песочный бэкенд оборачивает твой ввод в функцию <code class="inline">main</code>. Чтобы объявить новую функцию, мы настроили этот урок так, что твой код подставится <b>снаружи</b> main. Тебе нужно написать саму функцию и внутри нее вызвать печать.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши функцию с именем <code class="inline">welcome</code>, которая принимает один аргумент с именем <code class="inline">name</code> типа <code class="inline">string</code> и внутри себя печатает на экран: <code class="inline">Привет, Валли</code> (используй переменную name внутри функции!).</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <textarea id="user-code" rows="4" placeholder="func welcome(name string) {\n    fmt.Println(&quot;Привет, &quot; + name)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;welcome(<span style="color: #a5d6ff;">"Валли"</span>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\n${input}\n\nfunc main() {\n\twelcome("Валли")\n}`,
        validate: (stdout) => stdout.trim() === "Привет, Валли"
    },
    {
        id: 28,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 28: Возврат значений из функции",
        theory: `
            <h2>Урок 28: Возврат значений из функции</h2>
            <p>Чтобы функция передала результат своей работы обратно наружу, используется оператор <code class="inline">return</code>. При этом после круглых скобок аргументов нужно обязательно указать тип возвращаемого значения.</p>
            <p>Пример:<br>
            <pre><code class="block">func square(n int) int {
    return n * n
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши функцию <code class="inline">double</code>, которая принимает один аргумент <code class="inline">x</code> типа <code class="inline">int</code>, умножает его на 2 и <b>возвращает</b> (через return) полученное int значение.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <textarea id="user-code" rows="4" placeholder="func double(x int) int {\n    return x * 2\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(double(<span style="color: #79c0ff;">21</span>))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\n${input}\n\nfunc main() {\n\tfmt.Println(double(21))\n}`,
        validate: (stdout) => stdout.trim() === "42"
    },
    {
        id: 29,
        moduleId: 3,
        moduleTitle: "Раздел 3: Хранилища данных и функции",
        title: "Урок 29: Множественный возврат — фишка Go",
        theory: `
            <h2>Урок 29: Множественный возврат — фишка Go</h2>
            <p>Главная архитектурная особенность функций в Go — они могут возвращать <b>сразу несколько значений</b> за один раз. Это избавляет от необходимости создавать лишние массивы или объекты ради возврата пары переменных.</p>
            <p>Если возвращаемых типов несколько, они перечисляются через запятую внутри круглых скобок после аргументов: <code class="inline">func Сделать() (int, string)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши функцию <code class="inline">getCoords</code>, которая не принимает аргументов, но возвращает два числа типа <code class="inline">int</code>: сначала <code class="inline">10</code>, а затем <code class="inline">20</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <textarea id="user-code" rows="4" placeholder="func getCoords() (int, int) {\n    return 10, 20\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;x, y := getCoords()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(x, y)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\n${input}\n\nfunc main() {\n\tx, y := getCoords()\n\tfmt.Println(x, y)\n}`,
        validate: (stdout) => stdout.trim() === "10 20"
    }
];