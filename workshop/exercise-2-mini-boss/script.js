// Section Zero: Setup connections to html elements:

const body = document.querySelector("body");
const title = document.querySelector("h1");
const currentTime = document.getElementById("currentTime");
const freezer = document.getElementById("freeze");
const swDisplay = document.getElementById("display");
const swStart = document.getElementById("start");
const swStop = document.getElementById("stop");
const tInput = document.getElementById("countdown");
const tButton = document.getElementById("timerstart");
const tDisplay = document.getElementById("timerDisplay");
const tReset = document.getElementById("reset");
const explanation = document.querySelector(".explanatory");
const p2 = document.getElementById("p2");
const audio = document.getElementById("mars");

// Section Zero - B: Basic Styling Stuff

tInput.style.width = "5%";              // Little CSS touchup here just because.
explanation.style.width = "412px";
title.style.maxWidth = "50%";
p2.style.width = "360px";
tButton.style.width = "74px";
explanation.style.maxWidth = "40%";

// Section Zero - C: Define global variables: Toggle switches for the major timer functions.

let frozen = false;         // This will let the user freeze the current time display. This is false, so the real-time clock starts automatically when the page is opened.
let swStopped = true;       // This means that, unlike the regular clock, the stopwatch is in the 'stopped' position when the page loads.
let timerPaused = true;     // The timer also begins in the stopped state.

// Section One: The Clock

function currentTimeRefresher() {                       // By default this will run when the page is opened and refresh the time once per second:
	let inter = setInterval(() => {
        currentTime.style.backgroundColor = "white";    // This changes when you "freeze" time (which is an option in the latest version).
		let time = new Date();                          // First use of the "new" keyword!
        let hour = time.getHours();                     // From the date object, get hours.
        hour = ("0"+hour).slice(-2);                    // Here's a handy trick I found on stack overflow to ensure your time values are always 2-digit numbers.
        let min = time.getMinutes();                    // Get minutes...
        min = ("0"+min).slice(-2);
        let sec = time.getSeconds();                    // ... and seconds!
        sec = ("0"+sec).slice(-2);
        let timeString = `${hour} : ${min} : ${sec}`;               // Combine these values into a single string
        currentTime.innerText = timeString;                         // Feed this string into the currentTime element
        if (frozen) {                                               // If the frozen value is set to true,
            clearInterval(inter);                                   // stop the clock from refreshing
            currentTime.style.backgroundColor = "lightblue";        // time string's background turns blue if time is frozen
	}
}, 1000);       // Refresh every thousand milliseconds
};

function freezeTime() {         // This makes the Freeze Time button into a toggle switch - you can pause time!!!
    if (frozen) {               // If time is frozen,
        frozen = false;         // unfreeze it
        currentTimeRefresher(); // and restart the time refresher function
    } else {                    // if time isn't frozen,
        frozen = true;          // freeze it (this stops the time refresher)
    }
};

currentTimeRefresher();         // run time refresher function automatically when page loads

// Section Two: The Stop Watch

let absoluteTime = 0;            // Absolute time increases by intervals of 1000ms; broken down within the stopwatch function into increments of sec/min/hour.

function stopWatch() {           // Stopwatch function contains the setInterval function; is called indirectly by the swStart function, so that multiple button presses don't #$%^ it up!
    let running = setInterval(() => {
        absoluteTime += 1;       // When stopwatch is running, absolute time increases by 1 per second
        let sec = (absoluteTime % 60);                      // Seconds are the remainder of absolute time divided by 60...
        sec = ("0" + sec).slice(-2);                        // Two-digit guarantor: The ol' concat-n-slice!
        let min = ((Math.floor(absoluteTime/60)) % 60);     // Minutes are the remainder of (absolute time divided by 60) divided by 60...
        min = ("0" + min).slice(-2);
        let hour = ((Math.floor(absoluteTime/3600)) % 24);  // Hours are the remainder of (absolute time divided by 3600) divided by 24...
        hour = ("0" + hour).slice(-2);
        swDisplay.innerText = `${hour}:${min}:${sec}`;  // Put hours, mins, and secs in order and make that the value of the display element
        if (swStopped) {                                    // The function doesn't run if swStopped is true
            clearInterval(running);
            console.log("stopped");
        }
    }, 1000);
};

function startSW() {                // The Start button only works if swStopped is true (no double start shenanigans!)
    if (swStopped) {
        swStopped = false; 
        stopWatch();
    }
};

function haltSW() {                 // The Stop button stops the function if it's running; if it isn't running, it resets the count to zero:
    if (swStopped) {                // If stopwatch is NOT running,
        absoluteTime = 0;           // If you hit stop while the stopwatch is already stopped it resets the stopwatch's count.
        swDisplay.innerText = "00:00:00";
    } else {                    
        swStopped = true;           // If you're hitting the Stop button while the watch is running (Stopped = false; gotta love them double-negatives!) it stops it and keeps the value counted off.
    }
};

// Section Three: The Countdown Timer

/*

Components:

TimerInput
TimerStart Function: Counts down from a given amount of seconds.

*/

function startTimer(timeLeft) {                     // startTimer function will use setInterval to count backwards from the absolute time variable.
    countDownFrom = timeLeft;
    timerPaused = false;                    // swStopped becomes false when the stopwatch runs (kind of a double negative but it's useful for the stop switch).
    let timerRunning = setInterval(() => {
        if (!timerPaused) {
            countDownFrom -= 1;                  // When timer is running, time Remaining decreases by 1 per second
        let sec = (countDownFrom % 60);                      // Seconds are the remainder of time remaining divided by 60...
        sec = ("0" + sec).slice(-2);                        // Two-digit guarantor: The ol' concat-n-slice!
        let min = ((Math.floor(countDownFrom/60)) % 60);     // Minutes are the remainder of (time remaining divided by 60) divided by 60...
        min = ("0" + min).slice(-2);
        tDisplay.innerText = `${min}:${sec}`;  // Put hours, mins, and secs in order and make that the value of the display element
        }
        if (timerPaused) {                                    // The function doesn't run if timerPaused is true
            clearInterval(timerRunning);
            console.log("timer paused.");
        } else if (countDownFrom === 0) {                     // If the timer reaches zero,
            clearInterval(timerRunning);                      // Stop the countdown sequence,
            tDisplay.style.backgroundColor = "red";           // Turn the display area red,
            console.log("timer expired!")                     // In the console, tell us the timer has expired...
            audio.play();                                     // ... And listen to what Arnold says!
        }
    }, 1000);  // Increments are in values of 100ms at the moment, for convenience during testing.
};

let countDownFrom = 0;         // This global variable will be changed by the input funtion, then used by the timerToggle function.... QUESTION: Given that I want the variable to always exist so that either function can modify it, is it necessary to introduce this variable on the global level, or is it possible to introduce it in, say, the input function since that's presumably what's going to be used first?

function timerToggle() {                     // Toggle switch for timer function
    if (timerPaused && (countDownFrom > 0)) {                       // if timer is paused,
        startTimer(countDownFrom);           // start the timer
        tButton.innerText = "PAUSE";         // change text on the button
    } else {                                 // If it's already running,
        timerPaused = true;                  // pause it.
        tButton.innerText = "GO!";           // change text on the button
    }
};

function timerInput(input) {   
    if (timerPaused) {
        rawFeed = Number(input.target.value);               // input object's value is accessed by appending .target.value to the input's variable name (in this case input.target.value)
        if (`${rawFeed}` === "NaN") {                       // If the input isn't a number,
            tDisplay.style.backgroundColor = "orange";      // turn the display orange...
            tDisplay.innerText = "00:00";
        } else if (rawFeed > 0) {
            tDisplay.style.backgroundColor = "white";       // ... Don't change back until they give an actual number
            let se = (rawFeed % 60);                      // Seconds are the remainder of time remaining divided by 60...
            se = ("0" + se).slice(-2);                        // Two-digit guarantor: The ol' concat-n-slice!
            let mi = ((Math.floor(rawFeed/60)) % 60);     // Minutes are the remainder of (time remaining divided by 60) divided by 60...
            mi = ("0" + mi).slice(-2);
            tDisplay.innerText = `${mi}:${se}`;              // Show the number if it's legit
            countDownFrom = rawFeed;                                 // ALSO save it for another function to use...
        }
    }                         // Takes the raw input from the html element, and returns a number IF THERE IS ONE!
};

function reset() {
    if (countDownFrom > 0) {
        timerPaused = true;
        countDownFrom = 0;
        tDisplay.innerText = "00:00";
    }
    tDisplay.style.backgroundColor = "white";
};

// You get the number from the timerInput, then you take that value and make it the timeleft in the timer toggle function, then you hit the start button to run the timer toggle function...

// Click detectors always at the bottom of the script:

freezer.addEventListener("click", freezeTime);
swStart.addEventListener("click", startSW);
swStop.addEventListener("click", haltSW);
tButton.addEventListener("click", timerToggle);
tInput.addEventListener("input", timerInput);    // This brings the tInput element's input directly into the timerInput function, in the form of an input object, which we'll process in the function itself...
tReset.addEventListener("click", reset);

// Still to do: *start button momentarily disables input field until timer expires or reset button his pressed ; *pause effect is instantaneous