import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.getElementById("notificationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('[name="delay"]');
  const stateInput = document.querySelector('[name="state"]:checked');

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput ? stateInput.value : null;

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid positive delay value.',
      position: 'topRight',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
      
        message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
         icon: false,
      });
    })
    .catch((delay) => {
      iziToast.error({
       
        message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
         icon: false,
      });
    });
});
