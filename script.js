const mainScreen = document.getElementById('main-screen');
const gameScreen = document.getElementById('game-screen');
const gameOver = document.getElementById('game-over-screen');

// $$$$=====Show the main screen=====$$$$//
const showMainScreen = () => {
    mainScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    gameOver.classList.add('hidden');
}

// $$$$=====Show the game screen=====$$$$//
const showGameScreen = () => {
    mainScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameOver.classList.add('hidden');
}

// $$$$=====Show the game over screen=====$$$$//
const showGameOver = () => {
    mainScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    gameOver.classList.remove('hidden');
}

// ===$$$== VARIABLES == $$$==== //

let button = document.querySelector("button");
let words = document.querySelector(".words");
let scoreDiv = document.querySelector(".score")
let spans;
let typed;
let angelLife = 3;
let points = 0; // will be used to keep track of the player's score
let typoErrors = 0;
let startTime;


const startGame = () => {
    showGameScreen();
    angelLife = 3;
    points = 0;
    button.disabled = true;
    words.innerHTML= "";
    typoErrors = 0;

    let checkTypo = (event) => {
        typed = this.value.trim();
        
        if (typed === "") {
            return;
        }
        if (typed === spans[0].textContent) {
            
        }
    
        } 
    }




button.addEventListener("click", (e)); { 
    button.disabled = true;
    showGameScreen();
};

