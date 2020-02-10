// Exercise 1.1
// ------------
// Write an app that gives the user 1s (or 1000ms) to click anywhere on the screen.
// 
// If they click inside of the required time, you should tell them that they've won,
// else let them know that they've lost.

// Hints:
// - Target the <body>
// - setTimout is your friend.
// - You'll a flag to store whether the user has won or lost

// OPTIONAL
// Feel free to add some CSS to this once you're done
// --------------------------------------------------

let clickBait = document.querySelector("body");
let countdown = 1000;
let victoryMessage = document.createElement("p");
victoryMessage.innerText = "Meltdown averted. Have a nice day!";

function func() {
    clearTimeout(thymer);
    document.querySelector("body").appendChild(victoryMessage);
};

//function suckMsg() {
//    alert("You suck so much we invented a function to inform you about it.")
//}
//let timer = setTimeout(suckMsg, 3000);

let thymer = setTimeout(function() {
    alert("AAAAA!");
}, 2000);

clickBait.addEventListener('click', func);