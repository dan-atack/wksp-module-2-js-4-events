// Exercise 2.3
// ------------
// DON'T COPY/PASTE THE LAST EXERCISE. REWRITE IT FROM SCRATCH! (This is the last time.)
// Similar to the last exercise, write an app that gives the user
// a random amount of time (up to 5 seconds) to click the screen.

// It would be a good idea to create a new function that will manage the whole game.

// Get HTML element hookups:
const result = document.getElementById("result");
const bod = document.querySelector("body");
let timeCounter = document.getElementById("timer");
bod.style.background = "whitesmoke";

// Create boolean for whether it's too late:
let tooLate = false;
let timeLeft = 1;  // This gets modified later.

// Define functions for success and failure:
function failure(){
    tooLate = true;
    result.innerText = "You have failed.";
    timeCounter.innerText = 0;
};

function success() {
    if (!tooLate) {
        result.innerText = "Success";
        tooLate = true;        //  Use this value to stop the countdown.
    }
};

// Create constrained random number generator:

function generator(maxValue){                // Customizable max value
    let gen = Math.ceil(Math.random()*10)   // Create and store candidate random number
    if (gen <= maxValue) {                   // if candidate is less than or equal to max value,
        return gen;                      // then use that number
    } else {
        return maxValue;                 // Otherwise just take the max
    }
};

timeLeft = generator(5);
timeCounter.innerText = timeLeft;

// Setup timer function:

let timer = setTimeout(failure, (timeLeft*1000));

// Create timer-stopper function to use on last line with event listener function:

function allClear() {
    clearTimeout(timer);   // halt timer
    success();             // run success function
};

timeCounter.innerText = timeLeft;

let countdown = setInterval(() => {
    if ((timeLeft > 0) && !tooLate) {
        timeLeft -=1;
        timeCounter.innerText = timeLeft;
    }
}, 1000);

bod.addEventListener("click", allClear);