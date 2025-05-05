// timerWorker.js
let timer;

// Function to start the timer
function startTimer(interval) {
    timer = setTimeout(() => {
        postMessage('tick');
    }, interval);
}

// Function to stop the timer
function stopTimer() {
    clearTimeout(timer);
}

// Listen for messages from the main thread
self.addEventListener('message', function(e) {
    const { command, interval } = e.data;
    if (command === 'start') {
        startTimer(interval);
    } else if (command === 'stop') {
        stopTimer();
    }
});