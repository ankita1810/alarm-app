const startTimerBtn = document.getElementById("start-timer-btn");
const activeTimersSection = document.getElementById("active-timers");
const timerEndDisplay = document.getElementById("timer-end-display");
const timerAlert = document.getElementById("timer-alert");

let timers = [];

startTimerBtn.addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalTimeInSeconds > 0) {
    const timer = {
      totalTime: totalTimeInSeconds,
      timeLeft: totalTimeInSeconds,
      intervalId: setInterval(() => {
        timer.timeLeft--;
        if (timer.timeLeft === 0) {
          clearInterval(timer.intervalId);
          timerEndDisplay.innerHTML = `Timer Is Up!.`;
          timerAlert.play();
          setTimeout(() => {
            timerEndDisplay.innerHTML = "";
          }, 5000);
        }
        displayActiveTimers();
      }, 1000),
    };

    timers.push(timer);
    displayActiveTimers();
  }
});

function displayActiveTimers() {
  activeTimersSection.innerHTML = "";
  timers.forEach((timer, index) => {
    const timerDiv = document.createElement("div");
    timerDiv.innerText = `Timer ${index + 1}: ${formatTime(timer.timeLeft)}`;
    activeTimersSection.appendChild(timerDiv);
  });
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
