//Globals
let wordToCheck = [];
let points = 0;
let lifeCount = 3;
let startTimeStamp;
let timerInterval;
let gameStarted = false;
let theWord = "";
let theNextWord = "";
let letterIndex = 0;

// DOM elements
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOver = document.getElementById("game-over-screen");
const angelInGame = document.querySelector(".angelGameCharacter");
let startBtn = document.querySelector(".btn-play");
let reStartBtn = document.querySelector(".btn-replay");
let currentWordContainer = document.querySelector(".words");
let nextWordContainer = document.querySelector(".nextWords");
let score = document.querySelector(".words-count");
let life = document.querySelector(".life");
let endScore = document.querySelector(".scoreDisplay");
let timeDuration = document.querySelector(".timer");
let endTime = document.querySelector(".playDuration");
const heartsContainer = document.querySelector(".hearts-container");
const hearts = heartsContainer.querySelectorAll(".heart:not(.hidden)");

const list = [
    "SAMPLE",
    "RANDOM",
    "WORDS",
    "SAMPLE",
    "RANDOM",
    "WORDS",
    "SAMPLE",
    "RANDOM",
    "WORDS",
    "SAMPLE",
    "RANDOM",
    "WORDS",
    "QUITE",
    "RABBIT",
    "RACE",
    "RADIO",
    "RAILROAD",
    "RAIN",
    "RAISE",
    "RAN",
    "RANCH",
    "RANGE",
    "RAPIDLY",
    "RATE",
    "RATHER",
    "RAW",
    "RAYS",
    "REACH",
    "READ",
    "READER",
    "READY",
    "REAL",
    "REALIZE",
    "REAR",
    "REASON",
    "RECALL",
    "RECEIVE",
    "RECENT",
    "RECENTLY",
    "RECOGNIZE",
    "RECORD",
    "RED",
    "REFER",
    "REFUSED",
    "REGION",
    "REGULAR",
    "RELATED",
    "RELATIONSHIP",
    "RELIGIOUS",
    "REMAIN",
    "REMARKABLE",
    "REMEMBER",
    "REMOVE",
    "REPEAT",
    "REPLACE",
    "REPLIED",
    "REPORT",
    "REPRESENT",
    "REQUIRE",
    "RESEARCH",
    "RESPECT",
    "REST",
    "RESULT",
    "RETURN",
    "REVIEW",
    "RHYME",
    "RHYTHM",
    "RICE",
    "RICH",
    "RIDE",
    "RIDING",
    "RIGHT",
    "RING",
    "RISE",
    "RISING",
    "RIVER",
    "ROAD",
    "ROAR",
    "ROCK",
    "ROCKET",
    "ROCKY",
    "ROD",
    "ROLL",
    "ROOF",
    "ROOM",
    "ROOT",
    "ROPE",
    "ROSE",
    "ROUGH",
    "ROUND",
    "ROUTE",
    "ROW",
    "RUBBED",
    "RUBBER",
    "RULE",
    "RULER",
    "RUN",
    "RUNNING",
    "RUSH",
    "SAD",
    "SADDLE",
    "SAFE",
    "SAFETY",
    "SAID",
    "SAIL",
    "SALE",
    "SALMON",
    "SALT",
    "SAME",
    "SAND",
    "SANG",
    "SAT",
    "SATELLITES",
    "SATISFIED",
    "SAVE",
    "SAVED",
    "SAW",
    "SAY",
    "SCALE",
    "SCARED",
    "SCENE",
    "SCHOOL",
    "SCIENCE",
    "SCIENTIFIC",
    "SCIENTIST",
    "SCORE",
    "SCREEN",
    "SEA",
    "SEARCH",
    "SEASON",
    "SEAT",
    "SECOND",
    "SECRET",
    "SECTION",
    "SEE",
    "SEED",
    "SEEING",
];

// Function to initialize the game variables
const initGame = () => {
    spans = [];
    startTimeStamp;
    timerInterval;
    gameStarted = true;
    theWord = "";
    theNextWord = "";
    letterIndex = 0;
    score.innerHTML = 0;
    currentWordContainer.innerHTML = "";
    nextWordContainer.innerHTML = "";
};

// Function to show the main screen
const showMainScreen = () => {
    mainScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    gameOver.classList.add("hidden");
};

// Function to show the game screen
const showGameScreen = () => {
    mainScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameOver.classList.add("hidden");
};

// Function to show the game over screen
const showGameOver = () => {
    mainScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    gameOver.classList.remove("hidden");
};

// Function to update the game timer display
const updateTimer = () => {
    const currentTime = Math.floor((Date.now() - startTimeStamp) / 1000);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDuration.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

// Function to display the final game duration
const endGameTime = () => {
    const currentTime = Math.floor((Date.now() - startTimeStamp) / 1000);
    endTime.textContent = currentTime;
};

// Function to start the timer
const startTimer = () => {
    startTimeStamp = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
};

// Function to stop the timer
const stopTimer = () => {
    clearInterval(timerInterval);
};

// Function to start the game
const startGame = () => {
    lifeCount = 3;
    initGame();
    showGameScreen();
    endGameTime();
    startTimer();
    timerInterval = setInterval(updateTimer, 1000);
};

// Function to handle game over logic
const gameOverLogic = () => {
    gameStarted = false;
    showGameOver();
    stopTimer();
    endGameTime();
    endScore.textContent = `GAME OVER! You typed ${points} word(s) `;
    endTime.textContent = `in ${endTime.textContent}seconds`;
};

// Function to generate a random word from the list
const random = (container, theWord) => {
    letterIndex = 0;
    container.innerHTML = ""; // clears previous word;
    const currentWordIndex = Math.floor(Math.random() * list.length); //generate random array index
    theWord = list[currentWordIndex];
    const wordArray = theWord.split("");

    createSpans(wordArray, container);
};

// Function to create spans for each letter of the word
function createSpans(word, parent) {
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement("span");
        span.classList.add("span");
        span.textContent = word[i];
        parent.appendChild(span);
    }
}

// Function to handle typing letters during the game
const typeLetters = (e) => {
    if (!gameStarted) return;

    let typed = e.key.toUpperCase();
    let currentSpan = wordToCheck[letterIndex];

    if (currentSpan.textContent === typed) {
        currentSpan.classList.add("bg");
        letterIndex++;
        if (letterIndex === wordToCheck.length) {
            //if word has been typed fully, switch
            currentWordContainer.innerHTML = "";
            wordToCheck = document.querySelectorAll(".nextWords span");
            currentWordContainer.append(...wordToCheck);
            theWord = theNextWord;
            random(nextWordContainer, theNextWord);
            points += 1;
            score.textContent = points;

            // Perform jump animation when word is typed correctly
            angelInGame.classList.add('jumpAnimation')
            setTimeout(() => angelInGame.classList.remove("jumpAnimation"), 2000);
            //jumpChar();
            letterIndex = 0;
        }
    } else {
        lifeCount -= 1;
        currentSpan.classList.add("error");
        setTimeout(() => currentSpan.classList.remove("error"), 200);
        updateHearts(lifeCount);
        hearts[0].classList.add("hidden")
    }

    if (lifeCount <= 0) {
        gameOverLogic();
    }
};

// Function to update the hearts display based on the remaining life count
const updateHearts = (lifeCount) => {
    const heartsContainer = document.querySelector(".hearts-container");
    const hearts = heartsContainer.querySelectorAll(".heart");

    hearts.forEach((heart, index) => {
        if (index < lifeCount) {
            heart.classList.remove("hidden");
        } else {
            heart.classList.add("hidden");
        }
    });
};

// Event listener for keydown event to handle typing letters
document.addEventListener("keydown", typeLetters);

// Event listener for the "Start" button
startBtn.addEventListener("click", function (e) {
    startGame();
    random(currentWordContainer, theWord);
    random(nextWordContainer, theNextWord);
    wordToCheck = document.querySelectorAll(".words span");
    gameStarted = true;
});

// Event listener for the "Restart" button
reStartBtn.addEventListener("click", function (e) {
    startGame();
    random(currentWordContainer, theWord);
    random(nextWordContainer, theNextWord);
    gameStarted = true;
});