// js/data/module6.js
export const module6Lessons = [
    {
        id: 41,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 41: Что такое указатель — & и *",
        theory: `
            <h2>Урок 41: Что такое указатель</h2>
            <p>Каждая переменная занимает место в памяти компьютера. <b>Указатель</b> — это специальная переменная, которая хранит не значение, а <b>адрес</b>, по которому это значение лежит.</p>
            <p>В Go указатель создаётся оператором <code class="inline">&amp;</code> (взять адрес), а значение по адресу читается оператором <code class="inline">*</code> (разыменование).</p>
            <p>Тип <code class="inline">*int</code> читается как «указатель на int». Разыменование <code class="inline">*p</code> возвращает лежащий по адресу int.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создана переменная <code class="inline">x := 10</code> и указатель на неё <code class="inline">p := &amp;x</code>. Выведи на экран значение, на которое указывает <code class="inline">p</code>, с помощью <code class="inline">*p</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;x := <span style="color: #79c0ff;">10</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;p := &amp;x<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(*p)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tx := 10\n\tp := &x\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "10"
    },
    {
        id: 42,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 42: Мутация через указатель — передача по ссылке",
        theory: `
            <h2>Урок 42: Изменяем данные через указатель</h2>
            <p>Go всегда передаёт аргументы в функцию <b>по значению</b> — копирует их. Если передать в функцию обычный <code class="inline">int</code>, внутри создастся копия, и оригинал не изменится.</p>
            <p>Но если передать <b>указатель</b> <code class="inline">*int</code>, функция получит адрес оригинальной переменной и сможет изменить её через разыменование: <code class="inline">*p = 0</code>.</p>
            <p>Именно так работают pointer-реципиенты у методов struct, которые ты уже проходил в разделе 4.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">setZero</code> принимает указатель и обнуляет значение по этому адресу. В <code class="inline">main</code> уже вызван <code class="inline">setZero(&amp;num)</code>. Выведи <code class="inline">num</code> на экран — должно печататься <code class="inline">0</code>!</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">setZero</span>(p *<span style="color: #79c0ff;">int</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;*p = <span style="color: #79c0ff;">0</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;num := <span style="color: #79c0ff;">5</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;setZero(&amp;num)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(num)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc setZero(p *int) {\n\t*p = 0\n}\n\nfunc main() {\n\tnum := 5\n\tsetZero(&num)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "0"
    },
    {
        id: 43,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 43: nil — указатель в никуда",
        theory: `
            <h2>Урок 43: nil-указатель</h2>
            <p>Если указатель объявлен, но ни на что не указывает, его значение — <code class="inline">nil</code>. Разыменование такого указателя (<code class="inline">*p</code>) уронит программу с паникой.</p>
            <p>Поэтому перед использованием указателя в Go принято проверять: <code class="inline">if p == nil { ... }</code>. Это обязательная гигиена безопасного кода.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Указатель <code class="inline">p</code> объявлен, но ни на что не указывает. Допиши условие так, чтобы программа напечатала <code class="inline">Пусто</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> p *<span style="color: #79c0ff;">int</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> <textarea id="user-code" rows="2" placeholder='p == nil' style="color: #79c0ff; font-weight: normal;"></textarea> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"Пусто"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tvar p *int\n\tif ${input} {\n\t\tfmt.Println("Пусто")\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "Пусто"
    },
    {
        id: 44,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 44: error как значение — возвращаем и проверяем",
        theory: `
            <h2>Урок 44: Ошибка — это обычное значение</h2>
            <p>В Go нет исключений в привычном виде. Функция, которая может упасть, возвращает специальным типом <code class="inline">error</code> последний результат: <code class="inline">(float64, error)</code>.</p>
            <p>Соглашение простое: если <code class="inline">err == nil</code> — всё хорошо и можно работать с результатом. Если <code class="inline">err != nil</code> — результат недействителен, ошибку надо обработать.</p>
            <p>Игнорировать ошибку через <code class="inline">_</code> можно только в учебных задачах — на бэкенде это прямой путь к багам.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">divide(10, 2)</code> отработала без ошибки. Выведи переменную <code class="inline">result</code> на экран — должно получиться <code class="inline">5</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"errors"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">divide</span>(a, b <span style="color: #79c0ff;">float64</span>) (<span style="color: #79c0ff;">float64</span>, <span style="color: #79c0ff;">error</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> b == <span style="color: #79c0ff;">0</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #79c0ff;">0</span>, errors.New(<span style="color: #a5d6ff;">"division by zero"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> a / b, <span style="color: #79c0ff;">nil</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;result, err := divide(<span style="color: #79c0ff;">10</span>, <span style="color: #79c0ff;">2</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> err != <span style="color: #79c0ff;">nil</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"Error:"</span>, err)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(result)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("division by zero")\n\t}\n\treturn a / b, nil\n}\n\nfunc main() {\n\tresult, err := divide(10, 2)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "5"
    },
    {
        id: 45,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 45: Создаём ошибки — errors.New и fmt.Errorf",
        theory: `
            <h2>Урок 45: Как создать свою ошибку</h2>
            <p>Чтобы вернуться из функции ошибкой, её сначала надо создать. Самый простой способ — <code class="inline">errors.New("текст")</code>, который возвращает значение типа <code class="inline">error</code>.</p>
            <p>Если в текст ошибки нужно подставить динамические данные, используют <code class="inline">fmt.Errorf("user %d not found", id)</code> — форматирование работает как в Print.</p>
            <p>Текст ошибки — это сообщение для логов: пиши его кратко, строчными буквами и без точки в конце (так принято в Go).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">findUser</code> не нашла пользователя с id 7. Верни ей новую ошибку с текстом <code class="inline">user not found</code> через <code class="inline">errors.New</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"errors"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">findUser</span>(id <span style="color: #79c0ff;">int</span>) (<span style="color: #79c0ff;">string</span>, <span style="color: #79c0ff;">error</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> id == <span style="color: #79c0ff;">1</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"Ann"</span>, <span style="color: #79c0ff;">nil</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">""</span>, <textarea id="user-code" rows="2" placeholder='errors.New("user not found")' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;_, err := findUser(<span style="color: #79c0ff;">7</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(err)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nfunc findUser(id int) (string, error) {\n\tif id == 1 {\n\t\treturn "Ann", nil\n\t}\n\treturn "", ${input}\n}\n\nfunc main() {\n\t_, err := findUser(7)\n\tfmt.Println(err)\n}`,
        validate: (stdout) => stdout.trim() === "user not found"
    },
    {
        id: 46,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 46: Обёртка ошибок — %w и errors.Is",
        theory: `
            <h2>Урок 46: Цепочки ошибок через %w</h2>
            <p>Когда один слой программы вызывает другой, ошибку снизу нужно не просто пробросить наверх, а <b>обогатить контекстом</b>: <code class="inline">fmt.Errorf("db: %w", err)</code>.</p>
            <p>Глагол <code class="inline">%w</code> оборачивает исходную ошибку в новую, сохраняя цепочку. Так в логах видно <i>где именно</i> случилась проблема: «db: not found».</p>
            <p>Но из-за обёртки сравнение <code class="inline">err == ErrNotFound</code> перестаёт работать! Для проверки внутри цепочки используют функцию <code class="inline">errors.Is(err, ErrNotFound)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">getUser</code> вернула обёрнутую ошибку. Допиши условие так, чтобы сработала проверка «является ли err ошибкой ErrNotFound в цепочке», и напечаталось <code class="inline">Handled: not found</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"errors"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">var</span> ErrNotFound = errors.New(<span style="color: #a5d6ff;">"not found"</span>)<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">getUser</span>() <span style="color: #79c0ff;">error</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> fmt.Errorf(<span style="color: #a5d6ff;">"db: %w"</span>, ErrNotFound)<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;err := getUser()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> <textarea id="user-code" rows="2" placeholder='errors.Is(err, ErrNotFound)' style="color: #79c0ff; font-weight: normal;"></textarea> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"Handled: not found"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nvar ErrNotFound = errors.New("not found")\n\nfunc getUser() error {\n\treturn fmt.Errorf("db: %w", ErrNotFound)\n}\n\nfunc main() {\n\terr := getUser()\n\tif ${input} {\n\t\tfmt.Println("Handled: not found")\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "Handled: not found"
    },
    {
        id: 47,
        moduleId: 6,
        moduleTitle: "Раздел 6: Указатели и обработка ошибок",
        title: "Урок 47: panic и recover — последняя линия обороны",
        theory: `
            <h2>Урок 47: panic / recover</h2>
            <p><code class="inline">panic</code> — это аварийная остановка: деление на ноль, nil-разыменование, выход за границы массива. Программа падает и печатает stack trace.</p>
            <p>Поймать панику можно только внутри <code class="inline">defer</code>-функции с помощью <code class="inline">recover()</code>. Если паники не было — <code class="inline">recover()</code> вернёт <code class="inline">nil</code>, если была — её причину.</p>
            <p>В обычном коде паникуй реже и проверяй <code class="inline">error</code>! Но на бэкенде recover спасает HTTP-сервер: упавший обработчик не должен ронять всё приложение.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция <code class="inline">safeDiv(10, 0)</code> вызывает панику при делении на ноль. Допиши проверку в defer так, чтобы при панике функция возвращала <code class="inline">-1</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">safeDiv</span>(a, b <span style="color: #79c0ff;">int</span>) (result <span style="color: #79c0ff;">int</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> <textarea id="user-code" rows="2" placeholder='recover()' style="color: #79c0ff; font-weight: normal;"></textarea> != <span style="color: #79c0ff;">nil</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = -<span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;result = a / b<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(safeDiv(<span style="color: #79c0ff;">10</span>, <span style="color: #79c0ff;">0</span>))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc safeDiv(a, b int) (result int) {\n\tdefer func() {\n\t\tif ${input} != nil {\n\t\t\tresult = -1\n\t\t}\n\t}()\n\tresult = a / b\n\treturn\n}\n\nfunc main() {\n\tfmt.Println(safeDiv(10, 0))\n}`,
        validate: (stdout) => stdout.trim() === "-1"
    }
];
