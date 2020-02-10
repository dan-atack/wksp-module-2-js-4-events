//Step One: Define main area AKA the Button Zone

const buttonZone = document.querySelector(".main");

buttonZone.style.height = "80vh";
buttonZone.style.width = "80vw";
buttonZone.style.marginLeft = "10%";

// More CSS Stuff later on... Probably.

// Step Two: Create button colour toggle function:

function greenLight(event) {
    let ident = event.target.id;
    if (document.getElementById(ident).style.backgroundColor === "green") {
        document.getElementById(ident).style.backgroundColor = "red";
    } else {
        document.getElementById(ident).style.backgroundColor = "green";
    }
};

// Step Three: Create buttons...

for (let i = 1; i <= 20; i++) {
    let clicker = document.createElement("button");
    clicker.innerText = `Button ${i}`;
    clicker.id = `button-${i}`;
    clicker.style.backgroundColor = "lightblue";
    buttonZone.appendChild(clicker);
    clicker.style.position = "fixed";
    clicker.style.marginLeft = `${(Math.random()*50)}%`;
    clicker.style.marginTop = `${(Math.random()*50)}%`;
    clicker.addEventListener("click", greenLight);
};

// Note: If I were less stoked to fight bosses, I would probably put the elements in a grid with a lot of rows and columns,
// to prevent them from slipping off the page and/or overlapping each other.