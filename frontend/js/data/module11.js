// js/data/module11.js
export const module11Lessons = [
    {
        id: 79,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 79: Универсальный min для чисел",
        theory: `
            <h2>Урок 79: Union-ограничение</h2>
            <p><code class="inline">[T int | float64]</code> разрешает только эти типы — и даёт право писать <code class="inline">a &lt; b</code>. С any сравнение не скомпилировалось бы.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func minT[T int | float64](a, b T) T</code>. В main: <code class="inline">fmt.Println(minT(3, 7), minT(2.5, 1.5))</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">3 1.5</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="12" placeholder='func minT[T int | float64](a, b T) T {\n    if a &lt; b {\n        return a\n    }\n    return b\n}\n\nfunc main() {\n    fmt.Println(minT(3, 7), minT(2.5, 1.5))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "3 1.5"
    },
    {
        id: 80,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 80: Дженерик-агрегация (Sum)",
        theory: `
            <h2>Урок 80: Сумма для int и float64</h2>
            <p>Накопитель инициализируют так: <code class="inline">var total T</code> — zero value подходящего типа. Так функция одна, а типы настоящие.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">func Sum[T int | float64](nums []T) T</code> с циклом. В main: печать Sum по []int{1, 2, 3, 4}.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">10</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="13" placeholder='func Sum[T int | float64](nums []T) T {\n    var total T\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfunc main() {\n    fmt.Println(Sum([]int{1, 2, 3, 4}))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "10"
    },
    {
        id: 81,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 81: fmt.Stringer",
        theory: `
            <h2>Урок 81: Свой формат печати</h2>
            <p>Тип с методом <code class="inline">String() string</code> печатается fmt как скажешь. Метод — на значении-реципиенте.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши <code class="inline">type Size struct{ W, H int }</code> и метод String() = fmt.Sprintf("%dx%d", s.W, s.H). В main: <code class="inline">fmt.Println(Size{800, 600})</code>.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">800x600</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="11" placeholder='type Size struct{ W, H int }\n\nfunc (s Size) String() string {\n    return fmt.Sprintf(&quot;%dx%d&quot;, s.W, s.H)\n}\n\nfunc main() {\n    fmt.Println(Size{800, 600})\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "800x600"
    },
    {
        id: 82,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 82: Полиморфный слайс",
        theory: `
            <h2>Урок 82: Интерфейс как общий знаменатель</h2>
            <p>В <code class="inline">[]Speaker</code> ляжет любой тип с методом Speak(). Цикл вызывает реализацию каждого — динамический полиморфизм.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Опиши <code class="inline">type Speaker interface{ Speak() string }</code>, типы Dog («Woof») и Cat («Meow») с методами. В main: слайс []Speaker{Dog{}, Cat{}}, цикл с Print(a.Speak(), " ").</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">Woof Meow</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='type Speaker interface{ Speak() string }\n\ntype Dog struct{}\n\nfunc (Dog) Speak() string { return &quot;Woof&quot; }\n\ntype Cat struct{}\n\nfunc (Cat) Speak() string { return &quot;Meow&quot; }\n\nfunc main() {\n    animals := []Speaker{Dog{}, Cat{}}\n    for _, a := range animals {\n        fmt.Print(a.Speak(), &quot; &quot;)\n    }\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "Woof Meow"
    },
    {
        id: 83,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 83: Composition — интерфейс из интерфейсов",
        theory: `
            <h2>Урок 83: Встраивание интерфейсов</h2>
            <p><code class="inline">type RW interface { Reader; Writer }</code> объединяет контракты (так устроен io.ReadWriter). Реализуешь оба метода — получаешь оба поведения.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Опиши Reader{Read() string}, Writer{Write(string)}, RW из обоих. Тип Buf{ s string } с методами на <code class="inline">*Buf</code>. В main: <code class="inline">var rw RW = &amp;Buf{}</code>, Write("hello"), печать Read().</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">hello</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='type Reader interface{ Read() string }\ntype Writer interface{ Write(string) }\n\ntype RW interface {\n    Reader\n    Writer\n}\n\ntype Buf struct{ s string }\n\nfunc (b *Buf) Read() string   { return b.s }\nfunc (b *Buf) Write(s string) { b.s = s }\n\nfunc main() {\n    var rw RW = &amp;Buf{}\n    rw.Write(&quot;hello&quot;)\n    fmt.Println(rw.Read())\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "hello"
    },
    {
        id: 84,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 84: Дженерик-структура — Stack",
        theory: `
            <h2>Урок 84: Стек для любого типа</h2>
            <p><code class="inline">type Stack[T any] struct{ items []T }</code>; методы пишутся с параметром: <code class="inline">func (s *Stack[T]) Push(v T)</code>. LIFO: Pop снимает последний.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Реализуй Push (append) и Pop (взять items[len-1] и укоротить срез). В main: <code class="inline">var st Stack[int]</code>, запихни 1, 2, 3 и напечатай st.Pop() — последний вошёл, первый вышел.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">3</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='type Stack[T any] struct{ items []T }\n\nfunc (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }\n\nfunc (s *Stack[T]) Pop() T {\n    v := s.items[len(s.items)-1]\n    s.items = s.items[:len(s.items)-1]\n    return v\n}\n\nfunc main() {\n    var st Stack[int]\n    st.Push(1)\n    st.Push(2)\n    st.Push(3)\n    fmt.Println(st.Pop())\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "3"
    },
    {
        id: 85,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 85: Generic Map (преобразование)",
        theory: `
            <h2>Урок 85: Два параметра типа</h2>
            <p><code class="inline">Map[T, U any](in []T, f func(T) U) []U</code> — входной тип и выходной независимы: int-ы в строки за один проход.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши Map как в заголовке (make с len, цикл). В main преобрази []int{1,2,3} в строки "v%d" и напечатай результат.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">[v1 v2 v3]</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="14" placeholder='func Map[T, U any](in []T, f func(T) U) []U {\n    out := make([]U, len(in))\n    for i, v := range in {\n        out[i] = f(v)\n    }\n    return out\n}\n\nfunc main() {\n    fmt.Println(Map([]int{1, 2, 3}, func(n int) string {\n        return fmt.Sprintf(&quot;v%d&quot;, n)\n    }))\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "[v1 v2 v3]"
    },
    {
        id: 86,
        moduleId: 11,
        moduleTitle: "Раздел 11: Дженерики и интерфейсы глубже",
        title: "Урок 86: Generic Swap",
        theory: `
            <h2>Урок 86: Обмен типобезопасно</h2>
            <p><code class="inline">func Swap[T any](a, b T) (T, T) { return b, a }</code> — дженерик не только для коллекций; дженерик-хелперы чинят повторяющийся код.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Напиши Swap. В main: <code class="inline">x, y := Swap(1, 2)</code> и печать x, y.</p>
            <p><b>Ожидаемый вывод:</b> <code class="inline">2 1</code></p>`,
        renderEditor: () => `\n            package main<br><br>import "fmt"<br><br><textarea id="user-code" rows="10" placeholder='func Swap[T any](a, b T) (T, T) {\n    return b, a\n}\n\nfunc main() {\n    x, y := Swap(1, 2)\n    fmt.Println(x, y)\n}' style="color: #79c0ff; font-weight: normal;"></textarea>\n        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main

import "fmt"

${input}
`,
        validate: (stdout) => stdout.trim() === "2 1"
    }
];
