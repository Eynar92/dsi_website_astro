const paragraph = document.querySelector('.description');
// const span = document.querySelector('.information__span');
const background = document.querySelector('.slider__background');
const arrowLeft = document.querySelector('.arrow__left')
const arrowRight = document.querySelector('.arrow__right')

import { heroData } from "../data/heroData";

let id = 0;

function slide(id) {
    background.style.backgroundImage = `url(${heroData[id].img})`;
    background.classList.add('image-fade');
    paragraph.classList.add('image-fade');

    setTimeout(() => {
        background.classList.remove('image-fade');
        paragraph.classList.remove('image-fade');
    }, 500);

    paragraph.innerText = heroData[id].description;
}

//Funciona el slider, se debe acomodar a los parámetros reales para poder tener el slider funcionando
//Flata implementar las transiciones en css y aumentar los botones

arrowLeft.addEventListener('click', () => {
    id--;
    if (id < 0) {
        id = heroData.length - 1;
    }
    console.log(id);
    slide(id);
});

arrowRight.addEventListener('click', () => {
    id++;
    if (id > heroData.length - 1) {
        id = 0;
    }
    console.log(id);
    slide(id);
})