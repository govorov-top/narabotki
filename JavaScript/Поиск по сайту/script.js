/* Поиск по сайту */

const headerSearchBlock = document.querySelector('header.header#header .search');
if (headerSearchBlock){
    const headerSearchInput = headerSearchBlock.querySelector('input[type="search"]');
    const headerSearchResults = headerSearchBlock.querySelector('ul.search-result');

    // Создаём функцию отложенного вызова другой функции,
    // до момента, когда с последнего вызова произойдет определенное количество времени.
    // Простым языком - вызовы и нажатия клавиш в поисковой строке будут игнориться сервером, пока человек не закончит набирать фразу
    // Так решаю проблему постоянной отправки запросов на сервер, набирая каждую букву в инпуте.
    // Даже печатая очень быстро на каждое нажатие шёл запрос и тратились ресурсы
    // callee - отложенная функция, timeoutMs - интервал времени, по прошествии которого функция будет вызвана
    function debounce(callee, timeOut){
        return function (e){
            // Переменная с меткой последнего вызова
            let previousCall = this.lastCall;
            // Переменная текущего вызова в настоящий момент
            this.lastCall = Date.now();
            // Сравниваем разницу между вызовами, если разница между ними меньше чем интервал, чистим таймаут
            if (previousCall && this.lastCall - previousCall <= timeOut) {
                clearTimeout(this.lastCallTimer);
            }
            this.lastCallTimer = setTimeout(() => callee(e), timeOut);
        };
    }

    // Обработчик headerSearchInput вынесен для удобного обертывания в функцию debounce
    function handleInput(e) {
        let headerSearchValue = e.target.value;
        if (headerSearchValue.length > 1) {
            fadeIn(headerSearchResults);
            const url = rgData.ajax_url;
            let result = '', request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.responseType = 'json';
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(`action=rg_ajax_search&term=${headerSearchValue}&post_type=post`);
            request.onload = function () {
                result = request.response;
                if (result.length >= 1) {
                    headerSearchResults.innerHTML = '';
                    for (const item of result) {
                        let li = document.createElement('li');
                        li.classList.add('item');
                        let a = document.createElement('a');
                        a.classList.add('link');
                        a.setAttribute('href', item.url);
                        a.setAttribute('title', item.value);
                        a.innerText = item.value;
                        li.append(a);
                        headerSearchResults.append(li);
                    }
                }else {
                    headerSearchResults.innerHTML = '<li class="not-found">Таких страниц не найдено...</li>';
                }
            }
        } else {
            fadeOut(headerSearchResults);
        }
    }

    // Прежде чем обработчик запустится, ставим таймаут
    const debouncedHandle = debounce(handleInput, 250);

    // Передаём слушателю новую функцию debouncedHandle
    headerSearchInput.addEventListener('input', debouncedHandle);
    if (window.matchMedia('(max-width: 992px)').matches) {
        const btn = headerSearchBlock.querySelector('button.search-submit');
        const inputAndResult = headerSearchBlock.querySelector('.queries');
        if (btn){
            btn.addEventListener('click', function (e) {
                if (headerSearchInput.value.length <= 0){
                    e.preventDefault();
                }
                btn.setAttribute('data-click', 1);
                if (window.matchMedia('(max-width: 991.98px)')) {
                    inputAndResult.classList.add('queries_mobile');
                }
                inputAndResult.classList.remove('d-none');
            });
        }
        document.addEventListener('click', ({target}) => {
            if (!target.classList.contains('search-result')){
                fadeOut(headerSearchResults);
            }
            if (window.matchMedia('(max-width: 991.98px)')) {
                const btnHeaderSearchBlock = headerSearchBlock.querySelector('button.search-submit');
                const btnHeaderSearchBlockAttr = btnHeaderSearchBlock.getAttribute('data-click');
                if (!target.closest('#rg-search-form') &&  btnHeaderSearchBlockAttr === '1') {
                    inputAndResult.classList.remove('queries_mobile');
                    inputAndResult.classList.add('d-none');
                    btnHeaderSearchBlock.setAttribute('data-click', 0);
                }
            }
        });
    }

}