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
// let endGameAverageWPM = calculateWPM(endScore, endTime);
const flyingAngel = document.getElementById("flyingAngelAudio");
const mainScreenMusic = document.getElementById("mainAudio");
const correctAudio = document.getElementById("correctWordAudio");
const gameOverAudio = document.getElementById("gameOverAudio");
const typoErrorAudio = document.getElementById("typoAudio");
// DOM elements
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOver = document.getElementById("game-over-screen");
const angelInGame = document.querySelector(".angelGameCharacter");
const startBtn = document.querySelector(".btn-play");
const reStartBtn = document.querySelector(".btn-replay");
// const musicBtn = document.getEementById("btn-music");
// const mainMusicAudio = document.getElementById("mainAudio");

let currentWordContainer = document.querySelector(".words");
let nextWordContainer = document.querySelector(".nextWords");
let score = document.querySelector(".words-count");
let endScore = document.querySelector(".scoreDisplay");
let timeDuration = document.querySelector(".timer");
let endTime = document.querySelector(".playDuration");
let endGameResult = document.querySelector(".endGameResultText");
let wpmResultinScreen = document.querySelector(".wpmAmount");
const heartsContainer = document.querySelector(".hearts-container");
const hearts = heartsContainer.querySelectorAll(".heart:not(.hidden)");

// Function to initialize the game variables
const initGame = () => {
  spans = [];
  startTimeStamp = Date.now();
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
  playMainAudio();
};

// Function to show the game screen
const showGameScreen = () => {
  mainScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameOver.classList.add("hidden");
  playMainAudio;
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

const computeWPM = (endScore, endTimeInSeconds) => {
  const totalTimeInMinutes = endTimeInSeconds / 60;
  const WPM = endScore / totalTimeInMinutes;
  const roundedWPM = Math.floor(WPM);
  return WPM;
};

// Function to display the final game duration
const endGameTime = () => {
  const currentTime = Math.floor((Date.now() - startTimeStamp) / 1000);
  updateTimer(); // Update the timeDuration element
  endTime.textContent = timeDuration.textContent;
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
  playGameOver();
  endScore.textContent = `You typed ${points} word(s)`;
  const elapsedTime = Math.floor((Date.now() - startTimeStamp) / 1000);
  console.log(elapsedTime);
  // const endTimeInMinutes = Number(timeDuration.textContent);
  // let time = timeDuration[4].split(":");
  //   let hour = time[0];
  //   let minute = time[1];
  //   let second = time[2];
  const averageWPM = computeWPM(points, elapsedTime);
  wpmResultinScreen.textContent = `Your average Words Per Minute (WPM) ${averageWPM}`;

  // const endTimeInSeconds = Number(endTime.textContent)

  // const averageWPM = computeWPM(points,endTime)
  // wpmResultinScreen.textContent = (`WPM: ${averageWPM}`)

  //check this
  // const endTimeInSeconds = updateTimer();
  // const totalTimeInMinutes = endTimeInSeconds / 60;
  // const averageWPM = computeWPM(points, totalTimeInMinutes);
  // wpmResultinScreen.textContent = `WPM: ${averageWPM}`;

  switch (true) {
    case averageWPM <= 10:
      endGameResult.textContent =
        "That's not good. Learn the proper typing technique and practice to improve your speed.";
      break;
    case averageWPM <= 20:
      endGameResult.textContent =
        "That's low. Keep going. Focus on your technique and keep practicing.";
      break;
    case averageWPM <= 30:
      endGameResult.textContent =
        "Below average. Keep practicing to improve your speed and accuracy.";
      break;
    case averageWPM <= 41:
      endGameResult.textContent =
        "You are an average typist. You still have significant room for improvement.";
      break;
    case averageWPM <= 50:
      endGameResult.textContent =
        "Yayy! You're above average. But you could do better. Play again?";
      break;
    case averageWPM <= 60:
      endGameResult.textContent =
        "Great job! This is the speed required for most jobs. You can now be a professional typist.";
      break;
    case averageWPM <= 95:
      endGameResult.textContent =
        "At this speed, you're probably a gamer, coder, or genius. You're awesome!";
      break;
    case averageWPM <= 140:
      endGameResult.textContent =
        "I can't believe it. You're in the top 1% of typists! That's Amazing!";
      break;
    default:
      endGameResult.textContent = "You've reached the SKY!!";
  }
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
      playCorrectWordAudio();

      // Perform jump animation when word is typed correctly
      angelInGame.classList.add("jumpAnimation");
      setTimeout(() => angelInGame.classList.remove("jumpAnimation"), 1000);
      //jumpChar();
      letterIndex = 0;
    }
  } else {
    lifeCount -= 1;
    playTypoAudio();
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

const playFlyingAngel = () => {
  flyingAngel.play();
};
const playMainAudio = () => {
  mainScreenMusic.play();
};
const pauseMainAudio = () => {
  mainScreenMusic.pause();
};
const playCorrectWordAudio = () => {
  correctAudio.play();
};
const playTypoAudio = () => {
  typoErrorAudio.play();
};

const playGameOver = () => {
  gameOverAudio.play();
};

// Event listener for keydown event to handle typing letters
document.addEventListener("keydown", typeLetters);

// Event listener for the "Start" button
startBtn.addEventListener("click", function (e) {
  startGame();
  pauseMainAudio();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  wordToCheck = document.querySelectorAll(".words span");
  gameStarted = true;
  playFlyingAngel();
});

// Event listener for the "Restart" button
reStartBtn.addEventListener("click", function (e) {
  startGame();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  wordToCheck = document.querySelectorAll(".words span");
  gameStarted = true;
  playFlyingAngel();
});

document.addEventListener("DOMContentLoaded", function () {
  let musicBtn = document.querySelector("#btn-music");
  let mainMusicAudio = document.getElementById("mainAudio");

  let isPlaying = false;

  function toggleMusic() {
    if (isPlaying) {
      mainMusicAudio.pause();
      musicBtn.textContent = "🎵";
    } else {
      mainMusicAudio.play();
      musicBtn.textContent = "🔇";
    }
    isPlaying = !isPlaying;
  }

  musicBtn.addEventListener("click", toggleMusic);
});
