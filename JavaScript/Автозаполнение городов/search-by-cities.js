'use strict';
document.addEventListener('DOMContentLoaded', () => {
    addEventListener('click', ({target}) => {
        const el = target.closest('input[name="region"]');
        if (el){
            const container = el.closest('.box-regions');
            ymaps.ready(init);
            function init() {
                let inputCityUser = document.querySelector('input[type="text"]');
                inputCityUser.addEventListener('keyup', function() {
                    ymaps.suggest(el.value).then(function (items) {
                        if (items){
                            let regionList = container.querySelector('.regions'), result = '';
                            for (let key in items) {
                                result += '<div class="elem-reg">' + items[key].displayName + '</div>';
                            }
                            regionList.innerHTML = result;
                            container.querySelector('.regions').style.display = 'block';
                        }
                    });
                });
            }
        }
        const changeReg = target.closest('div.elem-reg');
        if (changeReg){
            changeReg.closest('.box-regions').querySelector('input').value = changeReg.innerHTML;
            changeReg.closest('.box-regions').querySelector('.regions').style.display = 'none'
        }
    });
});