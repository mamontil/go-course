// js/data/module11.js
export const module11Lessons = [
    {
        id: 79,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 79: cmp.Ordered — ограничение «можно сравнивать»",
        theory: `
            <h2>Урок 79: Ограничения дженериков</h2>
            <p><code class="inline">[T any]</code> разрешает вообще любой тип — но внутри функции с таким T нельзя даже сравнить значения: компилятор не знает, что они упорядочены.</p>
            <p>Для «сравниваемых» типов есть готовое ограничение <code class="inline">cmp.Ordered</code> (пакет <code class="inline">cmp</code>): все числа, строки и руны. Функция с ним примет int и string, но не struct — и ошибка будет на этапе компиляции, а не в рантайме.</p>
            <p>Одно ограничение — десятки применений: max, min, сортировка, поиск, бинарное дерево — всё пишется один раз.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция Max уже написана, но тип T ничем не ограничен и оператор сравнения не скомпилируется. Подставь правильное ограничение — ответ: <code class="inline">7 2.5</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"cmp"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">Max</span>[T <textarea id="user-code" rows="2" placeholder='cmp.Ordered' style="color: #79c0ff; font-weight: normal;"></textarea>](a, b T) T {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">if</span> a &gt; b {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> a<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> b<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(Max(<span style="color: #79c0ff;">3</span>, <span style="color: #79c0ff;">7</span>), Max(<span style="color: #79c0ff;">2.5</span>, <span style="color: #79c0ff;">1.5</span>))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"cmp"\n\t"fmt"\n)\n\nfunc Max[T ${input}](a, b T) T {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n\nfunc main() {\n\tfmt.Println(Max(3, 7), Max(2.5, 1.5))\n}`,
        validate: (stdout) => stdout.trim() === "7 2.5"
    },
    {
        id: 80,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 80: Дженерик-функция с двумя параметрами типа",
        theory: `
            <h2>Урок 80: Map как в JS, но типобезопасный</h2>
            <p>Функция может принимать несколько параметров типа: <code class="inline">Map[T, U any]</code>. Здесь T — тип входного слайса, U — тип результата преобразования. Компилятор выводит оба автоматически из аргументов.</p>
            <pre><code class="block">func Map[T, U any](s []T, f func(T) U) []U {
    res := make([]U, len(s))
    for i, v := range s {
        res[i] = f(v)
    }
    return res
}</code></pre>
            <p>Заметь detail: результат создаётся через <code class="inline">make([]U, len)</code> — так мы не делаем append-аллокаций, размер известен заранее. Писать <code class="inline">var res []U</code> и растить append-ом — лишний реаллок (урок 38 помнишь?).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Map уже превратил [1 2 3] в квадраты. Выведи слайс <code class="inline">squares</code> через Println — ответ: <code class="inline">[1 4 9]</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">Map</span>[T, U <span style="color: #79c0ff;">any</span>](s []T, f func(T) U) []U {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;res := <span style="color: #ff7b72;">make</span>([]U, <span style="color: #ff7b72;">len</span>(s))<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i, v := <span style="color: #ff7b72;">range</span> s {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res[i] = f(v)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> res<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;nums := []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">1</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;squares := Map(nums, func(n <span style="color: #79c0ff;">int</span>) <span style="color: #79c0ff;">int</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> n * n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;})<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<textarea id="user-code" rows="2" placeholder='squares' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc Map[T, U any](s []T, f func(T) U) []U {\n\tres := make([]U, len(s))\n\tfor i, v := range s {\n\t\tres[i] = f(v)\n\t}\n\treturn res\n}\n\nfunc main() {\n\tnums := []int{1, 2, 3}\n\tsquares := Map(nums, func(n int) int {\n\t\treturn n * n\n\t})\n\tfmt.Println(${input})\n}`,
        validate: (stdout) => stdout.trim() === "[1 4 9]"
    },
    {
        id: 81,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 81: fmt.Stringer — как печатать твой тип красиво",
        theory: `
            <h2>Урок 81: Интерфейс fmt.Stringer</h2>
            <p>Пакет fmt знает секрет: если значение реализует метод <code class="inline">String() string</code> — Println будет печатать то, что вернёт он. Этот контракт называется интерфейсом <code class="inline">fmt.Stringer</code>.</p>
            <p>Реализовать его тривиально — просто добавь метод с нужной сигнатурой. fmt сам «почует» его через type assertion (урок 56!).</p>
            <p>Так делают все библиотеки: time.Time, net.IP, errors-обёртки — всё кастомизирует вывод через String().</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Реализуй метод String() для User: верни строку через fmt.Sprintf с форматом <code class="inline">"%s (%d лет)"</code>, аргументы — u.Name и u.Age. Вывод программы: <code class="inline">Ann (25 лет)</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> User <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Name <span style="color: #79c0ff;">string</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp; <span style="color: #79c0ff;">int</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> (u User) <span style="color: #d2a8ff;">String</span>() <span style="color: #79c0ff;">string</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='return fmt.Sprintf("%s (%d лет)", u.Name, u.Age)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;u := User{<span style="color: #a5d6ff;">"Ann"</span>, <span style="color: #79c0ff;">25</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(u)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype User struct {\n\tName string\n\tAge  int\n}\n\nfunc (u User) String() string {\n\t${input}\n}\n\nfunc main() {\n\tu := User{"Ann", 25}\n\tfmt.Println(u)\n}`,
        validate: (stdout) => stdout.trim() === "Ann (25 лет)"
    },
    {
        id: 82,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 82: io.Reader — самый важный интерфейс Go",
        theory: `
            <h2>Урок 82: io.Reader — абстракция «откуда-то читаем»</h2>
            <p>Один метод <code class="inline">Read(p []byte) (int, error)</code> описывает ВСЁ, откуда можно читать: файл, сокет, HTTP-тело запроса, строку, сжатый поток. Реализовал Read — и ты уже совместим с тысячой функций stdlib.</p>
            <p>Например, <code class="inline">io.ReadAll(r)</code> принимает <code class="inline">io.Reader</code>, а <code class="inline">strings.NewReader</code> его возвращает. Файл (os.File) и сетевое соединение тоже Reader-ы — все взаимозаменяемы.</p>
            <p>Это и есть прелесть интерфейсов: функции пишутся против контракта, а не против конкретной структуры. Так же устроен и io.Writer (урок 64).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Reader <code class="inline">r</code> создан из строки. Передай его в io.ReadAll — на экране окажется <code class="inline">Привет, Go!</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"io"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"strings"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;r := strings.NewReader(<span style="color: #a5d6ff;">"Привет, Go!"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;data, _ := io.ReadAll(<textarea id="user-code" rows="2" placeholder='r' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(string(data))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"io"\n\t"strings"\n\t"fmt"\n)\n\nfunc main() {\n\tr := strings.NewReader("Привет, Go!")\n\tdata, _ := io.ReadAll(${input})\n\tfmt.Println(string(data))\n}`,
        validate: (stdout) => stdout.trim() === "Привет, Go!"
    },
    {
        id: 83,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 83: Композиция — встраивание вместо наследования",
        theory: `
            <h2>Урок 83: Embedding</h2>
            <p>В Go нет наследования, но есть <b>композиция</b>: в struct встраивается другой struct — и все его методы «поднимаются» наружу автоматически.</p>
            <pre><code class="block">type Server struct {
    Logger // просто имя типа — это embedding
}</code></pre>
            <p>У Server нет своего метода Log, но <code class="inline">s.Log(...)</code> работает — вызов проксируется во встроенный Logger. Хочешь перекрыть — обьяви свой метод с тем же именем.</p>
            <p>Так склеивают поведение: кэши + логгеры + метрики в одном типе без единой строчки boilerplate. В реальных проектах так устроена почти каждая обёртка.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Server пока пустой и <code class="inline">s.Log</code> не компилируется. Встрой Logger в struct Server — вывод: <code class="inline">LOG: server started</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Logger <span style="color: #ff7b72;">struct</span>{}<br><br>
            <span style="color: #ff7b72;">func</span> (Logger) <span style="color: #d2a8ff;">Log</span>(msg <span style="color: #79c0ff;">string</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"LOG:"</span>, msg)<br>
            }<br><br>
            <span style="color: #ff7b72;">type</span> Server <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='Logger' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s := Server{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.Log(<span style="color: #a5d6ff;">"server started"</span>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Logger struct{}\n\nfunc (Logger) Log(msg string) {\n\tfmt.Println("LOG:", msg)\n}\n\ntype Server struct {\n\t${input}\n}\n\nfunc main() {\n\ts := Server{}\n\ts.Log("server started")\n}`,
        validate: (stdout) => stdout.trim() === "LOG: server started"
    },
    {
        id: 84,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 84: Полиморфные слайсы — slice of interface",
        theory: `
            <h2>Урок 84: Разнородные коллекции</h2>
            <p>В слайс <code class="inline">[]Square</code> положил только площади квадратов. Но элемент interface-слайса — «коробка»: <code class="inline">[]Shape</code> примет и квадрат, и прямоугольник, и будущий круг, лишь бы тип реализовывал <code class="inline">Area()</code>.</p>
            <p>Цикл <code class="inline">for _, s := range shapes { s.Area() }</code> в рантайме сам находит нужную реализацию — это и есть динамический полиморфизм Go.</p>
            <p>Тот же приём — основа плагинов: бэкенд держит <code class="inline">[]Notifier</code> и не знает, что внутри — email, telegram или console-логгер.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В слайс не того типа Square и Rect не поместятся. Укажи элемент — интерфейс Shape: сумма площадей 3×3 и 2×5 = 9+10 = <code class="inline">19</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Shape <span style="color: #ff7b72;">interface</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Area() <span style="color: #79c0ff;">float64</span><br>
            }<br><br>
            <span style="color: #ff7b72;">type</span> Square <span style="color: #ff7b72;">struct</span>{ side <span style="color: #79c0ff;">float64</span> }<br>
            <span style="color: #ff7b72;">type</span> Rect <span style="color: #ff7b72;">struct</span>{ w, h <span style="color: #79c0ff;">float64</span> }<br><br>
            <span style="color: #ff7b72;">func</span> (s Square) <span style="color: #d2a8ff;">Area</span>() <span style="color: #79c0ff;">float64</span> { <span style="color: #ff7b72;">return</span> s.side * s.side }<br>
            <span style="color: #ff7b72;">func</span> (r Rect) <span style="color: #d2a8ff;">Area</span>() <span style="color: #79c0ff;">float64</span>&nbsp; { <span style="color: #ff7b72;">return</span> r.w * r.h }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;shapes := []<textarea id="user-code" rows="2" placeholder='Shape' style="color: #79c0ff; font-weight: normal;"></textarea>{Square{<span style="color: #79c0ff;">3</span>}, Rect{<span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">5</span>}}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0.0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, s := <span style="color: #ff7b72;">range</span> shapes {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += s.Area()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(total)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Shape interface {\n\tArea() float64\n}\n\ntype Square struct{ side float64 }\ntype Rect struct{ w, h float64 }\n\nfunc (s Square) Area() float64 { return s.side * s.side }\nfunc (r Rect) Area() float64   { return r.w * r.h }\n\nfunc main() {\n\tshapes := []${input}{Square{3}, Rect{2, 5}}\n\ttotal := 0.0\n\tfor _, s := range shapes {\n\t\ttotal += s.Area()\n\t}\n\tfmt.Println(total)\n}`,
        validate: (stdout) => stdout.trim() === "19"
    },
    {
        id: 85,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 85: Дженерик-структура — Stack для чего угодно",
        theory: `
            <h2>Урок 85: Generic struct</h2>
            <p>Параметр типа работает не только у функций — <code class="inline">type Stack[T any] struct{ items []T }</code> создаёт целый семейство-тип: <code class="inline">Stack[int]</code>, <code class="inline">Stack[string]</code>, <code class="inline">Stack[User]</code>. Один код стека, любые данные, полная типизация.</p>
            <p>До дженериков путь был один: <code class="inline">[]any</code> + type assertion с паникой при ошибке. Дженерик ломает эту проблему на уровне компилятора: <code class="inline">Stack[int]</code> физически не примет строку.</p>
            <p>Методы такой структуры тоже параметризованы: <code class="inline">func (s *Stack[T]) Pop() T</code> — реципиент и результат связаны одним T.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Стек LIFO: Push кладёт наверх, Pop снимает верхний. Положи третью строку <code class="inline">"third"</code> — после Println(len(...)) и Pop на экране будет <code class="inline">3</code> и <code class="inline">third</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">type</span> Stack[T <span style="color: #79c0ff;">any</span>] <span style="color: #ff7b72;">struct</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;items []T<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> (s *Stack[T]) <span style="color: #d2a8ff;">Push</span>(item T) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.items = append(s.items, item)<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> (s *Stack[T]) <span style="color: #d2a8ff;">Pop</span>() T {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;last := len(s.items) - <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;item := s.items[last]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;s.items = s.items[:last]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> item<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;stack := &amp;Stack[<span style="color: #79c0ff;">string</span>]{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;stack.Push(<span style="color: #a5d6ff;">"first"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;stack.Push(<span style="color: #a5d6ff;">"second"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;stack.Push(<textarea id="user-code" rows="2" placeholder='"third"' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(len(stack.items))<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(stack.Pop())<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\ntype Stack[T any] struct {\n\titems []T\n}\n\nfunc (s *Stack[T]) Push(item T) {\n\ts.items = append(s.items, item)\n}\n\nfunc (s *Stack[T]) Pop() T {\n\tlast := len(s.items) - 1\n\titem := s.items[last]\n\ts.items = s.items[:last]\n\treturn item\n}\n\nfunc main() {\n\tstack := &Stack[string]{}\n\tstack.Push("first")\n\tstack.Push("second")\n\tstack.Push(${input})\n\tfmt.Println(len(stack.items))\n\tfmt.Println(stack.Pop())\n}`,
        validate: (stdout) => stdout.trim() === "3\nthird"
    },
    {
        id: 86,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 86: Юнион-ограничения и приём T(0)",
        theory: `
            <h2>Урок 86: Свой constraint + zero value обёртка</h2>
            <p>Ограничение можно собрать руками через union: <code class="inline">[T int | float64]</code> — и функция примет только эти два типа. Так делали до появления <code class="inline">cmp</code>, и приём жив: когда нужна узкая, своя группа типов.</p>
            <p>Проблема: как создать «нулевое» значение неизвестного T — <code class="inline">total := 0</code> не скомпилируется (0 это int, а не T). Решение-трюк: <code class="inline">total := T(0)</code> — преобразование даёт нуль нужного типа.</p>
            <p>Этот трюк нужен в любой дженерик-агрегации: sum, average, min-by-field, reduce.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Функция Sum уже ограничена <code class="inline">int | float64</code>, но не компилируется из-за строки инициализации счётчика. Замени её на <code class="inline">T(0)</code> — ответ: <code class="inline">6 4</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">Sum</span>[T <span style="color: #79c0ff;">int</span> | <span style="color: #79c0ff;">float64</span>](nums []T) T {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <textarea id="user-code" rows="2" placeholder='T(0)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, n := <span style="color: #ff7b72;">range</span> nums {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> total<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(Sum([]<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">1</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>}), Sum([]<span style="color: #79c0ff;">float64</span>{<span style="color: #79c0ff;">1.5</span>, <span style="color: #79c0ff;">2.5</span>}))<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc Sum[T int | float64](nums []T) T {\n\ttotal := ${input}\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\nfunc main() {\n\tfmt.Println(Sum([]int{1, 2, 3}), Sum([]float64{1.5, 2.5}))\n}`,
        validate: (stdout) => stdout.trim() === "6 4"
    }
];
