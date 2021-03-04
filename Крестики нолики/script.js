'use strict';

const gameContainer = document.getElementById('game');
const gameContainerWidth = gameContainer.clientWidth;
const gameContainerHeight = gameContainer.clientHeight;

let stepCount = 9;
let gamer = true;
let winner = null;
let arrTotal = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

for (let i = 0; i < stepCount; i++) {
    let div = document.createElement('div');
    div.classList.add('box');
    div.setAttribute('x', (i % 3).toString());
    div.setAttribute('y', parseInt(i / 3).toString());
    div.style.width = (gameContainerWidth / 3) - 4 + 'px';
    div.style.height = (gameContainerHeight / 3) - 4 + 'px';
    gameContainer.append(div);
}

addEventListener('click', ({target}) => {
    let el = target.closest('div[class^="box"]');
    if (el){
        el.innerHTML = gamer ? '<img src="https://clck.ru/T3D6h">' : '<img src="https://clck.ru/T3D6y">';
        let y = el.getAttribute('y'), x = el.getAttribute('x');
        arrTotal[y][x] = gamer;
        stepCount--;
        if (
            (arrTotal[y][0] === gamer && arrTotal[y][1] === gamer && arrTotal[y][2] === gamer) ||
            (arrTotal[0][x] === gamer && arrTotal[1][x] === gamer && arrTotal[2][x] === gamer) ||
            (arrTotal[0][0] === gamer && arrTotal[1][1] === gamer && arrTotal[2][2] === gamer) ||
            (arrTotal[2][0] === gamer && arrTotal[1][1] === gamer && arrTotal[0][2] === gamer)) {
            winner = gamer;
        }
        gamer = !gamer;
        if (stepCount === 0 || winner !== null) {
            if (winner !== null) {
                if (confirm('Разъебал' + (winner ? ' хуй!!!' : 'а пизда!!!') + '.\nПовторим?')) {
                    reset();
                }
            }
            else if (confirm('Оба в проёбе..\nПовторим?')) {
                reset();
            }
        }
    }
});
function reset() {
    stepCount = 9;
    gamer = true;
    winner = null;
    arrTotal = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    let box = gameContainer.getElementsByClassName('box');
    for (let i = 0; i < box.length; i++) {
        box[i].innerText = '';
    }
}
