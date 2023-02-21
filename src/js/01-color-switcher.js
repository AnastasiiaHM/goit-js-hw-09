const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let startChangeColorBody = null;

start.addEventListener('click', handleClickButtonStart);
stop.addEventListener('click', handleClickButtonStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function handleClickButtonStart() {
  startChangeColorBody = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleClickButtonStop() {
  clearInterval(startChangeColorBody);
  start.removeAttribute('disabled');
}
