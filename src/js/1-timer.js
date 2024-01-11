 import flatpickr from "flatpickr";
import iziToast from "izitoast/dist/js/iziToast"; 
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}


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


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const userSelectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');

    if (userSelectedDate < new Date()) {
     
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
     
      startButton.disabled = false;
    }

    
    startButton.removeEventListener('click', handleStartClick);

  
    startButton.addEventListener('click', handleStartClick);
  },
};


flatpickr("#datetime-picker", options);


let timerInterval;


function handleStartClick() {
  const selectedDate = new Date(document.querySelector('#datetime-picker').value);
  const currentTime = new Date();
  let timeDifference = selectedDate.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
   
    iziToast.success({
      title: 'Success',
      message: 'Countdown timer reached the end!',
    });
  } else {
   
    updateTimerDisplay(timeDifference);
    timerInterval = setInterval(() => {
      timeDifference -= 1000;
      if (timeDifference <= 0) {
        
        clearInterval(timerInterval);
        iziToast.success({
          title: 'Success',
          message: 'Countdown timer reached the end!',
        });
        
        document.querySelector('[data-start]').disabled = true;
      } else {
       
        updateTimerDisplay(timeDifference);
      }
    }, 1000);

   
    document.querySelector('[data-start]').disabled = true;
  }
}


function updateTimerDisplay(ms) {
  const time = convertMs(ms);
  document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
}













 