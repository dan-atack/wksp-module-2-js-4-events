// Timer App:

// Since we want it to count backwards and remember how much time remains when it's paused or resumed, we'll just reverse engineer the stopwatch app and never use setTimeout at all!

let timeRemaining = 10;                     // time Remaining variable is created now and will be modified by the input receiver function.

function startTimer() {                     // startTimer function will use setInterval to count backwards from the absolute time variable.
    timerPaused = false;                    // swStopped becomes false when the stopwatch runs (kind of a double negative but it's useful for the stop switch).
    let timerRunning = setInterval(() => {
        timeRemaining -= 1;                  // When timer is running, time Remaining decreases by 1 per second
        let sec = (timeRemaining % 60);                      // Seconds are the remainder of time remaining divided by 60...
        sec = ("0" + sec).slice(-2);                        // Two-digit guarantor: The ol' concat-n-slice!
        let min = ((Math.floor(timeRemaining/60)) % 60);     // Minutes are the remainder of (time remaining divided by 60) divided by 60...
        min = ("0" + min).slice(-2);
        let hour = ((Math.floor(timeRemaining/3600)) % 24);  // Hours are the remainder of (time remaining divided by 3600) divided by 24...
        hour = ("0" + hour).slice(-2);
        document.getElementById("timerDisplay").innerText = `${hour}:${min}:${sec}`;  // Put hours, mins, and secs in order and make that the value of the display element
        if (timerPaused) {                                    // The function doesn't run if timerPaused is true
            clearInterval(timerRunning);
            console.log("timer stopped");
        }
    }, 100);  // Increments are in values of 100ms at the moment, for convenience during testing.
};