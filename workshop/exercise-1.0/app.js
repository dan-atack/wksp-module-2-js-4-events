// Exercise 1.0
// ------------
// Write an app that registers a click anywhere on the screen.
// Once the user clicks, let them know that they did it!

const clickBait = document.querySelector("body");

function func() {
    clickBait.style.background = "black";
    let text = document.createElement("p");
    text.innerText = "Click recieved. Deleting hardrive contents...";   // Hahaha this'll raise some pulses!
    text.style.color = "white";
    document.querySelector("body").appendChild(text);
};

clickBait.addEventListener("click", func);

// Hints:
// - Target the <body>

// OPTIONAL
// Feel free to add some CSS to this once you're done
// --------------------------------------------------