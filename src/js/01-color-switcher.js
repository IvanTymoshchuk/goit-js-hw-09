const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingColor() {
startButton.disabled = true; // вимикаємо кнопку Start
intervalId = setInterval(() => {
document.body.style.backgroundColor = getRandomHexColor();
}, 1500);
}

function stopChangingColor() {
startButton.disabled = false; // включаємо кнопку Start
clearInterval(intervalId);
}

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);

