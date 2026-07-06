// js/data/module1.js
export const module1Lessons = [
    {
        id: 1,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 1: Первая программа и пакеты",
        theory: `
            <h2>Урок 1: Первая программа и пакеты</h2>
            <p>Язык Go (Golang) спроектирован в Google для создания высокопроизводительных и надежных сервисов. Каждая программа в Go состоит из пакетов. Пакет <code class="inline">main</code> является отправной точкой.</p>
            <p>Конструкция <code class="inline">import "fmt"</code> подключает стандартный пакет форматирования ввода-вывода.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Допиши пропущенный код внутри функции <code class="inline">main()</code> справа, чтобы вывести в консоль точную строчку <strong>Hello, World!</strong></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println("Hello, World!")' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#21262d",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Hello, World!"
    },
    {
        id: 2,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 2: Переменные и оператор :=",
        theory: `
            <h2>Урок 2: Переменные и оператор :=</h2>
            <p>В Go переменные создаются с помощью оператора короткого объявления <code class="inline">:=</code>. Он сам определяет тип данных.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Объяви переменную <code class="inline">answer</code> со значением <code class="inline">42</code> и выведи её через <code class="inline">fmt.Println(answer)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='answer := 42\nfmt.Println(answer)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#161b22",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "42"
    },
    {
        id: 3,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 3: Разница между Print и Println",
        theory: `
            <h2>Урок 3: Разница между Print и Println</h2>
            <p><code class="inline">Println</code> автоматически переносит курсор на новую строку, а <code class="inline">Print</code> оставляет его на той же строке.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Используя только <code class="inline">fmt.Print</code>, выведи сначала <code class="inline">"Go"</code>, а затем число <code class="inline">2026</code>, чтобы получилось <code class="inline">Go2026</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder="fmt.Print(&quot;Go&quot;)&#10;fmt.Print(2026)" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "Go2026"
    },
    {
        id: 4,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 4: Форматирование строк через Printf",
        theory: `
            <h2>Урок 4: Форматирование строк через Printf</h2>
            <p>Функция <code class="inline">fmt.Printf</code> позволяет собирать строки по шаблону-трафарету. Вместо склеивания строк плюсиками, мы пишем общую строку, вставляя в неё специальные спецификаторы (флаги):</p>
            <ul>
                <li><code class="inline">%s</code> — подставляет <b>строку</b> (string)</li>
                <li><code class="inline">%d</code> — подставляет <b>целое число</b> (int)</li>
            </ul>
            <p>Пример: <code class="inline">fmt.Printf("Привет, %s! Тебе %d лет.", "Илья", 37)</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Внутри функции объявлены две переменные: <code class="inline">name := "Валли"</code> и <code class="inline">charge := 95</code>.</p>
            <p>Используя <code class="inline">fmt.Printf</code>, выведи в консоль строго фразу: <code class="inline">Робот Валли заряжен на 95%</code>.</p>
            <p><i>Подсказка: чтобы вывести обычный знак процента внутри шаблона Printf, его нужно продублировать: %%</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;name := <span style="color: #a5d6ff;">"Валли"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;charge := <span style="color: #79c0ff;">95</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Printf("Робот %s заряжен на %d%%", name, charge)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        // БРОНЕБОЙНОСТЬ: Подмешиваем объявление переменных прямо в итоговый исполняемый код!
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tname := "Валли"\n\tcharge := 95\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Робот Валли заряжен на 95%"
    }
    ,
    {
        id: 5,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 5: Базовые типы данных",
        theory: `
            <h2>Урок 5: Базовые типы данных</h2>
            <p>В Go у каждого значения есть строгий тип. Если переменная создана как число, в неё нельзя записать текст. Вот 4 главных типа:</p>
            <ul>
                <li><code class="inline">int</code> — целые числа (<code class="inline">10</code>, <code class="inline">-5</code>, <code class="inline">0</code>).</li>
                <li><code class="inline">float64</code> — дробные числа (<code class="inline">3.14</code>, <code class="inline">0.5</code>). <b>Важно:</b> разделяются точкой!</li>
                <li><code class="inline">string</code> — текст в двойных кавычках (<code class="inline">"Привет"</code>).</li>
                <li><code class="inline">bool</code> — логический тип, принимает только <code class="inline">true</code> (истина) или <code class="inline">false</code> (ложь).</li>
            </ul>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В редакторе созданы две переменные с помощью <code class="inline">:=</code>. Go автоматически сделал их типами <code class="inline">float64</code> и <code class="inline">bool</code>.</p>
            <p>Твоя задача — используя изученный <code class="inline">fmt.Printf</code> или <code class="inline">fmt.Println</code>, вывести дробное число и статус одной строкой через пробел.</p>
            <p>Напиши команду вывода так, чтобы в консоль напечаталось: <code class="inline">3.14 true</code></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;pi := <span style="color: #79c0ff;">3.14</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;isActive := <span style="color: #ff7b72;">true</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(pi, isActive)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tpi := 3.14\n\tisActive := true\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "3.14 true" || stdout.trim() === "3.140000 true"
    },
    {
        id: 6,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 6: Константы (const)",
        theory: `
            <h2>Урок 6: Константы (const)</h2>
            <p>Если переменная может менять свое значение в процессе работы программы, то <b>константа</b> определяется один раз и никогда не меняется. Если попробовать перезаписать константу, Go выдаст ошибку компиляции.</p>
            <p>Константы объявляются с помощью ключевого слова <code class="inline">const</code>. Использовать оператор <code class="inline">:=</code> с ними <b>нельзя</b>!</p>
            <p>Пример: <code class="inline">const StatusOk = 200</code></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде уже объявлена константа <code class="inline">const MainDomain = "yoursite.ru"</code>.</p>
            <p>Создай ниже еще одну константу с именем <code class="inline">HttpPort</code> и присвой ей числовое значение <code class="inline">8080</code>.</p>
            <p>После этого выведи их вместе через <code class="inline">fmt.Println(MainDomain, HttpPort)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">const</span> MainDomain = <span style="color: #a5d6ff;">"yoursite.ru"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='const HttpPort = 8080\nfmt.Println(MainDomain, HttpPort)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tconst MainDomain = "yoursite.ru"\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "yoursite.ru 8080"
    },
    {
        id: 7,
        moduleId: 1,
        moduleTitle: "Раздел 1: Знакомство со вселенной Go",
        title: "Урок 7: Арифметика в Go",
        theory: `
            <h2>Урок 7: Арифметика в Go</h2>
            <p>В Go доступны все классические математические операции: <code class="inline">+</code>, <code class="inline">-</code>, <code class="inline">*</code>, <code class="inline">/</code>.</p>
            <p>Также есть очень важный оператор <b>остатка от деления</b> — <code class="inline">%</code> (модуль). Он возвращает то, что осталось после деления одного целого числа на другое. Например, <code class="inline">5 % 2</code> вернет <code class="inline">1</code> (потому что 4 делится на 2 нацело, а 1 остается).</p>
            <p><b>Важное правило Go:</b> нельзя совершать математические действия между разными типами (например, складывать <code class="inline">int</code> и <code class="inline">float64</code>), сначала нужно перевести их к одному типу!</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Даны два целых числа: <code class="inline">a := 17</code> и <code class="inline">b := 5</code>.</p>
            <p>Найди остаток от деления <code class="inline">a</code> на <code class="inline">b</code>, запиши результат в новую переменную <code class="inline">remainder</code> и выведи её на экран через <code class="inline">fmt.Println</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a := <span style="color: #79c0ff;">17</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;b := <span style="color: #79c0ff;">5</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='remainder := a % b\nfmt.Println(remainder)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\ta := 17\n\tb := 5\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "2"
    }
];