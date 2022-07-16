'use strict';

function menu(elem, event) {
    document.addEventListener(event, ({target}) => {
        const el = target.closest(elem);
        if(el) {
            let menu = el.closest('nav');
            const showChildMenu = childMenu => {
                childMenu.style.display = 'block';
                childMenu.setAttribute('data-visible', '1');
            }
            const hideChildMenu = childMenu => {
                childMenu.style.display = 'none';
                childMenu.setAttribute('data-visible', '0');
            }
            // Назначаем сласс active на активный элемент, у остальных удаляем
            let removeClassActive = el.closest('ul').querySelectorAll('li');
            removeClassActive.forEach(function(items){
                items.classList.remove("active");
                if (items.querySelector('ul[data-sub]')){
                    hideChildMenu(items.querySelector('ul[data-sub]'));
                }
            });
            el.classList.add("active");

            // Работаем с выпадающими элементами
            let childMenu = el.querySelector('.menu-dropdown');
            if (childMenu){
                if (childMenu.getAttribute('data-sub') === '1'){
                    childMenu.style.top = menu.clientHeight + 'px';
                }else {
                    let numSub = Number(childMenu.getAttribute('data-sub'));
                    let parentMenu = childMenu.closest(`ul[data-sub="${--numSub}"]`);
                    childMenu.style.top = '-2px';
                    childMenu.style.left = Number(parentMenu.clientWidth) + 'px';
                    for (let i = 0; i < parentMenu.children.length; i++) {
                        console.log(i);
                        let elem = parentMenu.childNodes[i].nextElementSibling;
                        let attr = Number(elem.getAttribute('data-menu-dropdown'));
                        let marginTopChildrenEl = 0;
                        if (attr){
                            marginTopChildrenEl += ((elem.clientHeight * i) - 2);

                            //ТУТ ЗАСТРЯЯЯЯЛ
                            console.log(parentMenu.querySelector('li').innerText);
                        }
                        childMenu.style.top = marginTopChildrenEl + 'px';
                    }
                }
                showChildMenu(childMenu);

                childMenu.onmouseleave = () => {
                    document.addEventListener('click', ({target}) => {
                        if (!target.closest('nav')){
                            hideChildMenu(childMenu);
                        }
                    });
                    if (childMenu.getAttribute('data-visible') <= 0){
                        hideChildMenu(childMenu);
                    }
                };
                childMenu.onmouseover = () => {
                    showChildMenu(childMenu);
                };
            }
        }
    });
}

menu('li.menu-item', 'click');
menu('li.menu-item', 'mouseover');