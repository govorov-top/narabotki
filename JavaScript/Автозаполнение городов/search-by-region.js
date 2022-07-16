'use strict';
document.addEventListener('DOMContentLoaded', () => {
    let findToArray = function (arr, find) {
        return arr.filter(function (value) {
            return (value + "").toLowerCase().indexOf(find.toLowerCase()) !== -1;
        });
    };
    addEventListener('click', ({target}) => {
        const el = target.closest('input[name="region"]');
        if (el){
            const container = el.closest('.box-regions');
            let inputCityUser = document.querySelector('input[type="text"]'),
                regionList = container.querySelector('.regions');
            const url = 'regions.json';
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.responseType = 'json';
            request.send();
            request.onload = function() {
                inputCityUser.addEventListener('keyup', function() {
                    let userRegion = el.value.replace(/^.|\s\S/g, l => l.toUpperCase());
                    if (userRegion.length >= 3) {
                        let result = '';
                        let item = request.response;
                        for (let i = 0; i < item.length; i++) {
                            for (let key in item[i]) {
                                if (item[i][key].indexOf(userRegion) !== -1) {
                                    result += `<div class='elem-reg' data-id-region="${item[i]['ID']}">${item[i]['ID']} - ${item[i]['REGION']}</div>`;
                                }
                            }
                        }
                        regionList.innerHTML = result;
                        container.querySelector('.regions').style.display = 'block';
                    }
                });
            };
        }
        const changeReg = target.closest('div.elem-reg');
        if (changeReg){
            changeReg.closest('.box-regions').querySelector('input').value = changeReg.innerHTML.replace(/\d.*-\s/g,'');
            changeReg.closest('.box-regions').querySelector('.regions').style.display = 'none'
        }
    });
});