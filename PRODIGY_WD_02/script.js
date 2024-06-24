let isRunning = false;
let startTime;
let interval;
let lapStartTime;
let lapInterval;
let lapCounter = 1;
let pausedTime = 0;
let lapPausedTime = 0;

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    clearInterval(lapInterval);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("lapReset").textContent = "Reset";
    document.getElementById("startStop").style.backgroundColor = "";
    document.getElementById("lapReset").style.backgroundColor = "red";
    pausedTime = new Date() - startTime;
    lapPausedTime = new Date() - lapStartTime;
  } else {
    startTime = new Date() - (pausedTime ? pausedTime : 0);
    interval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("startStop").style.backgroundColor = "red";
    document.getElementById("lapReset").style.backgroundColor = "";

    if (lapStartTime) {
      lapStartTime = new Date() - (lapPausedTime ? lapPausedTime : 0);
      lapInterval = setInterval(updateLapTime, 10);
    } else {
      lapStartTime = new Date();
      lapInterval = setInterval(updateLapTime, 10);
    }
  }
  isRunning = !isRunning;
}

function lapReset() {
  if (isRunning) {
    const lapList = document.getElementById("lapList");
    const lapTime = calculateLapTime();
    const listItem = document.createElement("li");
    listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(listItem);
    lapCounter++;
  } else {
    clearInterval(interval);
    clearInterval(lapInterval);
    document.getElementById("display").textContent = "00:00:00.00";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("lapList").innerHTML = "";
    document.getElementById("lapReset").style.backgroundColor = "";
    isRunning = false;
    startTime = null;
    lapStartTime = null;
    pausedTime = 0;
    lapPausedTime = 0;
    lapCounter = 1;
  }
}

function updateTime() {
  const currentTime = new Date() - startTime;
  updateDisplay(currentTime, "display");
}

function updateLapTime() {
  const currentTime = new Date() - lapStartTime;
  updateDisplay(currentTime, "lapDisplay");
}

function calculateLapTime() {
  const currentTime = new Date() - lapStartTime;
  return formatTime(currentTime);
}

function updateDisplay(time, displayId) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);

  const timeString = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds)
    .padStart(3, "0")
    .slice(0, 2)}`;

  document.getElementById(displayId).textContent = timeString;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}.${String(milliseconds)
    .padStart(3, "0")
    .slice(0, 2)}`;
}
