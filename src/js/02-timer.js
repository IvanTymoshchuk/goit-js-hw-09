/*
Завдання 2 - таймер зворотного відліку
Виконуй це завдання у файлах 02-timer.html і 02-timer.js. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
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
