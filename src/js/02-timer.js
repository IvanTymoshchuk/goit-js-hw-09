/*
Завдання 2 - таймер зворотного відліку
Виконуй це завдання у файлах 02-timer.html і 02-timer.js. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
Елементи інтерфейсу
HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

Бібліотека flatpickr
Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.

<input type="text" id="datetime-picker" />

Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

Вибір дати
Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
Відлік часу
Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

Кількість днів може складатися з більше, ніж двох цифр.
Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
НЕ БУДЕМО УСКЛАДНЮВАТИ
Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.

Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

Форматування часу
Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

Бібліотека повідомлень
УВАГА
Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
*/

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
//
import Notiflix from 'notiflix';


const dateTimePicker = document.getElementById('datetime-picker');
const strBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minField = document.querySelector('[data-minutes]');
const secField = document.querySelector('[data-seconds]');

let countInterval = null;
let targetDate = null;


Notiflix.Report.info(
    ' 🤟🏼 Hello my Friend!',
    'Please, choose a date and click on start',
    'Okay'
  );

const upTime = () => {
  const currentDate = new Date();
  const remTime = targetDate - currentDate;

  if (remTime < 0) {
    clearInterval(countInterval);
    strBtn.disabled = true;
    dateTimePicker.disabled = false;
    Notiflix.Report.info(
      'Info',
      'Please choose a date in the future',
      'Okey'
    );
    return;
  }

  const days = Math.floor(remTime / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((remTime / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remTime / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((remTime / 1000) % 60)
    .toString()
    .padStart(2, '0');

  daysField.textContent = days;
  hoursField.textContent = hours;
  minField.textContent = minutes;
  secField.textContent = seconds;
};

const strCount = () => {
  targetDate = new Date(dateTimePicker.value);
  countInterval = setInterval(upTime, 1000);
  strBtn.disabled = true;
  dateTimePicker.disabled = true;
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      Notiflix.Report.failure(
        'Oppss...🧟‍♂️',
        'Please choose a date in the future',
        'Try again'
      );
      strBtn.disabled = true;
    } else {
      Notiflix.Report.success(
        'Great 😎',
        'The selected date is in the future. Click `Start` to continue',
        'Start'
      );
      strBtn.disabled = false;
    }
  },
});

strBtn.addEventListener('click', strCount);

// ------ next variant -------------------------------------------------------

// const calendar = document.querySelector('#datetime-picker');
// const startBtn = document.querySelector('[data-start-timer]');
// startBtn.disabled = true;

// Notiflix.Report.info(
//   '👋 Greeting, my Friend!',
//   'Please, choose a date and click on start',
//   'Okay'
// );

// flatpickr(calendar, {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       Notiflix.Report.failure(
//         '🥺 Ooops...',
//         'Please, choose a date in the future and remember: "Knowledge rests not upon truth alone, but upon error also." - Carl Gustav Jung',
//         'Okay'
//       );
//     } else {
//       Notiflix.Report.success(
//         '🥰 Congratulation! Click on start!',
//         '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
//         'Okay'
//       );
//       startBtn.disabled = false;
//       const setTimer = () => {
//         selectedDate = selectedDates[0].getTime();
//         timer.start();
//       };

//       startBtn.addEventListener('click', setTimer);
//     }
//   },
// });

// const timer = {
//   rootSelector: document.querySelector('.timer'),
//   start() {
//     intervalId = setInterval(() => {
//       startBtn.disabled = true;
//       calendar.disabled = true;
//       currentDate = Date.now();
//       const delta = selectedDate - currentDate;

//       if (delta <= 0) {
//         this.stop();
//         Report.info(
//           '👏 Congratulation! Timer stopped!',
//           'Please, if you want to start timer, choose a date and click on start or reload this page',
//           'Okay'
//         );
//         return;
//       }
//       const { days, hours, minutes, seconds } = this.convertMs(delta);
//       this.rootSelector.querySelector('[data-days]').textContent =
//         this.addLeadingZero(days);
//       this.rootSelector.querySelector('[data-hours]').textContent =
//         this.addLeadingZero(hours);
//       this.rootSelector.querySelector('[data-minutes]').textContent =
//         this.addLeadingZero(minutes);
//       this.rootSelector.querySelector('[data-seconds]').textContent =
//         this.addLeadingZero(seconds);
//     }, TIMER_DELAY);
//   },

//   stop() {
//     clearInterval(intervalId);
//     this.intervalId = null;
//     startBtn.disabled = true;
//     calendar.disabled = false;
//   },

//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = this.addLeadingZero(Math.floor(ms / day));
//     const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
//     const minutes = this.addLeadingZero(
//       Math.floor(((ms % day) % hour) / minute)
//     );
//     const seconds = this.addLeadingZero(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );

//     return { days, hours, minutes, seconds };
//   },

//   addLeadingZero(value) {
//     return String(value).padStart(2, 0);
//   },
// };
