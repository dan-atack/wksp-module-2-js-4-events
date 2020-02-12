const balloon = document.getElementById('balloon');   // SAME
let balloonSize = 12;                                 // 
balloon.style.fontSize = `${balloonSize}px`;
const MIN_SIZE = 6;
const MAX_SIZE = 100;
const INCREMENT = 2;
const MAX_EXPLOSION_SIZE = 1000;                      //  Aside from relocating a few items, all initial values are the same..
function handleKeydown(event) {
    if (event.key === 'ArrowUp') {    // SAME
        balloonSize += INCREMENT;
        balloon.style.fontSize = `${balloonSize}px`;
        // if balloon is bigger than X
        if (balloonSize > MAX_SIZE) {
            // remove the event listener
            document.removeEventListener('keydown', handleKeydown);
            // remove balloon / add in explosion
            balloon.innerText = '💥';
            // explosion grows incrementally
            const explosion = setInterval(function() {
                balloonSize += 50;
                balloon.style.fontSize = `${balloonSize}px`;
                // if explosion size is y
                if (balloonSize > MAX_EXPLOSION_SIZE) {
                    // clear the interval - stop growing
                    clearInterval(explosion);
                    // fadeout
                    balloon.style.opacity = 0;
                }
            }, 20);
        }
    } else if (event.key === 'ArrowDown') {
            // if balloon is z bigger than Z
            if (balloonSize > MIN_SIZE) {
                // make balloon smaller
                balloonSize -= INCREMENT;
                balloon.style.fontSize = `${balloonSize}px`;
            }
    }
}
// event listener thst listen for 'keydown'
document.addEventListener('keydown', handleKeydown)