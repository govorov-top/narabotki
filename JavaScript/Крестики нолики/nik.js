'use strict';

const gameContainer = document.getElementById('game');
const gameContainerWidth = gameContainer.clientWidth;
const gameContainerHeight = gameContainer.clientHeight;

let x = new Array(new Array(),new Array(),new Array());
let o = [[null],[null],[null]]

console.log(typeof x);

let game = {
    x : {
        obj1 : [],
        obj2 : [],
        obj3 : [],
        obj4 : [],
        obj5 : [],
        obj6 : [],
        obj7 : [],
        obj8 : [],
        obj9 : [],
    },
    o : {
        obj1 : [],
        obj2 : [],
        obj3 : [],
        obj4 : [],
        obj5 : [],
        obj6 : [],
        obj7 : [],
        obj8 : [],
        obj9 : [],
    },
}

let step = true;
let inc = 0;
let arrTotal = {
    x: [],
    o: []
};

let div;
for (let i = 0; i < 3; i++) {
    for(let e = 0; e < 3; e++){
        div = document.createElement('div');
        div.classList.add('box');
        div.setAttribute('data-col',  String(i));
        div.setAttribute('data-row',  String(e));
        div.style.width = (gameContainerWidth / 3) - 4 + 'px';
        div.style.height = (gameContainerHeight / 3) - 4 + 'px';
        gameContainer.append(div);
    }
}

addEventListener('click', ({target}) => {
    let el = target.closest('div[class^="box"]');
    if (el){
        let elAttr = Number(el.getAttribute('data-num')) + 1;
        if(step){
            setTarget(el,'x');
        }
        else{
            setTarget(el,'o');
        }
    }

});

function setTarget(el, index){
    if (!el.innerText){
        el.innerText = index;
        if (index === 'x'){
            x[el.getAttribute('data-col')][el.getAttribute('data-row')].push(index);
            console.log(x);
            arrTotal.x.push(elAttr);
            arrTotal.x.sort((a, b) => {return a - b});
        }else {
            o[el.getAttribute('data-col')][el.getAttribute('data-row')].push(index);
            arrTotal.o.push(elAttr);
            arrTotal.o.sort((a, b) => {return a - b});
            console.log(o);
        }
        step = !step;
        inc++;
        console.log(arrTotal);
    }else {
        return false;
    }
}
