 import flatpickr from "flatpickr";
import iziToast from "izitoast/dist/js/iziToast"; 
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

// Функція для додавання ведучого нуля, якщо число < 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для перетворення мілісекунд в об'єкт часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Опції для бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const userSelectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');

    if (userSelectedDate < new Date()) {
      // Обрано дату в минулому
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      // Обрано валідну дату в майбутньому
      startButton.disabled = false;
    }

    // Видаляємо обробник click, якщо він вже прикріплений
    startButton.removeEventListener('click', handleStartClick);

    // Призначаємо обробник click
    startButton.addEventListener('click', handleStartClick);
  },
};

// Ініціалізація flatpickr
flatpickr("#datetime-picker", options);

// Оголошення змінної для інтервалу таймера
let timerInterval;

// Функція обробки натискання на кнопку "Start"
function handleStartClick() {
  const selectedDate = new Date(document.querySelector('#datetime-picker').value);
  const currentTime = new Date();
  let timeDifference = selectedDate.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    // Досягнуто кінцевої дати
    iziToast.success({
      title: 'Success',
      message: 'Countdown timer reached the end!',
    });
  } else {
    // Запуск таймера
    updateTimerDisplay(timeDifference);
    timerInterval = setInterval(() => {
      timeDifference -= 1000;
      if (timeDifference <= 0) {
        // Зупинка таймера при досягненні кінцевої дати
        clearInterval(timerInterval);
        iziToast.success({
          title: 'Success',
          message: 'Countdown timer reached the end!',
        });
        // Після завершення таймера вимикаємо кнопку
        document.querySelector('[data-start]').disabled = true;
      } else {
        // Оновлення відображення таймера
        updateTimerDisplay(timeDifference);
      }
    }, 1000);

    // Вимикаємо кнопку після натискання
    document.querySelector('[data-start]').disabled = true;
  }
}

// Функція оновлення відображення таймера
function updateTimerDisplay(ms) {
  const time = convertMs(ms);
  document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
}













 