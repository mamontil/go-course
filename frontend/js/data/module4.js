// js/data/module4.js
export const module4Lessons = [
    {
        id: 30,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 30: Структуры (struct)",
        theory: `
            <h2>Урок 30: Структуры (struct)</h2>
            <p>В Go нет привычных классов и наследования. Вместо них для создания собственных сложных типов данных используются <b>Структуры (struct)</b>.</p>
            <p>Структура объединяет под одним именем несколько полей разных типов. Это идеальный способ описать реальный объект (например, пользователя, товар или задачу).</p>
            <p>Пример объявления:<br>
            <pre><code class="block">type User struct {
    Name string
    Age  int
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде ниже (снаружи функции main) уже объявлена структура <code class="inline">type Task struct { Title string; IsDone bool }</code>.</p>
            <p>Внутри функции <code class="inline">main()</code> создай переменную с именем <code class="inline">t</code> типа <code class="inline">Task</code>, заполнив её поля значениями: Title: <code class="inline">"Clean"</code>, IsDone: <code class="inline">true</code>.</p>
            <p>После этого выведи её на экран через <code class="inline">fmt.Println(t)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Task <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Title <span style="color: #a5d6ff;">string</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;IsDone <span style="color: #79c0ff;">bool</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='t := Task{Title: "Clean", IsDone: true}\nfmt.Println(t)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Task struct {\n\tTitle  string\n\tIsDone bool\n}\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "{Clean true}"
    },
    {
        id: 31,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 31: Методы структур",
        theory: `
            <h2>Урок 31: Методы структур</h2>
            <p>Хоть в Go и нет классов, мы можем «привязывать» функции к конкретным структурам. Такие функции называются <b>методами</b>.</p>
            <p>Привязка происходит с помощью специального аргумента перед именем функции — <b>получателя (receiver)</b>.</p>
            <p>Пример:<br>
            <pre><code class="block">func (u User) SayHello() {
    fmt.Println("Привет, " + u.Name)
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дана структура <code class="inline">Item</code> с полем <code class="inline">Price int</code>. Допиши для неё метод <code class="inline">ShowPrice()</code>, который ничего не принимает, но выводит цену товара на экран через <code class="inline">fmt.Println</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Item <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Price <span style="color: #79c0ff;">int</span><br>
            }<br><br>
            <textarea id="user-code" rows="3" placeholder="func (i Item) ShowPrice() {\n    fmt.Println(i.Price)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;product := Item{Price: <span style="color: #79c0ff;">500</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;product.ShowPrice()<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Item struct {\n\tPrice int\n}\n\n${input}\n\nfunc main() {\n\tproduct := Item{Price: 500}\n\tproduct.ShowPrice()\n}`,
        validate: (stdout) => stdout.trim() === "500"
    },
    {
        id: 32,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 32: Указатели (Pointers) — основы",
        theory: `
            <h2>Урок 32: Указатели (Pointers) — основы</h2>
            <p>Обычная переменная хранит само значение (например, число <code class="inline">42</code>). А <b>указатель</b> хранит <i>адрес в оперативной памяти</i>, где это значение лежит.</p>
            <p>Чтобы получить адрес переменной, перед ней ставят знак амперсанда <code class="inline">&</code>. Чтобы объявить тип-указатель, перед типом ставят звездочку <code class="inline">*</code>.</p>
            <p>Пример:<br>
            <code class="inline">x := 10</code><br>
            <code class="inline">p := &x</code> (теперь в <code class="inline">p</code> лежит адрес ячейки памяти)</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В функции объявлена переменная <code class="inline">val := 777</code>.</p>
            <p>Создай переменную-указатель с именем <code class="inline">ptr</code>, которая указывает на адрес переменной <code class="inline">val</code>. Выведи <code class="inline">ptr</code> на экран через <code class="inline">fmt.Println(ptr)</code>.</p>
            <p><i>Обрати внимание: вывод на экран покажет шестнадцатеричный адрес памяти (например, 0xc0000a6058), наш валидатор проверит, что адрес передан успешно.</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;val := <span style="color: #79c0ff;">777</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='ptr := &val\nfmt.Println(ptr)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tval := 777\n\t${input}\n}`,
        validate: (stdout) => stdout.trim().startsWith("0x")
    },
    {
        id: 33,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 33: Изменение структуры через указатель в методе",
        theory: `
            <h2>Урок 33: Изменение структуры через указатель в методе</h2>
            <p>Если метод структуры принимает обычное значение <code class="inline">func (u User)</code>, Go делает полную <i>копию</i> объекта. Изменения внутри метода не затронут оригинальный объект!</p>
            <p>Чтобы метод мог <b>мутировать (изменять)</b> данные исходной структуры, получатель (receiver) должен быть указателем: <code class="inline">func (u *User)</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дана структура <code class="inline">Counter</code> со значением <code class="inline">Value int</code>.</p>
            <p>Напиши метод <code class="inline">func (c *Counter) Inc()</code>, который увеличивает поле <code class="inline">Value</code> на единицу (<code class="inline">c.Value++</code>).</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Counter <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Value <span style="color: #79c0ff;">int</span><br>
            }<br><br>
            <textarea id="user-code" rows="3" placeholder="func (c *Counter) Inc() {\n    c.Value++\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cnt := Counter{Value: <span style="color: #79c0ff;">10</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cnt.Inc()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(cnt.Value)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Counter struct {\n\tValue int\n}\n\n${input}\n\nfunc main() {\n\tcnt := Counter{Value: 10}\n\tcnt.Inc()\n\tfmt.Println(cnt.Value)\n}`,
        validate: (stdout) => stdout.trim() === "11"
    },
    {
        id: 34,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 34: Интерфейсы (Interfaces)",
        theory: `
            <h2>Урок 34: Интерфейсы (Interfaces)</h2>
            <p><b>Интерфейс</b> — это контракт, который определяет набор методов, но не содержит их реализации. Интерфейсы позволяют писать гибкий полиморфный код.</p>
            <p>В Go контракт соблюдается <b>неявно</b>: если у структуры есть все методы, описанные в интерфейсе, она автоматически считается реализующей этот интерфейс (никаких ключевых слов <code class="inline">implements</code> не нужно!).</p>
            <p>Пример объявления интерфейса:<br>
            <pre><code class="block">type Speaker interface {
    Speak() string
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создай интерфейс с именем <code class="inline">Greeter</code>, который содержит ровно один метод: <code class="inline">Greet() string</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <textarea id="user-code" rows="3" placeholder="type Greeter interface {\n    Greet() string\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            <span style="color: #ff7b72;">type</span> Robot <span style="color: #ff7b72;">struct</span>{}<br>
            <span style="color: #ff7b72;">func</span> (r Robot) Greet() <span style="color: #a5d6ff;">string</span> { <span style="color: #ff7b72;">return</span> <span style="color: #a5d6ff;">"Hi"</span> }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> g Greeter = Robot{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(g.Greet())<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\n${input}\n\ntype Robot struct{}\nfunc (r Robot) Greet() string { return "Hi" }\n\nfunc main() {\n\tvar g Greeter = Robot{}\n\tfmt.Println(g.Greet())\n}`,
        validate: (stdout) => stdout.trim() === "Hi"
    },
    {
        id: 35,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 35: Обработка ошибок (error)",
        theory: `
            <h2>Урок 35: Обработка ошибок (error)</h2>
            <p>В Go нет классических исключений типа <code class="inline">try/catch</code>. Ошибки здесь — это обычные возвращаемые значения встроенного типа <code class="inline">error</code>.</p>
            <p>Если функция может завершиться неудачно, тип <code class="inline">error</code> возвращают самым последним аргументом. Если всё прошло успешно, возвращают <code class="inline">nil</code> (пустоту).</p>
            <p>Создать новую текстовую ошибку можно с помощью функции <code class="inline">errors.New()</code> из стандартного одноименного пакета.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Допиши функцию <code class="inline">checkAge</code>. Она принимает возраст <code class="inline">age int</code>.</p>
            <p>Если <code class="inline">age < 18</code>, она должна вернуть ошибку с текстом <code class="inline">"too young"</code> через <code class="inline">errors.New("too young")</code>.</p>
            <p>Иначе она должна вернуть пустоту (<code class="inline">nil</code>).</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"errors"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">checkAge</span>(age <span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">error</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="5" placeholder='if age < 18 {\n    return errors.New("too young")\n}\nreturn nil' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;err := checkAge(<span style="color: #79c0ff;">15</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;if err != <span style="color: #ff7b72;">nil</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(err.Error())<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nfunc checkAge(age int) error {\n\t${input}\n}\n\nfunc main() {\n\terr := checkAge(15)\n\tif err != nil {\n\t\tfmt.Println(err.Error())\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "too young"
    },
    {
        id: 36,
        moduleId: 4,
        moduleTitle: "Раздел 4: Продвинутый Go и ООП-подобный стиль",
        title: "Урок 36: 🏁 Отложенный вызов (defer)",
        theory: `
            <h2>Урок 36: 🏁 Отложенный вызов (defer)</h2>
            <p>Поздравляем! Это финальный урок базового трека! Нам осталось разобрать очень удобный оператор — <code class="inline">defer</code>.</p>
            <p>Инструкция <code class="inline">defer</code> откладывает выполнение указанной функции до того момента, пока текущая функция (в данном случае <code class="inline">main</code>) не завершит работу.</p>
            <p>Это незаменимо на бэкенде для гарантированного освобождения ресурсов: закрытия файлов, сетевых соединений или баз данных, независимо от того, произошли ошибки в коде или нет.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Поставь команду <code class="inline">fmt.Println("Close")</code> под запуск через <code class="inline">defer</code> в самом начале функции <code class="inline">main</code>.</p>
            <p>Затем ниже напиши обычную команду <code class="inline">fmt.Println("Work")</code>.</p>
            <p><i>В консоли сначала напечатается "Work", и только перед самым выходом выполнится отложенный "Close". Программа должна выдать: <code class="inline">Work</code>, а с новой строки <code class="inline">Close</code>.</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='defer fmt.Println("Close")\nfmt.Println("Work")' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "WorkClose",
        isLast: true
    }
];