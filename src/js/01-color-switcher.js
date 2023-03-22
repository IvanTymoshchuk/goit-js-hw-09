/*
Завдання 1 - перемикач кольорів
Виконуй це завдання у файлах 01-color-switcher.html і 01-color-switcher.js. 
HTML містить кнопки «Start» і «Stop».

<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>

Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

УВАГА
Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

Для генерування випадкового кольору використовуй функцію getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
*/


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

