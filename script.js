let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let lapCounter = 1;
let interval;

function startStop() {
  const startStopButton = document.getElementById("startStop");
  if (isRunning) {
    isRunning = false;
    startStopButton.textContent = "Start";
    clearInterval(interval);
  } else {
    isRunning = true;
    startStopButton.textContent = "Stop";
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
  }
}

function recordLap() {
  if (isRunning) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    lapTimes.push(lapTime);
    const lapsContainer = document.getElementById("laps");
    const lapElement = document.createElement("div");
    lapElement.classList.add("lapTime");
    lapElement.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
    lapsContainer.appendChild(lapElement);
    lapCounter++;
  }
}

function reset() {
  isRunning = false;
  lapCounter = 1;
  lapTimes = [];
  clearInterval(interval);
  const startStopButton = document.getElementById("startStop");
  startStopButton.textContent = "Start";
  const display = document.getElementById("display");
  display.textContent = "00:00:00.000";
  const lapsContainer = document.getElementById("laps");
  lapsContainer.innerHTML = "";
  elapsedTime = 0;
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const display = document.getElementById("display");
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return (
    `${hours.toString().padStart(2, "0")}:` +
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`
  );
}
