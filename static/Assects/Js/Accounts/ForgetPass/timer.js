const SendOTP = document.getElementById('SendOTP');
const ResendOTP = document.getElementById('resend_OTP');
const timerDisplay = document.getElementById('timer');

let countdown;
let targetTime = 0;
let countdownStarted = false;

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
  }


function startCountdown() {
    if (!countdownStarted) {
        countdownStarted = true;
        const currentTime = Date.now();
        targetTime = currentTime + 3 * 60 * 1000; // 3 মিনিটের মিলিসেকেন্ড
    }

    clearInterval(countdown); // আগের টাইমার বন্ধ করুন

    countdown = setInterval(() => {
        const remainingTime = targetTime - Date.now();

        if (remainingTime <= 0) {
            clearInterval(countdown);
            updateTimerDisplay(0);
            countdownStarted = false;
            return;
        }

        updateTimerDisplay(remainingTime);
    }, 1000);
}

function resetCountdown() {
    countdownStarted = true;
    updateTimerDisplay(3 * 60 * 1000); // পুনরায় 3 মিনিট সেট করুন
    const restTime = Date.now();
    targetTime = restTime + 3 * 60 * 1000;
  
    clearInterval(countdown);
    countdown = setInterval(() => {
      const remainingTime = targetTime - Date.now();
  
      if (remainingTime <= 0) {
        clearInterval(countdown);
        updateTimerDisplay(0);
        countdownStarted = false;
        return;
      }
  
      updateTimerDisplay(remainingTime);
    }, 1000);
  }

// SendOTP.addEventListener('click', startCountdown);

startCountdown()
ResendOTP.addEventListener('click', resetCountdown);