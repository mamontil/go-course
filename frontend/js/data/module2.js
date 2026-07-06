// js/data/module2.js
export const module2Lessons = [
    {
        id: 8,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 8: Условный оператор if",
        theory: `
            <h2>Урок 8: Условный оператор if</h2>
            <p>Условный оператор <code class="inline">if</code> (если) позволяет выполнять блок кода только в том случае, если условие истинно (<code class="inline">true</code>).</p>
            <p>В отличие от других языков (JS, PHP, C++), в Go условия <b>не нужно</b> брать в круглые скобки. Но фигурные скобки <code class="inline">{}</code> для тела условия обязательны всегда!</p>
            <p>Пример:<br>
            <pre><code class="block">if age >= 18 {
    fmt.Println("Доступ разрешен")
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде дана переменная <code class="inline">score := 85</code>. Напиши условие <code class="inline">if</code>: если значение переменной <code class="inline">score</code> больше или равно <code class="inline">80</code>, выведи в консоль фразу: <code class="inline">Тест пройден!</code></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;score := <span style="color: #79c0ff;">85</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder="if score >= 80 {\n    fmt.Println(&quot;Тест пройден!&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tscore := 85\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Тест пройден!"
    },
    {
        id: 9,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 9: Конструкция else (иначе)",
        theory: `
            <h2>Урок 9: Конструкция else (иначе)</h2>
            <p>Если условие в <code class="inline">if</code> не выполнилось (вернуло <code class="inline">false</code>), мы можем запустить альтернативный код с помощью блока <code class="inline">else</code>.</p>
            <p><b>Критически важное правило Go:</b> закрывающая фигурная скобка блока <code class="inline">if</code> и ключевое слово <code class="inline">else</code> ДОЛЖНЫ быть на одной строке! Написание <code class="inline">else</code> с новой строки вызовет ошибку компиляции.</p>
            <p>Правильно:<br>
            <pre><code class="block">if x > 0 {
    // код
} else {
    // код
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дана переменная <code class="inline">money := 50</code> (стоимость билета — 100).</p>
            <p>Напиши конструкцию <code class="inline">if / else</code>. Если <code class="inline">money >= 100</code>, выводи <code class="inline">"Buy"</code>, иначе выводи <code class="inline">"No money"</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;money := <span style="color: #79c0ff;">50</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="5" placeholder="if money >= 100 {\n    fmt.Println(&quot;Buy&quot;)\n} else {\n    fmt.Println(&quot;No money&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tmoney := 50\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "No money"
    },
    {
        id: 10,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 10: Множественные условия else if",
        theory: `
            <h2>Урок 10: Множественные условия else if</h2>
            <p>Когда вариантов исхода больше двух, используется цепочка <code class="inline">else if</code>. Программа проверяет их сверху вниз до первого совпадения.</p>
            <p>Как и в случае с <code class="inline">else</code>, блоки <code class="inline">else if</code> должны цепляться на той же строке, где закрывается предыдущая скобка: <code class="inline">} else if условие {</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В системе умного дома есть переменная <code class="inline">temp := 15</code>.</p>
            <p>Напиши проверку:<br>
            1. Если <code class="inline">temp < 10</code>, выведи <code class="inline">Cold</code><br>
            2. Иначе если <code class="inline">temp < 25</code>, выведи <code class="inline">Comfort</code><br>
            3. В любых других случаях выведи <code class="inline">Hot</code></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;temp := <span style="color: #79c0ff;">15</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="7" placeholder="if temp < 10 {\n    fmt.Println(&quot;Cold&quot;)\n} else if temp < 25 {\n    fmt.Println(&quot;Comfort&quot;)\n} else {\n    fmt.Println(&quot;Hot&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\ttemp := 15\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Comfort"
    }// === КОНЕЦ УРОКА 10 ===
    ,
    {
        id: 11,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 11: Логическое И (&&)",
        theory: `
            <h2>Урок 11: Логическое И (&&)</h2>
            <p>Когда нужно, чтобы выполнились <b>одновременно два или более условий</b>, используется оператор логического И — <code class="inline">&&</code>.</p>
            <p>Блок кода внутри <code class="inline">if</code> сработает только тогда, когда и левое, и правое условия вернут истину (<code class="inline">true</code>).</p>
            <p>Пример:<br>
            <pre><code class="block">if age >= 18 && hasTicket == true {
    fmt.Println("Проход открыт")
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде заданы две переменные: статус авторизации <code class="inline">isLoggedIn := true</code> и роль пользователя <code class="inline">isAdmin := true</code>.</p>
            <p>Напиши условие: если пользователь залогинен <b>И</b> является админом, выведи в консоль фразу: <code class="inline">Доступ в админку разрешен</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;isLoggedIn := <span style="color: #ff7b72;">true</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;isAdmin := <span style="color: #ff7b72;">true</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder="if isLoggedIn && isAdmin {\n    fmt.Println(&quot;Доступ в админку разрешен&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tisLoggedIn := true\n\tisAdmin := true\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Доступ в админку разрешен"
    },
    {
        id: 12,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 12: Логическое ИЛИ (||)",
        theory: `
            <h2>Урок 12: Логическое ИЛИ (||)</h2>
            <p>Оператор логического ИЛИ — <code class="inline">||</code> (две вертикальные черты) требует, чтобы выполнилось **хотя бы одно** из указанных условий.</p>
            <p>Если хотя бы одна часть выражения равна <code class="inline">true</code>, то и всё условие считается истинным.</p>
            <p>Пример:<br>
            <pre><code class="block">if day == "Суббота" || day == "Воскресенье" {
    fmt.Println("Выходной!")
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Даны две переменные: <code class="inline">hasCard := false</code> (есть скидочная карта) и <code class="inline">isWithChild := true</code> (посетитель с ребенком).</p>
            <p>Владелец кафе предоставляет скидку, если у клиента есть карта **ИЛИ** если он пришел с ребенком. Напиши условие: если хотя бы одно правило соблюдено, выведи в консоль фразу: <code class="inline">Скидка предоставлена</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;hasCard := <span style="color: #ff7b72;">false</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;isWithChild := <span style="color: #ff7b72;">true</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder="if hasCard || isWithChild {\n    fmt.Println(&quot;Скидка предоставлена&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\thasCard := false\n\tisWithChild := true\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Скидка предоставлена"
    },
    {
        id: 13,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 13: Конструкция switch/case",
        theory: `
            <h2>Урок 13: Конструкция switch/case</h2>
            <p>Когда у вас есть одна переменная и много вариантов того, чему она может быть равна, длинная цепочка из <code class="inline">if-else-if</code> выглядит громоздко. Вместо нее используют красивую конструкцию <code class="inline">switch</code>.</p>
            <p>В Go оператор <code class="inline">switch</code> устроен удобнее, чем в JS или PHP: здесь **не нужно писать команду break** в конце каждого блока <code class="inline">case</code>. Go автоматически выполняет только один совпавший блок и выходит из конструкции.</p>
            <p>Пример:<br>
            <pre><code class="block">switch day {
case 1:
    fmt.Println("Понедельник")
case 2:
    fmt.Println("Вторник")
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дана переменная <code class="inline">group := "B"</code>. Напиши конструкцию <code class="inline">switch</code> для переменной <code class="inline">group</code>.</p>
            <p>Если она равна <code class="inline">"A"</code>, выведи <code class="inline">Group A</code>. Если она равна <code class="inline">"B"</code>, выведи в консоль строку <code class="inline">Group B</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;group := <span style="color: #a5d6ff;">"B"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="6" placeholder="switch group {\ncase &quot;A&quot;:\n    fmt.Println(&quot;Group A&quot;)\ncase &quot;B&quot;:\n    fmt.Println(&quot;Group B&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tgroup := "B"\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Group B"
    }// === КОНЕЦ УРОКА 13 ===
    ,
    {
        id: 14,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 14: Значение по умолчанию в switch (default)",
        theory: `
            <h2>Урок 14: Значение по умолчанию в switch (default)</h2>
            <p>Что делать, если ни один из блоков <code class="inline">case</code> в конструкции <code class="inline">switch</code> не подошел? Для этого существует блок <code class="inline">default</code> (по умолчанию).</p>
            <p>Код внутри <code class="inline">default</code> сработает только в том случае, если ни одно из условий выше не совпало со значением проверяемой переменной. Обычно его ставят в самый конец конструкции.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дана переменная со статусом заказа <code class="inline">status := "canceled"</code>.</p>
            <p>Напиши конструкцию <code class="inline">switch status</code>:<br>
            1. Для <code class="inline">"loading"</code> выведи <code class="inline">Ждите</code><br>
            2. Во всех остальных случаях (<code class="inline">default</code>) выведи в консоль фразу: <code class="inline">Неизвестный статус</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;status := <span style="color: #a5d6ff;">"canceled"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="6" placeholder="switch status {\ncase &quot;loading&quot;:\n    fmt.Println(&quot;Ждите&quot;)\ndefault:\n    fmt.Println(&quot;Неизвестный статус&quot;)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tstatus := "canceled"\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Неизвестный статус"
    },
    {
        id: 15,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 15: Знакомство с циклом for",
        theory: `
            <h2>Урок 15: Знакомство с циклом for</h2>
            <p>В языке Go есть огромный плюс для новичков: в нем есть <b>только один</b> цикл — это цикл <code class="inline">for</code>. Никаких <code class="inline">while</code> или <code class="inline">do-while</code> здесь не существует!</p>
            <p>Классический цикл <code class="inline">for</code> состоит из трех частей, разделенных точкой с запятой:</p>
            <ol>
                <li><b>Инициализатор:</b> создание счетчика (<code class="inline">i := 0</code>).</li>
                <li><b>Условие:</b> пока оно верно, цикл работает (<code class="inline">i < 3</code>).</li>
                <li><b>Шаг (пост-выражение):</b> изменение счетчика после каждого круга (<code class="inline">i++</code> увеличивает на 1).</li>
            </ol>
            <p>Пример:<br>
            <pre><code class="block">for i := 0; i < 3; i++ {
    fmt.Println(i)
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши цикл <code class="inline">for</code>, который напечатает в консоль числа от <b>1 до 4</b> включительно. Каждое число должно быть с новой строки (используй <code class="inline">fmt.Println</code>).</p>
            <p><i>Подсказка: начни счетчик с 1 и делай проверку до тех пор, пока он меньше или равен 4 (<code class="inline">i <= 4</code>).</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder="for i := 1; i <= 4; i++ {\n    fmt.Println(i)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "1234"
    },
    {
        id: 16,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 16: Цикл for как замена while",
        theory: `
            <h2>Урок 16: Цикл for как замена while</h2>
            <p>Если в цикле <code class="inline">for</code> убрать инициализатор счетчика и шаг, оставив <b>только условие</b>, он превращается в классический цикл <code class="inline">while</code> из других языков.</p>
            <p>Такой цикл работает до тех пор, пока условие истинно. Главное — не забывать менять переменную внутри самого цикла, иначе он станет бесконечным и программа зависнет!</p>
            <p>Пример:<br>
            <pre><code class="block">for x < 10 {
    x++
}</code></pre></p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде уже создана переменная <code class="inline">energy := 3</code>.</p>
            <p>Напиши цикл <code class="inline">for</code>, который работает, пока <code class="inline">energy > 0</code>. Внутри цикла сначала выводи значение энергии через <code class="inline">fmt.Println(energy)</code>, а затем уменьшай ее на единицу с помощью команды <code class="inline">energy--</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;energy := <span style="color: #79c0ff;">3</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="5" placeholder="for energy > 0 {\n    fmt.Println(energy)\n    energy--\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tenergy := 3\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "321"
    },
    {
        id: 17,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 17: Прерывание цикла (break)",
        theory: `
            <h2>Урок 17: Прерывание цикла (break)</h2>
            <p>Иногда нужно досрочно выйти из цикла, не дожидаясь, пока его условие завершится. Для этого используется команда <code class="inline">break</code>.</p>
            <p>Как только программа натыкается на <code class="inline">break</code>, выполнение цикла мгновенно останавливается, и Go переходит к коду, который идет сразу после цикла.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши цикл, который считает <code class="inline">i</code> от 1 до 10 (<code class="inline">i++</code>). Внутри цикла проверяй условие: если <code class="inline">i == 3</code>, то досрочно прерывай цикл с помощью <code class="inline">break</code>.</p>
            <p>Перед проверкой или после неё выводи числа на экран. Давай договоримся: выводи <code class="inline">i</code> через <code class="inline">fmt.Println(i)</code> в самом начале тела цикла, чтобы в консоль успели напечататься числа <code class="inline">1</code>, <code class="inline">2</code>, <code class="inline">3</code> перед тем, как сработает выход.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="6" placeholder="for i := 1; i <= 10; i++ {\n    fmt.Println(i)\n    if i == 3 {\n        break\n    }\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "123"
    }// === КОНЕЦ УРОКА 17 ===
    ,
    {
        id: 18,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 18: Пропуск итерации (continue)",
        theory: `
            <h2>Урок 18: Пропуск итерации (continue)</h2>
            <p>В отличие от команды <code class="inline">break</code>, которая полностью ломает и останавливает цикл, команда <code class="inline">continue</code> просто завершает <b>текущий круг (итерацию)</b> и сразу перепрыгивает на начало следующего.</p>
            <p>Это полезно, когда при определенном условии нужно пропустить обработку элемента и побежать дальше по циклу.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши цикл <code class="inline">for</code>, где переменная <code class="inline">i</code> меняется от 1 до 4 включительно (<code class="inline">i++</code>).</p>
            <p>Внутри цикла добавь проверку: если <code class="inline">i == 2</code>, то выполни команду <code class="inline">continue</code>.</p>
            <p>В самом конце тела цикла (после условия с continue) выводи число на экран через <code class="inline">fmt.Println(i)</code>. В итоге число 2 должно быть пропущено, а в консоли появятся только <code class="inline">1</code>, <code class="inline">3</code>, <code class="inline">4</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="6" placeholder="for i := 1; i <= 4; i++ {\n    if i == 2 {\n        continue\n    }\n    fmt.Println(i)\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "134"
    },
    {
        id: 19,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 19: Бесконечный цикл",
        theory: `
            <h2>Урок 19: Бесконечный цикл</h2>
            <p>Если написать ключевое слово <code class="inline">for</code> вообще без условий, счетчиков и шагов, мы получим чистый бесконечный цикл. Он будет крутиться вечно, пока внутри него не сработает команда <code class="inline">break</code> или программа не завершится.</p>
            <p>В Go такая конструкция пишется очень лаконично:</p>
            <pre><code class="block">for {
    // крутимся вечно
}</code></pre>
            <p>Это стандартная практика для бэкенда: например, так работают веб-серверы, постоянно ожидая новых пользователей.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создана переменная-счетчик <code class="inline">clicks := 0</code>.</p>
            <p>Напиши бесконечный цикл <code class="inline">for { ... }</code>. Внутри него увеличивай <code class="inline">clicks++</code>. Сразу после этого проверяй условие: как только <code class="inline">clicks == 5</code>, прерывай цикл с помощью <code class="inline">break</code>.</p>
            <p>После выхода из цикла (за его пределами!) выведи итоговое значение в консоль через <code class="inline">fmt.Println(clicks)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;clicks := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="7" placeholder="for {\n    clicks++\n    if clicks == 5 {\n        break\n    }\n}\nfmt.Println(clicks)" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tclicks := 0\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "5"
    },
    {
        id: 20,
        moduleId: 2,
        moduleTitle: "Раздел 2: Управление ходом программы",
        title: "Урок 20: 🏁 Финиш раздела — Фильтрация чисел",
        theory: `
            <h2>Урок 20: 🏁 Финиш раздела — Фильтрация чисел</h2>
            <p>Поздравляем! Ты полностью освоил управление ходом программы в Go. Давай закрепим всё, что мы выучили (циклы, условия, остаток от деления), в одной боевой задаче.</p>
            <p>В программировании часто нужно отфильтровать поток данных. Например, выбрать только четные id пользователей или четные транзакции.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Финальное задание раздела:</h3>
            <p>Напиши цикл <code class="inline">for</code>, который перебирает числа от <b>1 до 6 включительно</b>.</p>
            <p>Внутри цикла проверяй каждое число: выводи его через <code class="inline">fmt.Println</code> <b>только в том случае, если оно четное</b> (делится на 2 без остатка, то есть <code class="inline">i % 2 == 0</code>).</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="5" placeholder="for i := 1; i <= 6; i++ {\n    if i % 2 == 0 {\n        fmt.Println(i)\n    }\n}" style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "246"
    }
];