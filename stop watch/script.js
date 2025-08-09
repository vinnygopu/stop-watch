let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapStart = 0;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const mins = String(date.getUTCMinutes()).padStart(2, "0");
  const secs = String(date.getUTCSeconds()).padStart(2, "0");
  const millis = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${mins}:${secs}.${millis}`;
}

function updateTime() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;
  display.textContent = formatTime(difference);
}

function startStop() {
  if (!running) {
    startTime = Date.now() - difference;
    lapStart = difference;
    timerInterval = setInterval(updateTime, 50);
    running = true;
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  startTime = 0;
  difference = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
}

function lap() {
  if (!running) return;

  const now = Date.now();
  const totalElapsed = now - startTime;
  const lapTime = totalElapsed - lapStart;
  lapStart = totalElapsed;

  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapsList.children.length + 1}</span><span>${formatTime(totalElapsed)} (+${formatTime(lapTime)})</span>`;
  lapsList.prepend(li);
}
