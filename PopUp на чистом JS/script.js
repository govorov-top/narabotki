'use strict';
function timer(name, action){
    let start = Date.now();
    action();
    console.log(name, 'Прошло: ', Date.now() - start, 'ms');
}

class PopUp {

    btnGetPopup;
    popUpCounter;
    closeBtn;

    constructor(btnGetPopup) {
        this.btnGetPopup = btnGetPopup;
        if(this.btnGetPopup) {
            this.openPopUpsCounter('open-popups');
            // Убираем скрол у body
            document.querySelector('body').style.overflowY = 'hidden';

            // Окно
            let popup = document.getElementById(this.btnGetPopup.getAttribute("data-pop"));
            if (popup){
                // У последующего открытого окна z-index будет > предыдущего
                popup.style.zIndex = this.popUpCounter;
                // Блок .pop с контентом
                const popupContent = popup.querySelector('.pop');
                // Создаем и добавляем контейнер окна, для дальнейшей реализации прокрутки длинных окон
                const popupContainer = document.createElement('div');
                popupContainer.setAttribute('class', 'popup-container');
                popupContent.parentNode.insertBefore(popupContainer, popupContent);
                popupContainer.appendChild(popupContent);
                // Блок .pop.img c картинкой
                const popupContentImg = popup.querySelector('.pop.img');
                // Атрибут с ссылкой на картинку полного размера
                const popupFullImg = this.btnGetPopup.getAttribute("data-full-img");
                // Блок .pop.video c iframe в котором будет видео
                const popupContentVideo = popup.querySelector('.pop.video');
                // Атрибут с ссылкой на видео
                const popupFullVideo = this.btnGetPopup.getAttribute("data-full-video");
                // Устанавливаем максимальную ширину окна
                let popupMaxWidth = popup.getAttribute('data-max-width');
                if (!popupMaxWidth) popupMaxWidth = (window.innerWidth - 100);
                popupContent.style.maxWidth = popupMaxWidth + 'px';

                // Создаем кнопку закрытия окна и вставляем в popupContent
                this.closeBtnCreate(popup,popupContent);
                // Проверка на существование окон с картинками или видео
                if (popupContentImg){
                    // Если пусто и картинки нет
                    let imgToPop = popupContentImg.querySelector('img');
                    if (!imgToPop){
                        // Создаем и вставляем в popupContentImg картинку
                        const createImg = document.createElement('img');
                        createImg.style.width = '100%';
                        popupContentImg.prepend(createImg);
                        imgToPop = createImg;
                    }
                    imgToPop.src = popupFullImg
                }else if (popupContentVideo) {
                    // Если пусто и видео нет
                    let videoToPop = popupContentVideo.querySelector('iframe');
                    let widthVideo = this.btnGetPopup.getAttribute('data-width-video') ? this.btnGetPopup.getAttribute('data-width-video') : 560;
                    if (widthVideo >= window.innerWidth){
                        widthVideo = (window.innerWidth - 100) + 'px';
                    }
                    let heightVideo = this.btnGetPopup.getAttribute('data-height-video') ? this.btnGetPopup.getAttribute('data-height-video') : 315;
                    if (heightVideo >= window.innerHeight){
                        heightVideo = (window.innerHeight - 100) + 'px';
                    }
                    popupContent.style.maxWidth = widthVideo + 'px';
                    if (!videoToPop){
                        // Создаем и вставляем в popupContentVideo видео
                        const createVideo = document.createElement('iframe');
                        createVideo.style.width = widthVideo;
                        createVideo.style.height = heightVideo;
                        createVideo.setAttribute('allow', 'autoplay;');
                        createVideo.setAttribute('frameborder', '0');
                        popupContentVideo.prepend(createVideo);
                        videoToPop = createVideo;
                    }
                    videoToPop.src = popupFullVideo + '?autoplay=1';
                }
                //Создаем лоадер если у нас идет вызов картинок или видео
                let imgLoader = document.querySelector('img.loader-popup');
                if (popupContentImg || popupContentVideo){
                    if (!imgLoader){
                        const createImgLoader = document.createElement('img');
                        createImgLoader.src = 'img/loader.gif';
                        createImgLoader.className = 'loader-popup';
                        document.querySelector('body').prepend(createImgLoader);
                        imgLoader = createImgLoader;
                    }
                }

                // Показываем окно
                if (popupContentImg){
                    popupContentImg.querySelector('img').onload = (ev) => {
                        if (ev.path[0].src){
                            this.fadeOut(imgLoader);
                            this.fadeIn(popup, 'block');
                            // Центруем окно
                            this.alignmentPopUps(popupContent,popupContainer);
                        }
                    }
                }else if(popupContentVideo){
                    popupContentVideo.querySelector('iframe').onload = (ev) => {
                        if (ev.path[0].src){
                            this.fadeOut(imgLoader);
                            this.fadeIn(popup, 'block');
                            // Центруем окно
                            this.alignmentPopUps(popupContent,popupContainer);
                        }
                    }
                }else {
                    this.fadeIn(popup, 'block');
                    // Центруем окно
                    this.alignmentPopUps(popupContent,popupContainer);
                }

                // По клику чистим src и закрываем окно
                this.closeBtn.onclick = () => {
                    if (popupContentImg){
                        popupContentImg.querySelector('img').removeAttribute('src');
                    }else if(popupContentVideo){
                        popupContentVideo.querySelector('iframe').removeAttribute('src');
                    }
                    this.fadeOut(popup);
                    // Возвращаем скрол у body
                    document.querySelector('body').style.overflowY = 'auto';
                }
            }else {
                alert('Окно вызываемое по данной «кнопке» не найдено!');
            }
        }
    }

    /**
     * Записываем в localStorage открытие каждого окна.
     * Для того чтобы последующие открытые окна внутри окон были выше уже открытых.
     * @param name
     */
    openPopUpsCounter(name){
        this.popUpCounter = Number(localStorage.getItem(name));
        if(!this.popUpCounter) localStorage.setItem(name, 10);
        else localStorage.setItem(name, ++this.popUpCounter);
    }

    /**
     * Создаем кнопку закрытия окна и вставляем в popupContainer
     * @param popup - Где ищем
     * @param popupContent - куда вставляем
     */
    closeBtnCreate(popup,popupContent){
        this.closeBtn = popup.querySelector('.close');
        if (!this.closeBtn){
            const createCloseBtn = document.createElement('span');
            createCloseBtn.className = 'close';
            popupContent.prepend(createCloseBtn);
            this.closeBtn = createCloseBtn;
        }
    }

    /**
     * Функция для установки popUp по центру экрана
     * @param popupContent
     * @param popupContainer
     */
    alignmentPopUps(popupContent,popupContainer) {
        // Получаем высоту popupContent, для включения прокрутки, если оно слишком длинное и для отцентровки
        const popupContentHeight = popupContent.clientHeight;
        // Устанавливаем минимальную высоту окна, зависит от размера popupContent
        popupContainer.style.minHeight = (popupContentHeight + 100) + 'px';
        // Выщитываем размер окна для отцентровки
        const screenUserHeight = Number(window.innerHeight);
        const marginTop = (screenUserHeight - popupContentHeight) / 2;
        if(marginTop > 0 && popupContentHeight !== 0){
            popupContent.style.marginTop = marginTop + 'px';
        }else{
            popupContent.style.margin = '50px auto';
        }
        console.log('Высчитываем центровку окна: (' + screenUserHeight + ' - ' + popupContentHeight + ') / 2 = ' + marginTop);
    }

    /**
     * Функция анимации появления окна
     * @param el
     * @param displayClass
     */
    fadeIn(el, displayClass) {
        el.style.opacity = '0';
        el.style.display = displayClass || 'block';
        (function fade() {
            let val = Number(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = `${val}`;
                requestAnimationFrame(fade);
            }
        })();
    }

    /**
     * Функция анимации скрытия окна
     * @param el
     */
    fadeOut(el) {
        el.style.opacity = '1';
        (function fade() {
            if ((el.style.opacity -= '.1') < 0) {
                el.style.display = 'none';
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }
}


document.addEventListener('click', ({ target }) => {
    timer("PopUp", () => {
        new PopUp(target.closest('.popClick'));
    });
});
// Нужно только для тестов, можно удалить
const addBtn = document.querySelector('.addBtn');
addBtn.onclick = () => {
    // Создаем кнопку и добавляем ниже
    const createBtn = document.createElement('div');
    createBtn.className = 'btn popClick';
    createBtn.setAttribute('data-pop', 'hidden-block');
    createBtn.innerText = 'Добавленная кнопка'
    addBtn.insertAdjacentElement('afterEnd', createBtn);
}