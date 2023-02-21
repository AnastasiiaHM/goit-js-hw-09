import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../../node_modules/notiflix/dist/notiflix-3.2.6.min.css';

const buttonStart = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
buttonStart.setAttribute('disabled', true);
class Timer {
  constructor({ onTick }) {
    this.usersChosenData = null;
    this.intervalId = null;
    this.disabled = false;
    this.onTick = onTick;
  }

  start() {
    if (this.disabled) {
      return;
    }
    this.intervalId = setInterval(() => {
      const dateNow = Date.now();
      const startTimerTime = this.usersChosenData - dateNow;
      if (startTimerTime < 1000) {
        this.stop();
      }
      const timerTime = convertMs(startTimerTime);

      this.onTick(timerTime);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    buttonStart.removeAttribute('disabled');
    this.onTick(convertMs(0));
  }
}

const timerFromClass = new Timer({
  onTick: updateClockFace,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const usersTime = selectedDates[0].getTime();
    if (usersTime <= Date.now()) {
      buttonStart.setAttribute('disabled', true);
      Notify.warning('Please choose a date in the future');
      return;
    }
    buttonStart.removeAttribute('disabled');
    timerFromClass.usersChosenData = usersTime;
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  daysSpan.textContent = `${days}`;
  hoursSpan.textContent = `${hours}`;
  minutesSpan.textContent = `${minutes}`;
  secondsSpan.textContent = `${seconds}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timerId = flatpickr('#datetime-picker', options);

buttonStart.addEventListener('click', () => {
  timerFromClass.start();
  buttonStart.setAttribute('disabled', true);
});
