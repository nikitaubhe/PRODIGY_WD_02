let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    running = true;
    startTime = new Date().getTime();
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Pause';
    lapBtn.disabled = false;
}

function stopStopwatch() {
    running = false;
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    running = false;
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCount = 0;
    lapBtn.disabled = true;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    lapCount++;
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapItem);
}
