import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  if (delay <= 0 || step < 0 || amount < 0) {
    return Notiflix.Report.warning(
      'Opsss....🧟‍♂️',
      'The number must be greater than 0',
      'Try again'
    );
  }

  for (let i = 0; i < amount; i += 0) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}

// ------- next variant ------------------------------------------------------------

// const form = document.querySelector('form.form');
// form.addEventListener('click', onPromiseCreate);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function onPromiseCreate(e) {
//   e.preventDefault();
//   const { delay, step, amount } = e.currentTarget.elements;
//   let inputDelay = Number(delay.value);
//   let inputStep = Number(step.value);
//   let inputAmount = Number(amount.value);

//   for (let i = 1; i <= inputAmount; i += 1) {
//     inputDelay += inputStep;

//     createPromise(i, inputDelay)
//       .then(({ position, delay }) => {
//         Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//     e.currentTarget.reset();
//   }
// }