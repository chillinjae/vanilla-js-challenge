const body = document.querySelector("body");
const image = new Image();

const IMG_NUMBER = 8;

function renderImage(imgNumber) {
    image.src = `images/0${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    image.style.visibility = "hidden";
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function CheckIsLoaded() {
    if (image.complete) image.style.visibility = "visible";
}

function init() {
    const randomNumber = genRandom();
    renderImage(randomNumber);
    intervalID = setInterval(CheckIsLoaded, 0);
}

init();
