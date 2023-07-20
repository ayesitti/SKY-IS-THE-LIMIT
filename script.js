import list from "./data.js";

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
let spans = [];
const inGameMusic = document.getElementById("inGameAudio");
const mainScreenMusic = document.getAnimations("mainAudio")
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
let endScore = document.querySelector(".scoreDisplay");
let timeDuration = document.querySelector(".timer");
let endTime = document.querySelector(".playDuration");
const heartsContainer = document.querySelector(".hearts-container");
const hearts = heartsContainer.querySelectorAll(".heart:not(.hidden)");

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
  hearts.forEach((element) => element.classList.remove("invisible"));
};

// Function to show the main screen
const showMainScreen = () => {
  mainScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  gameOver.classList.add("hidden");
  playMainAudio()
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
  endScore.textContent = `You typed ${points} word(s) `;
  endTime.textContent = `in ${endTime.textContent} seconds`;
};

// Function to generate a random word from the list
const random = (container, wordVariable) => {
  letterIndex = 0;
  container.innerHTML = ""; // clears previous word;
  const currentWordIndex = Math.floor(Math.random() * list.length); //generate random array index
  wordVariable = list[currentWordIndex];
  const wordArray = wordVariable.split("");
  console.log(wordVariable);
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
  console.log(wordToCheck, theWord, theNextWord);

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
      angelInGame.classList.add("jumpAnimation");
      setTimeout(() => angelInGame.classList.remove("jumpAnimation"), 2000);
      //jumpChar();
      letterIndex = 0;
    }
  } else {
    lifeCount -= 1;
    currentSpan.classList.add("error");
    setTimeout(() => currentSpan.classList.remove("error"), 200);
    updateHearts(lifeCount);
  }

  if (lifeCount <= 0) {
    gameOverLogic();
  }
};

// Function to update the hearts display based on the remaining life count
const updateHearts = (lifeCount) => {
  const heartsContainer = document.querySelector(".hearts-container");
  const hearts = heartsContainer.querySelectorAll(".heart:not(.invisible)");
  hearts[0].classList.add("invisible");

  // hearts.forEach((heart, index) => {
  //     if (index < lifeCount) {
  //         heart.classList.remove("hidden");
  //     } else {
  //         heart.classList.add("hidden");
  //     }
  // });
};

// Audio functions

// function typingStyle (){
//     typingAudio.play()
// }
//rename to AngelAuidio
const playInGameAudio = () => {
    inGameMusic.play();
}
const playMainAudio = () => {
  mainScreenMusic.play();
}


// Event listener for keydown event to handle typing letters
document.addEventListener("keydown", typeLetters);

// Event listener for the "Start" button
startBtn.addEventListener("click", function (e) {
  startGame();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  wordToCheck = document.querySelectorAll(".words span");
  gameStarted = true;
  playInGameAudio();
});

// Event listener for the "Restart" button
reStartBtn.addEventListener("click", function (e) {
  startGame();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  wordToCheck = document.querySelectorAll(".words span");
  gameStarted = true;
});
