// Step One: Setup Battle Zone:

const main = document.querySelector(".battlezone");
const bod = document.querySelector("body");
const tDisplay = document.getElementById("display");
const bubbCount = document.getElementById("count");
tDisplay.id = "display";
bubbCount.id = "bubblesleft"
tDisplay.style.fontSize = "18px";
bubbCount.style.fontSize = "27px";

main.style.height = "600px";
main.style.width = "100vw";
main.style.backgroundImage = "url('boss.jpg')";
main.style.backgroundRepeat = "no-repeat";
main.style.backgroundPosition = "center";

let bubbsRemaining = 1;  //  Universal variable declared here; the greenLight function will change it.

// Step Two: Create Primary Button Function:
// When Clicked, Generate a random amount of buttons on the screen, and start a countdown that has 2 seconds per button created.

function button1(event) {                               // When activated, button 1 generates a random amount of buttons (from 1 - 20)
    let idee = event.target.id;
    //document.getElementById(idee).style.display = "none";  // Button disappears when pressed. I'll delete some of the other later to prove that I can.
    let amt = (Math.ceil(Math.random()*20));
    bubbsRemaining = amt;
    tDisplay.innerText = `You have ${amt*2} seconds... `;
    bubbCount.innerText = `${amt} bubbles to go...`;
    for (let i = 1; i <= amt; i++) {
        let newB = document.createElement("button");
        newB.innerText = `Button-${i}`;
        newB.id = `button-${i}`;
        newB.style.backgroundColor = "lightblue";
        newB.style.zIndex = "1";            // Overlap countermeasure: If 2 buttons overlap, the first one to get clicked gets "lowered" to 0 z-axis.
        newB.style.height = "64px";
        newB.style.borderRadius = "50%";
        newB.style.position = "fixed";
        newB.style.marginLeft = `${(Math.random()*70)}vw`;
        newB.style.marginTop = `${(Math.random()*70)}vh`;
        document.querySelector(".battlezone").appendChild(newB);
        newB.addEventListener("click", greenLight);
    }
    primary.parentNode.removeChild(primary);
    countdown((amt*2));
};

// Step Three: Create Secondary Button Function:

function greenLight(event) {
    let ident = event.target.id;
    document.getElementById(ident).style.backgroundColor = "green";
    document.getElementById(ident).style.zIndex = "0";      // Since I haven't bothered to eliminte the possibility of overlap, this will at least soothe the pain of having two overlapping buttons.
    bubbsRemaining -= 1;
    bubbCount.innerText = `${bubbsRemaining} bubbles to go...`;
    document.getElementById(ident).removeEventListener("click", greenLight);        // If this works I'll have to start including it a lot.
};

// Step Four: Create Countdown Function:

function countdown(time) {
    let timeleft = time;
    let active = setInterval(() => {
        if (timeleft > 0) {
            timeleft -= 1;
            tDisplay.innerText = `You have ${timeleft} seconds...`;
            if (bubbsRemaining === 0) {
                clearInterval(active);
                main.innerText = "You popped all the bubbles! Good job!"
            }
        } else {
            main.innerText = "Your mission is a failure."
            main.style.fontSize = "72px";
        }   
    },(time*100));  // The function ran kinda slow in my browser so I adjusted the interval here... How could I make it more efficient?
};

// Step Five: Create Primary Button, and style it a bit:

let primary = document.createElement("button");
primary.innerText = "Click Me to Start!";
primary.id = "primary";
main.appendChild(primary);
primary.style.position = "absolute";
primary.style.marginLeft = `${(Math.random()*500)}px`;
primary.style.height = "100px";
primary.style.borderRadius = "50%";
primary.style.backgroundColor = "lightgreen";

primary.addEventListener("click", button1);

// Remaining changes:

// Prettification... Maybe after we beat bowser...