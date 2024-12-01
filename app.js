const holes = document.querySelectorAll(".holes");
const scoreBoard = document.querySelector("span");
const moles = document.querySelectorAll(".mole");

let lastTime;
let gameOver = false;
let score = 0;


function RandomTime(min, max) {
    return Math.round(Math.random() * (max-min)+min);;
}
function RandomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastTime) {
        return RandomHole(holes);
    }
    lastTime = hole;
    return hole;
}
function PopUp() {
    const time = RandomTime(400,1200);
    let hole = RandomHole(holes);
    hole.classList.add('came');
    setTimeout(() => {
        hole.classList.remove('came');
        if (!gameOver) {
            PopUp();
        }
    },time);
}

function GameStart() {
    gameOver = false;
    score = 0;
    scoreBoard.innerHTML = `YOU WHACKS : ${score}`;
    PopUp();
    setTimeout(() => {
        gameOver = true;
        alert(`Game Over! Your final score is: ${score}`);
    }, 15000);
}
function Bonk(e) {
    if (!e.isTrusted) {
        return;
    }
    if (!this.classList.contains("clicked")) {
        score += 5; // Increment score
        scoreBoard.innerHTML = `YOU WHACKS : ${score}`; // Update score display
        this.parentNode.classList.remove("came"); // Remove the mole
        this.classList.add("clicked"); // Mark the mole as clicked
    }
}
GameStart();

moles.forEach(mole => mole.addEventListener('click', Bonk));