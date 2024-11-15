let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

function startStop() {
    const startStopBtn = document.getElementById("startStopBtn");
    const lapBtn = document.getElementById("lapBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = "Start";
        isRunning = false;
    } else {
        // Start the timer
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    }
}

function updateTime() {
    const display = document.getElementById("display");
    const currentTime = Date.now();
    const timeElapsed = elapsedTime + (currentTime - startTime);

    const milliseconds = Math.floor(timeElapsed % 1000);
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${hours ? String(hours).padStart(2, "0") + ":" : ""}` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}.` +
        `${String(milliseconds).padStart(3, "0")}`;
}

function lapTime() {
    const lapList = document.getElementById("lapList");
    const display = document.getElementById("display");
    lapCounter++;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${display.textContent}`;
    lapList.appendChild(lapItem);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;

    document.getElementById("display").textContent = "00:00:00.000";
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("lapList").innerHTML = "";
}
