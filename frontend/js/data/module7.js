// js/data/module7.js
export const module7Lessons = [
    {
        id: 48,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 48: Горутины — ключевое слово go",
        theory: `
            <h2>Урок 48: Горутины</h2>
            <p>Горутина — это легковесная «нитка» выполнения, которая запускается параллельно с основной программой. Всего одно слово <code class="inline">go</code> перед вызовом функции — и функция выполняется в фоне.</p>
            <p>Одна есть загвоздка: как только <code class="inline">main</code> завершается, программа убивает все горутины, даже не завершённые. Поэтому фоновую работу нужно синхронизировать с main — например, через канал.</p>
            <p><b>Канал</b> <code class="inline">chan string</code> — это труба между горутинами: одна сторона отправляет значение (<code class="inline">ch &lt;- v</code>), другая читает (<code class="inline">&lt;-ch</code>) и ждёт, пока внутри что-то появится.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Горутина уже отправила в канал <code class="inline">ch</code> приветствие. Прочитай значение из канала и выведи его на экран. Ответ: <code class="inline">Hi from goroutine</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">hello</span>(c <span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">string</span>) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;c &lt;- <span style="color: #a5d6ff;">"Hi from goroutine"</span><br>
            }<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">string</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> hello(ch)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(&lt;-ch)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc hello(c chan string) {\n\tc <- "Hi from goroutine"\n}\n\nfunc main() {\n\tch := make(chan string)\n\tgo hello(ch)\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "Hi from goroutine"
    },
    {
        id: 49,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 49: sync.WaitGroup — ждём все горутины",
        theory: `
            <h2>Урок 49: WaitGroup</h2>
            <p>Когда фоновых задач много, канал на каждую создавать накладно. Для ожидания группы горутин служит <code class="inline">sync.WaitGroup</code>.</p>
            <p>Протокол работы из трёх шагов:</p>
            <ol>
                <li><code class="inline">wg.Add(1)</code> — «запусти одну фоновую задачу».</li>
                <li>Внутри горутины <code class="inline">defer wg.Done()</code> — «я закончила».</li>
                <li>В main <code class="inline">wg.Wait()</code> — «стой, пока счётчик не обнулится».</li>
            </ol>
            <p>Классический баг новичка — забыть <code class="inline">wg.Wait()</code>: main завершится мгновенно, и половина горутин не успеет отработать.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В цикле запускаются 3 горутины, каждая печатает «done». Допиши в конце main ожидание завершения всех горутин, чтобы программа вывела ровно три строчки <code class="inline">done</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> wg sync.WaitGroup<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">0</span>; i &lt; <span style="color: #79c0ff;">3</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wg.Add(<span style="color: #79c0ff;">1</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> wg.Done()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(<span style="color: #a5d6ff;">"done"</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='wg.Wait()' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 3; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println("done")\n\t\t}()\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.replace(/\s+/g, '') === "donedonedone"
    },
    {
        id: 50,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 50: Каналы — синхронизация через общение",
        theory: `
            <h2>Урок 50: Общайтесь каналами</h2>
            <p>Философия Go: <i>«Don't communicate by sharing memory; share memory by communicating»</i> — не дели память сообщениями, а обменивай память сообщениями.</p>
            <p>Небуферизованный канал <code class="inline">make(chan int)</code> работает как рукопожатие: отправляющий <code class="inline">ch &lt;- 42</code> блокируется до тех пор, пока читающий не заберёт значение. Это естественная синхронизация — никаких sleep-ов.</p>
            <p>Чтение <code class="inline">&lt;-ch</code> — это целое выражение: результат можно присвоить переменной прямо в месте приёма.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Горутина отправила в канал число 42. Присвой переменной <code class="inline">result</code> значение, полученное из канала <code class="inline">ch</code> — программа должна напечатать <code class="inline">42</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">42</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;result := <textarea id="user-code" rows="2" placeholder='<-ch' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(result)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tch := make(chan int)\n\tgo func() {\n\t\tch <- 42\n\t}()\n\tresult := ${input}\n\tfmt.Println(result)\n}`,
        validate: (stdout) => stdout.trim() === "42"
    },
    {
        id: 51,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 51: Буферизованные каналы",
        theory: `
            <h2>Урок 51: Буфер в канале</h2>
            <p>Канал можно создать с «очередью»: <code class="inline">make(chan int, 2)</code>. Теперь отправитель блокируется не сразу, а только когда буфер заполнен.</p>
            <p>Это работает как конвейер на производстве: склад между цехами позволяет работать без простоев. Длина очереди смотрит встроенная <code class="inline">len(ch)</code>, а вместимость — <code class="inline">cap(ch)</code>.</p>
            <p>Но помни: буфер — это способ сгладить проблему, а не решить её. Если очередь растёт бесконечно, значит потребитель не справляется с нагрузкой.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Создан буферизованный канал, в него записаны два числа (1 и 2), но никто ещё не читал. Выведи <code class="inline">len(ch)</code> — сколько элементов лежит в очереди.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">2</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">2</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(len(ch))' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tch := make(chan int, 2)\n\tch <- 1\n\tch <- 2\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "2"
    },
    {
        id: 52,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 52: Дедлок — тупик двух горутин",
        theory: `
            <h2>Урок 52: Deadlock</h2>
            <p>Самая частая ошибка работы с каналами — <b>deadlock</b>. Представь: main пишет в небуферизованный канал <code class="inline">ch &lt;- 1</code> и ждёт читателя. Но читателей нет — горутин, которые читают, тоже нет. Все ждут друг друга вечно.</p>
            <p>Go-рантайм замечает, что все горутины спят, и роняет программу: <code class="inline">fatal error: all goroutines are asleep - deadlock!</code></p>
            <p>Лечится просто: отправку в канал заворачивают в отдельную горутину, которая разблокирует пишущего.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Горутина уже запущена, но внутри неё пусто — main читает из канала и зависает. Допиши в горутину отправку числа 7, чтобы программа напечатала <code class="inline">7</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='ch <- 7' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(&lt;-ch)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tch := make(chan int)\n\tgo func() {\n\t\t${input}\n\t}()\n\tfmt.Println(<-ch)\n}`,
        validate: (stdout) => stdout.trim() === "7"
    },
    {
        id: 53,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 53: close и перебор for range по каналу",
        theory: `
            <h2>Урок 53: Закрытие канала</h2>
            <p>Когда отправитель закончил работу, канал закрывают: <code class="inline">close(ch)</code>. Это сигнал читателям: «новых значений не будет, доешьте очередь».</p>
            <p>Закрывший канал умеет перебирать <code class="inline">for v := range ch</code>: цикл сам заберёт все значения и автоматически завершится в момент закрытия. Без close такой цикл зависнет навсегда, ожидая новых данных.</p>
            <p>Важное правило: закрывает всегда <b>отправитель</b>, а не получатель. Отправка в закрытый канал — паника.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>В буферизованный канал записаны числа 1, 2 и 3, канал закрыт. Цикл уже просуммировал все значения в переменную <code class="inline">total</code>. Выведи её на экран — ожидается <code class="inline">6</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>, <span style="color: #79c0ff;">3</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">1</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">2</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch &lt;- <span style="color: #79c0ff;">3</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;close(ch)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;total := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> v := <span style="color: #ff7b72;">range</span> ch {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total += v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(total)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tch := make(chan int, 3)\n\tch <- 1\n\tch <- 2\n\tch <- 3\n\tclose(ch)\n\ttotal := 0\n\tfor v := range ch {\n\t\ttotal += v\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "6"
    },
    {
        id: 54,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 54: select — читаем из нескольких каналов",
        theory: `
            <h2>Урок 54: Оператор select</h2>
            <p><code class="inline">select</code> — это switch для каналов. Он ждёт, когда <b>хотя бы один</b> из перечисленных кейсов будет готов, и выполняет именно его. Если готовы несколько — выбирает случайный (защита от голодания).</p>
            <p>Кейс <code class="inline">default</code> превращает вечное ожидание в <b>неблокирующий</b> запрос: если ни один канал не готов, мгновенно выполнится default.</p>
            <p>Так устроен таймаут на бэкенде: select слушает рабочий канал и <code class="inline">time.After</code> — кто первый «даст данные», тот и выиграл гонку.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>Канал <code class="inline">ch</code> пуст, и никто в него не пишет. Выведи <code class="inline">value</code> на экран: select мгновенно уйдёт в ветку default и присвоит 99. Ответ программы: <code class="inline">99</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> <span style="color: #a5d6ff;">"fmt"</span><br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;ch := <span style="color: #ff7b72;">make</span>(<span style="color: #ff7b72;">chan</span> <span style="color: #79c0ff;">int</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;value := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">select</span> {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">case</span> v := &lt;-ch:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value = v<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">default</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value = <span style="color: #79c0ff;">99</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='fmt.Println(value)' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport "fmt"\n\nfunc main() {\n\tch := make(chan int)\n\tvalue := 0\n\tselect {\n\tcase v := <-ch:\n\t\tvalue = v\n\tdefault:\n\t\tvalue = 99\n\t}\n\t${input}\n}`,
        validate: (stdout) => stdout.trim() === "99"
    },
    {
        id: 55,
        moduleId: 7,
        moduleTitle: "Раздел 7: Конкурентность",
        title: "Урок 55: sync.Mutex — защита общих данных",
        theory: `
            <h2>Урок 55: Мьютекс и гонка данных</h2>
            <p>Когда несколько горутин одновременно изменяют одну переменную, происходит <b>data race</b>: инкремент <code class="inline">counter++</code> — это не атомарная операция (чтение + сложение + запись), и параллельные горутини теряют обновления. 1000 инкрементов могут дать 937.</p>
            <p><code class="inline">sync.Mutex</code> (мьютекс) работает как замок в туалете: <code class="inline">mu.Lock()</code> заходит только один, остальные ждут. Пока не вызван <code class="inline">mu.Unlock()</code>, второй внутрь не попадёт.</p>
            <p>Обычно Unlock откладывают через <code class="inline">defer mu.Unlock()</code> сразу после Lock — замок точно откроется при любом выходе.</p>
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            <h3>Задание:</h3>
            <p>1000 горутин увеличивают счётчик под блокировкой. В коде есть <code class="inline">mu.Lock()</code>, но нет <code class="inline">mu.Unlock()</code> — из-за этого программа намертво виснет. Допиши разблокировку, и ответ будет ровно <code class="inline">1000</code>.</p>
        `,
        renderEditor: () => `
            <span style="color: #ff7b72;">package</span> main<br><br>
            <span style="color: #ff7b72;">import</span> (<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"fmt"</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a5d6ff;">"sync"</span><br>
            )<br><br>
            <span style="color: #ff7b72;">func</span> <span style="color: #d2a8ff;">main</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> wg sync.WaitGroup<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">var</span> mu sync.Mutex<br>
            &nbsp;&nbsp;&nbsp;&nbsp;counter := <span style="color: #79c0ff;">0</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">for</span> i := <span style="color: #79c0ff;">0</span>; i &lt; <span style="color: #79c0ff;">1000</span>; i++ {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wg.Add(<span style="color: #79c0ff;">1</span>)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">go</span> <span style="color: #ff7b72;">func</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff7b72;">defer</span> wg.Done()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mu.Lock()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;counter++<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id="user-code" rows="2" placeholder='mu.Unlock()' style="color: #79c0ff; font-weight: normal;"></textarea><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;wg.Wait()<br>
            &nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(counter)<br>
            }
        `,
        placeholderColor: "#0d1117",
        buildCode: (input) => `package main\n\nimport (\n\t"fmt"\n\t"sync"\n)\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tvar mu sync.Mutex\n\tcounter := 0\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tmu.Lock()\n\t\t\tcounter++\n\t\t\t${input}\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(counter)\n}`,
        validate: (stdout) => stdout.trim() === "1000"
    }
];
