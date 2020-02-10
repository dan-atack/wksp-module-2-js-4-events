// Step One: Define links to permanent html elements (few though they are):

const header = document.querySelector("h1");
const main = document.querySelector(".main");
const bod = document.querySelector("body");

// Step Zwei: Create function: (made with hardly more than a little peek at the previous answer!)

function toggler(event) {
    let zeButton = event.target.id;    // this variable is a string; the target's id. We'll use this to target the button to change its appeareance.
    if (document.getElementById(zeButton).style.backgroundColor ==="green") {
        document.getElementById(zeButton).style.backgroundColor = "red";
    } else {
        document.getElementById(zeButton).style.backgroundColor = "green";
    };
};

// Step Trois: Generate buttons:

for (let i = 1; i <= 25; i++) {
    let butt = document.createElement("button");
    butt.innerText = `Button-${i}`;
    butt.id = `Button-${i}`;
    butt.style.backgroundColor = "lightblue"; // Unused buttons are light blue; interacting with them turns them to green or red, in that order.    
    main.appendChild(butt);
    butt.addEventListener("click", toggler);
};

// Step Quatro: Quick CSS touchup:

bod.style.textAlign = "center";
bod.style.justifyContent = "center";
bod.style.alignItems = "center";
bod.style.display = "flex";
bod.style.flexDirection = "column";
bod.style.color = "yellow";
bod.style.backgroundColor = "black";
main.style.position = "relative";
main.style.alignItems = "center";
main.style.display = "grid";
main.style.gridTemplateColumns = "100px 100px 100px 100px 100px";
