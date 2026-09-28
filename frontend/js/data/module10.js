// js/data/module10.js
export const module10Lessons = [
    {
        id: 71,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 71: Worker Pool — рой рабочих горутин",
        theory: `
            <h2>Урок 71: Worker Pool</h2>
            <p>Главный паттерн высоконагруженных сервисов: вместо тысячи горутин на каждую задачу держим <b>пул фиксированных рабочих</b>. Все они читают задания из одного канала <code class="inline">jobs</code> — Go сам распределит работу между ними.</p>
            <p>Схема: продюсер пишет задачи в <code class="inline">jobs</code> и закрывает канал, N воркеров крутят <code class="inline">for j := range jobs</code> и пишут результаты в <code class="inline">results</code>.</p>
            <p>Плюсы: контролируемая нагрузка на CPU/БД, никакой лавины горутин. Именно так устроен пул соединений в базе и воркеры в CI.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Два воркера возводят числа 1–4 в квадрат. main уже просуммировал результаты в <code class="inline">total</code> (1+4+9+16). Выведи сумму — ответ <code class="inline">30</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;jobs := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">4</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;results := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">4</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> w := <span style="color: #79c0ff;">1</span>; w &lt;= <span style="color: #79c0ff;">2</span>; w++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> j := <span style="color: #ff7b72;">range</span> jobs {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results &lt;- j * j<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">1</span>; i &lt;= <span style="color: #79c0ff;">4</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobs &lt;- i<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(jobs)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">0</span>; i &lt; <span style="color: #79c0ff;">4</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += &lt;-results<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(total)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tjobs := make(chan int, 4)\n\tresults := make(chan int, 4)\n\tfor w := 1; w <= 2; w++ {\n\t\tgo func() {\n\t\t\tfor j := range jobs {\n\t\t\t\tresults <- j * j\n\t\t\t}\n\t\t}()\n\t}\n\tfor i := 1; i <= 4; i++ {\n\t\tjobs <- i\n\t}\n\tclose(jobs)\n\ttotal := 0\n\tfor i := 0; i < 4; i++ {\n\t\ttotal += <-results\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "30"
    },
    {
        id: 72,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 72: Pipeline — конвейер стадий",
        theory: `
            <h2>Урок 72: Pipeline</h2>
            <p>Конвейер — цепочка горутин-стадий, соединённых каналами: выход одной стадии — вход следующей. Каждая стадия получает данные, преобразует и передаёт дальше.</p>
            <p>Классический пример: <i>чтение строк → парсинг → агрегация</i>. В Go это буквально три канала и три горутинных функции, каждая со своим <code class="inline">for range</code> и <code class="inline">close()</code> на выходе.</p>
            <p>Бонус паттерна: стадии работают параллельно. Пока вторая обрабатывает элемент N, первая уже готова принять N+1.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Первая стадия прибавляет единицу (получилось 2,3,4). Вторая должна удваивать — допиши значение, которое улетает в канал <code class="inline">doubled</code>. Ожидаемый вывод: <code class="inline">4 6 8</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;nums := []<span style="color: #79c0ff;">int</span>{<span style="color: #79c0ff;">1</span>, <span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;incremented := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, n := <span style="color: #ff7b72;">range</span> nums {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incremented &lt;- n + <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;close(incremented)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;doubled := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> n := <span style="color: #ff7b72;">range</span> incremented {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doubled &lt;- <textarea id="user-code" rows="2" placeholder='n * 2' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;close(doubled)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> doubled {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Print(v, <span style="color: #a5d6ff;">" "</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tnums := []int{1, 2, 3}\n\tincremented := make(chan int, 3)\n\tgo func() {\n\t\tfor _, n := range nums {\n\t\t\tincremented <- n + 1\n\t\t}\n\t\tclose(incremented)\n\t}()\n\tdoubled := make(chan int, 3)\n\tgo func() {\n\t\tfor n := range incremented {\n\t\t\tdoubled <- ${input}\n\t\t}\n\t\tclose(doubled)\n\t}()\n\tfor v := range doubled {\n\t\tfmt.Print(v, " ")\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "4 6 8"
    },
    {
        id: 73,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 73: Fan-in — слияние каналов",
        theory: `
            <h2>Урок 73: Fan-in</h2>
            <p>Если worker pool (урок 71) — это «много ртов к одной тарелке», то <b>fan-in</b> — обратная операция: «несколько тарелок в один рот». Несколько каналов-источников сливаются в один выходной.</p>
            <p>Простейшая реализация — горoutine, которая по очереди вычитывает каждый вход и перекладывает в общий выход, а в конце <b>обязательно закрывает его</b>.</p>
            <p>Зачем: у тебя 5 микросервисов стримят данные, а потребитель один — fan-in собирает всё в единый поток.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Первый канал уже переливается в <code class="inline">out</code>. Допиши перекладывание значений из второго канала <code class="inline">c2</code> — сумма всех четырёх чисел (1+2+3+4) должна дать <code class="inline">10</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;c1 := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">2</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;c2 := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">2</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;c1 &lt;- <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;c1 &lt;- <span style="color: #79c0ff;">2</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;c2 &lt;- <span style="color: #79c0ff;">3</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;c2 &lt;- <span style="color: #79c0ff;">4</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(c1)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(c2)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;out := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">4</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> c1 {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out &lt;- v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> c2 {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='out <- v' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;close(out)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> out {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(total)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tc1 := make(chan int, 2)\n\tc2 := make(chan int, 2)\n\tc1 <- 1\n\tc1 <- 2\n\tc2 <- 3\n\tc2 <- 4\n\tclose(c1)\n\tclose(c2)\n\tout := make(chan int, 4)\n\tgo func() {\n\t\tfor v := range c1 {\n\t\t\tout <- v\n\t\t}\n\t\tfor v := range c2 {\n\t\t\t${input}\n\t\t}\n\t\tclose(out)\n\t}()\n\ttotal := 0\n\tfor v := range out {\n\t\ttotal += v\n\t}\n\tfmt.Println(total)\n}`,
        validate: (stdout) => stdout.trim() === "10"
    },
    {
        id: 74,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 74: sync/atomic — молниеносный счётчик",
        theory: `
            <h2>Урок 74: Атомарные операции</h2>
            <p>Мьютекс (урок 55) надёжен, но дорог: блокировка/разблокировка — это системные вызовы и переключение контекста. Для примитивных операций вида «изменить число» есть легче — <code class="inline">sync/atomic</code>.</p>
            <p><code class="inline">atomic.AddInt64(&counter, 1)</code> выполняет инкремент одной машинной инструкцией — гонка невозможна в принципе, без всяких замков.</p>
            <p>Что ещё есть: <code class="inline">atomic.LoadInt64</code>, <code class="inline">atomic.StoreInt64</code>, <code class="inline">atomic.CompareAndSwap</code>. Но помни: atomic защищает только одну операцию, а не логическую транзакцию из нескольких шагов.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>1000 горутин должны атомарно увеличить <code class="inline">counter</code>. Допиши имя функции из пакета atomic — ответ программы: <code class="inline">1000</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync/atomic"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> counter <span style="color: #79c0ff;">int64</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> wg sync.WaitGroup<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">0</span>; i &lt; <span style="color: #79c0ff;">1000</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wg.Add(<span style="color: #79c0ff;">1</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> wg.Done()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;atomic.<textarea id="user-code" rows="2" placeholder='AddInt64' style="color: #79c0ff; font-weight: normal;"></textarea>(&amp;counter, <span style="color: #79c0ff;">1</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;wg.Wait()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(counter)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"sync/atomic"\n)\n\nfunc main() {\n\tvar counter int64\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tatomic.${input}(&counter, 1)\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counter)\n}`,
        validate: (stdout) => stdout.trim() === "1000"
    },
    {
        id: 75,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 75: Rate Limiter — очередь билетов",
        theory: `
            <h2>Урок 75: Ограничитель частоты</h2>
            <p>API защищают от перегруза: не больше N одновременных запросов. Идиоматичный приём в Go — <b>канал-семафор</b>: буферизованный канал, заранее наполненный «билетами».</p>
            <p>Каждый, кто хочет работать, забирает билет <code class="inline">&lt;-tokens</code>; освободился — вернул <code class="inline">tokens &lt;- struct{}{}</code>. Кто без билета — тому отказ (<code class="inline">select + default</code> из урока 54).</p>
            <p><code class="inline">struct{}{}</code> — пустая структура размером 0 байт: сигнал без данных, идеальный «жетон».</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В «кассе» 3 билета, заходов 10. Цикл уже посчитал в <code class="inline">allowed</code>, сколько запросов получили пропуск. Выведи это число — ответ <code class="inline">3</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tokens := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">struct</span>{}, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tokens &lt;- <span style="color: #ff7b72;">struct</span>{}{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tokens &lt;- <span style="color: #ff7b72;">struct</span>{}{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;tokens &lt;- <span style="color: #ff7b72;">struct</span>{}{}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;allowed := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">0</span>; i &lt; <span style="color: #79c0ff;">10</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">select</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> &lt;-tokens:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allowed++<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">default</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(allowed)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\ttokens := make(chan struct{}, 3)\n\ttokens <- struct{}{}\n\ttokens <- struct{}{}\n\ttokens <- struct{}{}\n\tallowed := 0\n\tfor i := 0; i < 10; i++ {\n\t\tselect {\n\t\tcase <-tokens:\n\t\t\tallowed++\n\t\tdefault:\n\t\t}\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "3"
    },
    {
        id: 76,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 76: Generator — функция, производящая поток",
        theory: `
            <h2>Урок 76: Генераторы</h2>
            <p>Функция-генератор возвращает не значение, а <b>канал</b>, из которого будет капать поток данных. Вызывающий просто делает <code class="inline">for range</code> по этому каналу — как по бесконечному списку, только ленивому.</p>
            <pre><code class="block">func gen(nums ...int) &lt;-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out &lt;- n
        }
        close(out)
    }()
    return out
}</code></pre>
            <p>Направление <code class="inline">&lt;-chan int</code> в сигнатуре — подсказка компилятору и людям: этот канал можно только читать. Забыл генератор закрыть выход — потребитель зависнет навечно.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Тело генератора почти готово: цикл пишет числа в <code class="inline">out</code>. Не хватает финального шага, иначе main зависнет в range навсегда. Допиши его — вывод: <code class="inline">2 3 4</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">gen</span>(nums ...<span style="color: #79c0ff;">int</span>) &lt;-<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;out := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span>, n := <span style="color: #ff7b72;">range</span> nums {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out &lt;- n<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='close(out)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">return</span> out<br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> n := <span style="color: #ff7b72;">range</span> gen(<span style="color: #79c0ff;">2</span>, <span style="color: #79c0ff;">3</span>, <span style="color: #79c0ff;">4</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Print(n, <span style="color: #a5d6ff;">" "</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc gen(nums ...int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t\tfor _, n := range nums {\n\t\t\tout <- n\n\t\t}\n\t\t${input}\n\t}()\n\treturn out\n}\n\nfunc main() {\n\tfor n := range gen(2, 3, 4) {\n\t\tfmt.Print(n, " ")\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "2 3 4",
        errorMessage: "Все горутины уснули? range по открытому каналу ждёт вечно — генератор обязан закрыть выход."
    },
    {
        id: 77,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 77: Timeout — select и time.After",
        theory: `
            <h2>Урок 77: Таймауты</h2>
            <p>Внешний сервис может висеть вечно, а твой API должен отвечать быстро. Эталонный приём Go — <code class="inline">select</code> с кейсом <code class="inline">time.After(100 * time.Millisecond)</code>: сработает то, что наступит раньше.</p>
            <pre><code class="block">select {
case res := &lt;-slowAPI:
    // успели!
case &lt;-time.After(100 * time.Millisecond):
    // время вышло
}</code></pre>
            <p>В реальных серверах вместо time.After используют <code class="inline">context.Context</code> (внутренняя работа — тот же select с таймером, но с отменой сразу всех).</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>API «думает» 2 секунды, таймаут — 100 миллисекунд. В ветке timeout напечатай строку <code class="inline">"timeout"</code> — она и появится на экране.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"time"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;slowAPI := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">string</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time.Sleep(<span style="color: #79c0ff;">2</span> * time.Second)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slowAPI &lt;- <span style="color: #a5d6ff;">"response"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">select</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> res := &lt;-slowAPI:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(res)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> &lt;-time.After(<span style="color: #79c0ff;">100</span> * time.Millisecond):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<textarea id="user-code" rows="2" placeholder='"timeout"' style="color: #79c0ff; font-weight: normal;"></textarea>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc main() {\n\tslowAPI := make(chan string)\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tslowAPI <- "response"\n\t}()\n\tselect {\n\tcase res := <-slowAPI:\n\t\tfmt.Println(res)\n\tcase <-time.After(100 * time.Millisecond):\n\t\tfmt.Println(${input})\n\t}\n}`,
        validate: (stdout) => stdout.trim() === "timeout"
    },
    {
        id: 78,
        moduleId: 10,
        moduleTitle: "Раздел 10: Паттерны конкурентности",
        title: "Урок 78: Отмена через close — широковещательный сигнал",
        theory: `
            <h2>Урок 78: Broadcast-отмена</h2>
            <p>Секрет close, о котором молчат в туториалах: закрытие канала будит <b>сразу всех</b> ожидающих. Чтение из закрытого канала мгновенно возвращает zero-value — это и есть сигнал «стоп».</p>
            <p>Паттерн: создаём <code class="inline">done := make(chan struct{})</code>, каждая горутина сидит в select на <code class="inline">&lt;-done</code>, а организатор в момент выключения делает единственный <code class="inline">close(done)</code> — и вся армия останавливается.</p>
            <p>Точно так же под капотом работает <code class="inline">context.WithCancel</code> — просто done-канал спрятан в struct.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Три горутины ждут сигнала в <code class="inline">&lt;-done</code>. Без сигнала main уйдёт в вечный Wait (deadlock). Отдай сигнал остановки — напиши команду, и программа печатает <code class="inline">all stopped</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;done := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">struct</span>{})<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> wg sync.WaitGroup<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">1</span>; i &lt;= <span style="color: #79c0ff;">3</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wg.Add(<span style="color: #79c0ff;">1</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> wg.Done()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-done<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='close(done)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;wg.Wait()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"all stopped"</span>)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\nfunc main() {\n\tdone := make(chan struct{})\n\tvar wg sync.WaitGroup\n\tfor i := 1; i <= 3; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\t<-done\n\t\t}()\n\t}\n\t${input}\n\twg.Wait()\n\tfmt.Println("all stopped")\n}`,
        validate: (stdout) => stdout.trim() === "all stopped",
        errorMessage: "Deadlock: горутины так и ждут сигнала. Открой кран — закрой канал."
    }
];
