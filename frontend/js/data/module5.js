// js/data/module5.js
export const module5Lessons = [
    {
        id: 37,
        moduleId: 5,
        moduleTitle: "Раздел 5: Глубокое погружение в Слайсы, Мапы и Память",
        title: "Урок 37: Устройство слайса — Длина (len) и Емкость (cap)",
        theory: `
            <h2>Урок 37: Устройство слайса — len и cap</h2>
            <p>Добро пожаловать в PRO-уровень! Начнем с того, как Go работает с памятью.</p>
            <p>Слайс в Go — это не массив. Под капотом это маленькая структура (SliceHeader), которая содержит три поля:
            <ol>
                <li><b>Указатель</b> на реальный массив в памяти, где лежат данные.</li>
                <li><b>Длина (len)</b> — сколько элементов сейчас находится в слайсе.</li>
                <li><b>Емкость (cap)</b> — сколько всего элементов может поместиться в текущий нижележащий массив без выделения новой памяти.</li>
            </ol>
            </p>
            <p>Чтобы узнать емкость, используют встроенную функцию <code class="inline">cap()</code>.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Внутри функции <code class="inline">main()</code> создан слайс <code class="inline">nums := make([]int, 3, 7)</code> (длина 3, емкость 7).</p>
            <p>Выведи на экран его емкость с помощью функции <code class="inline">cap(nums)</code> через <code class="inline">fmt.Println</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;nums := make([]<span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>, <span style="color: #79c0ff;">7</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(cap(nums))' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tnums := make([]int, 3, 7)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "7"
    },
    {
        id: 38,
        moduleId: 5,
        moduleTitle: "Раздел 5: Глубокое погружение в Слайсы, Мапы и Память",
        title: "Урок 38: Как append выделяет память (Рост в 2 раза)",
        theory: `
            <h2>Урок 38: Как append выделяет память</h2>
            <p>Когда ты делаешь <code class="inline">append()</code> в слайс, у которого <code class="inline">len == cap</code> (свободного места в массиве больше нет), Go совершает тихую, но дорогую операцию:</p>
            <ol>
                <li>Выделяет в памяти <b>новый массив</b>, который ровно <b>в 2 раза больше</b> предыдущего (для небольших слайсов).</li>
                <li>Копирует туда все старые элементы.</li>
                <li>Добавляет новый элемент.</li>
                <li>Перенаправляет указатель слайса на этот новый массив.</li>
            </ol>
            <p>Если же лимит <code class="inline">cap</code> еще не превышен, Go просто дописывает элемент в существующий массив, что работает молниеносно.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Дан слайс <code class="inline">a := make([]int, 2, 2)</code>. Он полностью забит.</p>
            <p>Добавь в него число <code class="inline">5</code> через <code class="inline">a = append(a, 5)</code>, а затем выведи на экран его <b>новую емкость</b> через <code class="inline">fmt.Println(cap(a))</code>.</p>
            <p><i>Ты увидишь, как емкость прыгнет с 2 до 4!</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;a := make([]<span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">2</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="3" placeholder='a = append(a, 5)\nfmt.Println(cap(a))' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\ta := make([]int, 2, 2)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "4"
    },
    {
        id: 39,
        moduleId: 5,
        moduleTitle: "Раздел 5: Глубокое погружение в Слайсы, Мапы и Память",
        title: "Урок 39: Опасность общей памяти в слайсах",
        theory: `
            <h2>Урок 39: Опасность общей памяти</h2>
            <p>Если ты создаешь новый слайс путем срезания старого (например, <code class="inline">sub := mainSlice[0:2]</code>), они оба <b>ссылаются на один и тот же базовый массив</b> в памяти!</p>
            <p>Это значит, что изменяя элемент в <code class="inline">sub</code>, ты автоматически мутируешь данные в <code class="inline">mainSlice</code>. Это одна из главных причин скрытых багов у новичков в Go.</p>
            <p>Поведение изменится только тогда, когда один из слайсов перерастет свою емкость через <code class="inline">append</code> и улетит на другой адрес в памяти.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В коде объявлен массив-источник <code class="inline">base := []int{10, 20, 30}</code> и от него отрезан кусок <code class="inline">sub := base[0:2]</code>.</p>
            <p>Измени первый элемент в <code class="inline">sub</code> (индекс 0), присвоив ему значение <code class="inline">99</code>. Ничего выводить не нужно, система проверит состояние исходного массива!</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;base := []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">10</span>, <span style="color: #79c0ff;">20</span>, <span style="color: #79c0ff;">30</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;sub := base[<span style="color: #79c0ff;">0</span>:<span style="color: #79c0ff;">2</span>]<br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='sub[0] = 99' style="color: #79c0ff; font-weight: normal;"></textarea><br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(base[0])<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tbase := []int{10, 20, 30}\n\tsub := base[0:2]\n\t${input}\n\tfmt.Println(base[0])\n}`,
        validate: (stdout) => stdout.trim() === "99"
    },
    {
        id: 40,
        moduleId: 5,
        moduleTitle: "Раздел 5: Глубокое погружение в Слайсы, Мапы и Память",
        title: "Урок 40: Стек отложенных вызовов Defer (LIFO)",
        theory: `
            <h2>Урок 40: Стек defer — Задом наперед</h2>
            <p>Вы уже знаете, как работает одиночный оператор <code class="inline">defer</code>. Но что будет, если в одной функции вызвать несколько <code class="inline">defer</code> подряд?</p>
            <p>Go складывает все отложенные функции в специальный стек, работающий по принципу <b>LIFO (Last In, First Out)</b> — «последним пришел, первым ушел».</p>
            <p>Это значит, что отложенные вызовы выполняются в строго <b>обратном порядке</b> их объявления.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши три отложенные команды так, чтобы на выходе получить строку <code class="inline">CBA</code>.</p>
            <p>Используй три последовательные строчки с <code class="inline">defer fmt.Print("...")</code> для букв A, B и C.</p>
            <p><i>Подсказка: чтобы С напечаталась первой, её defer нужно объявить последним!</i></p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="4" placeholder='defer fmt.Print("A")\ndefer fmt.Print("B")\ndefer fmt.Print("C")' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "CBA"
    }
];