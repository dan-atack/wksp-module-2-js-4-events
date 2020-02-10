// we need an event listener that listens for 'keydown' events for arrow-up and arrow-down:
// BALLOON ACTION PLAN:
// if arrow up,
//    the balloon gets bigger
//    if balloon size is too big,
//       remove event listeners   --  (game over dude)
//       remove balloon img
//       add explosion img
//       explosion grows incrementally
//       if explosion reaches certain size
//           explosion fades out and disappears

// if it's arrow down,
//     the balloon shrinks
//     if the balloon is at minimum size,
//          ignore input from down listener


const balloon = document.getElementById("balloon");   // create js object for balloon element in the html
let balloonSize = 12;                                 // PRIMARY CHANGES: Bring all initial balloon definition material to top.
balloon.style.fontSize = `${balloonSize}px`;          // balloon object's fontSize is the size number, converted to a string for css to read.
const min_size = 6;              // set minimum size for balloon (for deflate action)
const max_size = 100;            // set max size for balloon
const inflation_Increment = 2;    // set inflation/deflation increment
const max_explosion_size = 256;
            //  set initial balloon size -- NOTE use of let variable for changable value!


function handleKeydown(event) {
    if (event.key === 'ArrowUp') {    // ArrowUp string is contained as the name for the up key.
        balloonSize += inflation_Increment;
        balloon.style.fontSize = `${balloonSize}px`;  // forgot the @#$%^ 'px' in the css string!!! OY!
        if (balloonSize >= max_size) {
            balloon.innerText = "💥";
            const explosion = setInterval(function() {     // setInterval object runs a function (arg 1) every x milliseconds (arg 2) (see below after function declaration)
                balloonSize += 10;
                balloon.style.fontSize = `${balloonSize}`;
                if (balloonSize > max_explosion_size) {
                    clearInterval(explosion);             // Stops your interval function from running.
                    balloon.style.opacity = 0;            // make the balloon disappear,
                    balloon.style.transition = 100;       // over a period of 100 milliseconds
                }
            }, 10);                                               // the 10 here is the interval we mentioned on line 35's comment
        }
    } else if (event.key === "ArrowDown") {
        if (balloonSize > min_size) {
            balloonSize -= inflation_Increment;
            balloon.style.fontSize = `${balloonSize}px`;
        }
    }
};

// Event listener is added last to avoid confusion with calling functions before they're defined:

document.addEventListener('keydown', handleKeydown);
