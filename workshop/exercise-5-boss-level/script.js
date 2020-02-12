// Define constant variables:

const main = document.getElementById("main");
const startButton = document.getElementById("start");
const instructions = document.getElementById("instructions");
const p1 = document.getElementById("kirby");
const p2 = document.getElementById("sonic");
const signal = document.getElementById("signal");
const scoreboard = document.getElementById("scoreboard");

// Position Player 2 at far end of arena, and hide them both until the action starts!

p1.style.visibility = "hidden";
p2.style.visibility = "hidden";
p2.style.left = "90vw";
p1.style.bottom = "32px";
p2.style.bottom = "32px";

// Create Global Variables:

let roundOver = false;                  //  Controls the flow of the game. Used to stop a round when someone wins/loses it.
let p1Score = 0;
let p2Score = 0;

// Create ScoreStart function: Creates scoreboard when game starts:

function scoreStart() {
    scoreboard.style.display = "flex";
    scoreboard.style.flexDirection = "row";
    let display1 = document.createElement("p");
    display1.innerText = "Player One Score:";
    display1.id = "p1display";
    display1.style.fontSize = "24px";
    display1.style.color = "white";
    display1.style.marginTop = "16px";
    let display2 = document.createElement("p");
    display2.innerText = "Player Two Score:";
    display2.id = "p2display";
    display2.style.fontSize = "24px";
    display2.style.color = "white";
    display2.style.marginTop = "16px";
    display2.style.marginLeft = "80vw";
    scoreboard.appendChild(display1);
    scoreboard.appendChild(display2);
};

// Create Coin generator function:

function coinGen() {                            // Creates the coin image, plays sound, then disables false-start function and adds key handlers that lead to scoring points...
    if (!roundOver) {                           // Only works if someone hasn't jumped the gun and ended the round
        console.log("coin generated");
        signal.play();
        let coin = document.createElement("img");
        coin.src = "imgs/prize.gif";
        coin.id = "coin";
        coin.alt = "coin";
        coin.style.bottom = "0px";
        main.appendChild(coin);
        document.removeEventListener("keydown", falseHandler);
        document.addEventListener("keydown", trueHandler);
    }
};

function trueHandler(event) {
    if (!roundOver) {                   // This gets switched off if someone jumps the gun and hits their key before the round starts (effectively cancels that round).
        if (event.key === "q") {
            console.log("player 1 hit their button after the coin appeared");
            roundOver = true;
            main.removeChild(document.getElementById("coin"));
            p1Score += 1;
            document.getElementById("p1display").innerText = `Player One Score: ${p1Score}`;
            document.removeEventListener("keydown", trueHandler);               // So you can't score more than once per round!
        } else if (event.key === "p") {
            console.log("player 2 hit their button after the coin appeared");
            roundOver = true;
            main.removeChild(document.getElementById("coin"));
            p2Score += 1;
            document.getElementById("p2display").innerText = `Player Two Score: ${p2Score}`;
            document.removeEventListener("keydown", trueHandler);               // So you can't score more than once per round!
        }
    }
    setTimeout(() => {       // If the round never happens (because someone jumped the gun),
        flasher();           // Flasher starts another round
    }, 1500);
};

function falseHandler(event) {    // This is what happens if you click before the coin appears: Your opponent gets the point automatically.
    if (event.key === "q") {
        console.log("player 1 hit their button BEFORE the coin appeared");
        roundOver = true;           // end round immediately if someone jumps the gun.
        // create temporary message:
        let msg = document.createElement("p");
        msg.innerText = "PLAYER ONE JUMPED THE GUN!";
        msg.id = "fail";
        msg.style.color = "red";
        msg.style.fontSize = "60px";
        main.appendChild(msg);
        // add to opponent's score:
        p2Score += 1;
        document.getElementById("p2display").innerText = `Player Two Score: ${p2Score}`;
        // prevent further key responses:
        document.removeEventListener("keydown", falseHandler);          // Round ends and proper handler function is cancelled until next one...
        setTimeout(() => {                                              // If the round never happens (because someone jumped the gun),
            main.removeChild(document.getElementById("fail"));          // remove failure message before next round starts
            console.log("round restarting after p1 jumped the gun");
            flasher();                                                  // Flasher starts another round
        }, 3000);
    } else if (event.key === "p") {
        console.log("player 2 hit their button BEFORE the coin appeared");
        roundOver = true;           // end round immediately if someone jumps the gun.
        // create temporary message:
        let msg = document.createElement("p");
        msg.innerText = "PLAYER TWO JUMPED THE GUN!";
        msg.id = "fail";
        msg.style.color = "red";
        msg.style.fontSize = "60px";
        main.appendChild(msg);
        // add to opponent's score:
        p1Score += 1;
        document.getElementById("p1display").innerText = `Player One Score: ${p1Score}`;
        // prevent further key responses:
        document.removeEventListener("keydown", falseHandler);          // Round ends and proper handler function is cancelled until next one...
        setTimeout(() => {                                              // If the round never happens (because someone jumped the gun),
            main.removeChild(document.getElementById("fail"));          // remove failure message before next round starts
            console.log("round restarting after p2 jumped the gun");
            flasher();                                                  // Flasher starts another round
        }, 3000);
    }
};

// Create countdown function: Enables 'false start' key handler function, then Counts down from 1-5 seconds then runs the Coin generator function.

function countdown() {
    let rando = (Math.ceil(Math.random()*5) + 1);
    document.addEventListener("keydown", falseHandler);
    setTimeout(() => {
        if (!roundOver) {           // Countdown consequence never fires if the round is over (which happens if someone jumps the gun)
            console.log("countdown finished: generating coin");
            coinGen();
        } else {
            console.log("Countdown aborted due to false start");
        }
    }, (rando*1000));
};

// Create Flasher Function: When you start the game there's a 2-second delay to get ready, during which "get ready" flashes in large letters at the top of the screen.

function flasher() {                            // Flasher will run at the start of every round, so we'll check for victory each time it runs:
    if ((p1Score < 3) && (p2Score < 3)) {
        let timeup = false;                         // There will be a timeout function below which will turn this true when it runs out. This is used to stop the interval function.
        let getReady = document.createElement("p"); // Create a new p with some text to flash
        getReady.innerText = "GET READY";           // add text
        getReady.id = "get";
        getReady.style.color = "red";               // color text
        getReady.style.fontSize = "60px";           // make it large
        main.appendChild(getReady);                 // add it to main div
        let flashstop = setTimeout(() => {                      // start timout function to stop this after 3 seconds
            console.log("flash timeout reached - initiating round start sequence")
            roundOver = false;                     // ONLY allow the round to proceed once the flash sequence is over!!!!!!!!!!!!!
            clearInterval(flashing);
            main.removeChild(document.getElementById("get"));
            countdown();                        // The flasher function runs the 'countdown' function as soon as it ends.
        }, 2000);
        let flashing = setInterval(() => {          // start interval to toggle visibility every 100 ms
            console.log("flash");
            getReady.style.visibility = (getReady.style.visibility === "visible") ? getReady.style.visibility = "hidden" : getReady.style.visibility = "visible";
        },100);
    } else {
        roundOver = true;
        let victory = document.createElement("p"); // Create a new p with some text to announce victory
        victory.innerText = (p1Score == 3) ? "Player 1 Wins!" : "Player 2 Wins!";
        victory.style.color = "green";
        victory.style.fontSize = "72px";
        victory.id = "vic";
        main.appendChild(victory);
        setTimeout(() => {
            // Get rid of victory text and reset all values
            main.removeChild(document.getElementById("vic"));
            roundOver = false;
            p1Score = 0;
            p2Score = 0;
            scoreboard.removeChild(document.getElementById("p1display"));
            scoreboard.removeChild(document.getElementById("p2display"));
            // hide player sprites
            p1.style.visibility = "hidden";
            p2.style.visibility = "hidden";
            // Recreate instructions/start game buttons
            main.appendChild(instructions);
            main.appendChild(startButton);
        }, 5000);
    }
};

// Create close instructions function:

function closeInstructions (event) {
    let iden = event.target.id;
    main.removeChild(document.getElementById(iden));
    instructions.style.visibility = "visible";
    startButton.style.visibility = "visible";
};

// Create Instruction menu button function:

function howToMenu() {                                   //  Targets the instructions button when clicked
    instructions.style.visibility = "hidden";
    startButton.style.visibility = "hidden";
    let howTo = document.createElement("p");
    howTo.innerText = "Two players wait for a signal to start after a random delay. Once the start signal appears, the first person to press their key wins. If a player presses before the signal appears, they lose. Player One presses the Q key and Player Two presses the P key. Capisce?\n (Click this window to return to the main screen)";
    howTo.id = "howto";
    main.appendChild(howTo);
    howTo.style.backgroundColor = "whitesmoke";
    howTo.style.width = "50%";
    howTo.style.marginTop = "-200px";
    howTo.style.fontSize = "24px";
    howTo.style.borderWidth = "4px";
    howTo.style.borderColor = "darkblue";
    howTo.style.borderStyle = "solid";
    howTo.style.padding = "8px 8px";
    howTo.addEventListener("click", closeInstructions);
};

// Create Start Button function:

function startGame() {
    main.removeChild(document.getElementById("instructions"));
    main.removeChild(document.getElementById("start"));
    gameOn = true;
    p1.style.visibility = "visible";
    p2.style.visibility = "visible";
    scoreStart();
    flasher();
};

// Create click event handlers:

instructions.addEventListener("click", howToMenu);
startButton.addEventListener("click", startGame);
