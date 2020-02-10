// Exercise 1.2
// ------------
// DON'T COPY/PASTE THE LAST EXERCISE. REWRITE IT FROM SCRATCH!
// Similar to the last exercise, write an app that gives the user
// a random amount of time (up to 5 seconds) to click anywhere on the screen.

// But this time, let's let the user know how much time they have to actually 'click'.
// If they click inside of the required time, you should tell them that they've won,
// else let them know that they've lost.

// In short, 
// Replicate (and I mean, REWRITE it from scratch) the last exercise, and add
// - random amount of time to click
// - tell the user how much time they have to click.

// Dan's comments below:

// Create connections to HTML elements first

let clickBait = document.querySelector("body");
let outcome = document.getElementById("result");
let timeNumeral = document.getElementById("time");
let tooLate = false;

// Create graphic variables in case of failure...

const burst = document.getElementById("explosion");
let burstSize = 10;
const maxBurst = 400;

// Create functions to insert failure text (and animation) into HTML

function meltdown() {
    tooLate = true;    // If time runs out, this prevents you from being able to 'also win' by pressing the button and defusing the bomb anyway.
    outcome.innerText = "You were too slow. Now all your base are belong to us.";
    burst.innerText = "💥";
    burst.style.textAlign = "center";
    clickBait.style.background = "black";
    burst.style.bottom = "50%";
    let explosion = setInterval(() => {     // setInterval object runs a function (arg 1) every x milliseconds (arg 2) (see below after function declaration)
        burstSize += 20;
        burst.style.fontSize = `${burstSize}px`;
        if (burstSize >= maxBurst) {
            clearInterval(explosion);           // Stops your interval function from running.
            burst.style.transition = 500; 
            burst.style.opacity = 0;            // make the balloon disappear,
        }
    }, 40);
};

// Create success function:

function success() {
    if (!tooLate) {       // If rime runs out, this function doesn't work.
        outcome.innerText = "Meltdown averted. Have a nice day! 😎";
    }
};

// Random number generator:

let time = Math.floor(Math.random()*11) + 1;  // Plus one so you always have at least one second to react.

// Set HTML time element inner text to value of random number generator:

timeNumeral.innerText = time;       // HTML time element gets the value of the 'time' variable, which contains our random number.

// Create timer:

let timer = setTimeout(meltdown, (time*1000));  // Since time value is in seconds, multiply by 1000 here to make the challenge actually possible.

function allClear() {      // Create All-Clear function to de-activate timer and generate victory message.
    clearTimeout(timer);
    success();
};

clickBait.addEventListener("click", allClear);   // Finally, add the event listener for a click to the body, and have it run the 'all clear' function if there's a click.

// Challenge
// Make the countdown live...

let countdown = setInterval(() => {
    time -= 1;
    timeNumeral.innerText = time;
}, 1000);