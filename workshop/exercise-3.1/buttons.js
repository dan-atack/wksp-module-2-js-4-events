// Create link to the main element in the page:

const main = document.querySelector("body");
const banner = document.querySelector("h1");

// Create basic CSS styles

main.style.width = "50%";
main.style.display = "grid";
main.style.gridTemplateColumns = "100px 100px 100px 100px 100px";
main.style.marginLeft = "25%";
main.style.textAlign = "center";
banner.style.marginLeft = "25%";
banner.style.gridColumnStart = "1";
banner.style.gridColumnEnd = "5";

// Create Green Light Function

function greenLight(event) {                        // Green Light Function takes an event as an argument, and acts as a toggle switch. The event is a click, as determined in the for loop's addEventListener line below.
    let buttonID = event.target.id;                 // When the function runs, it creates a variable with the event target's id as its name. Thus the button clicked (which has an ID assigned when the for loop creates it) can be referred to specifically in the following lines.
    if (document.getElementById(buttonID).style.backgroundColor === "red") {                // if the element's BG color is red,
        document.getElementById(buttonID).style.backgroundColor = "green";                  // Turn it green.
    } else {                                                                                // Otherwise,
        document.getElementById(buttonID).style.backgroundColor = "red";                    // Turn it red again.
    }       
};

// Generate Buttons

for (let i = 1; i <= 25; i++) {                         //  For numbers 1 - 25,  (I upped it from 20 to 25 so I could make a happy face)
    let newButton = document.createElement("button");   // Create a new button element
    newButton.innerText = `Button ${i}`;                // Give it a label based on the order in which it was created.
    newButton.id = `Button-${i}`;                       // More importantly, give it a unique ID so it can be connected to the greenLight function when it's clicked.
    newButton.style.backgroundColor = "red";            // Make it red initially.
    main.appendChild(newButton);                        // Then add the button to the page,
    newButton.addEventListener("click", greenLight);    // And lastly, setup an Event Listener that runs the Green Light Function when the button is clicked.
};



