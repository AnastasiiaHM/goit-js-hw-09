import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../../node_modules/notiflix/dist/notiflix-3.2.6.min.css';

const formElement = document.querySelector('.form');
const delayElement = document.querySelector('[name="delay"]');
const stepElement = document.querySelector('[name="step"]');
const amountElement = document.querySelector('[name="amount"]');

function handleSubmitFofm(event) {
  event.preventDefault();
  const delay = Number(delayElement.value);
  const step = Number(stepElement.value);
  const amount = Number(amountElement.value);

  let position = 0;
  for (let i = 0; i <= amount; i += 1) {
    let usersTime = delay + i * step;
    position += 1;
    const promise = createPromise(position, usersTime);

    promise
      .then(success => {
        Notify.success(success);
      })
      .catch(error => {
        Notify.failure(error);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve`✅ Fulfilled promise ${position} in ${delay}ms`;
      }
      reject`❌ Rejected promise ${position} in ${delay}ms`;
    }, delay);
  });
}

formElement.addEventListener('submit', handleSubmitFofm);
