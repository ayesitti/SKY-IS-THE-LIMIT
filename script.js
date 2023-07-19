// window.addEventListener('load', startGame)
//Globals
let wordToCheck = [];
let points = 0; // will be used to keep track of the player's score
let lifeCount = 3;
let startTimeStamp;
let timerInterval;
let gameStarted = false;
let theWord = "";
let theNextWord = "";
let letterIndex = 0;

//======$$$$====DOM====$$$$======//
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

//=====$$$$$=====RESET THE VARIABLES=======$$$$$=============
// const initGame = () => {
// spans = [];
// points = 0; // will be used to keep track of the player's score
// lifeCount = 3;
// startTimeStamp;
// timerInterval;
// gameStarted = false;
// theWord = '';
// theNextWord = '';
// letterIndex = 0;
// nextLetterIndex = 0;
// }

// $$$$=====Show the main screen=====$$$$//
const showMainScreen = () => {
  mainScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  gameOver.classList.add("hidden");
};

// $$$$=====Show the game screen=====$$$$//
const showGameScreen = () => {
  mainScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameOver.classList.add("hidden");
};

// $$$$=====Show the game over screen=====$$$$//
const showGameOver = () => {
  mainScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  gameOver.classList.remove("hidden");
};

// ===$$$===TIMER===$$$====
const updateTimer = () => {
  const currentTime = Math.floor((Date.now() - startTimeStamp) / 1000);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDuration.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
const endGameTime = () => {
  const currentTime = Math.floor((Date.now() - startTimeStamp) / 1000);
  timeDuration.textContent = currentTime;
};
const startTimer = () => {
  startTimeStamp = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};
// ===$$$$======START GAME=====$$$$======
const startGame = () => {
  // initGame();
  showGameScreen();
  lifeCount = 3;
  points = 0;
  currentWordContainer.innerHTML = "";
  nextWordContainer.innerHTML = "";
  startTimer();
  timerInterval = setInterval(updateTimer, 1000);
};

// ==$$=======GAME OVER =====$$$=========
const gameOverLogic = () => {
  gameStarted = false;
  showGameOver();
  stopTimer();
  // const scoreDisplay = document.querySelector('.words-count');
  // console.log(points);
  endScore.textContent = `GAME OVER! You typed ${points} word(s) `;
  endTime.textContent = `in ${endTime.textContent}seconds`;
};
// const nextRandom = () => {
//   nextWord.innerHTML = ""; // clears previous word;
//   const currentNextWordIndex = Math.floor(Math.random() * list.length); //generate random array index;
//   theNextWord = list[currentNextWordIndex];
//   const nextWordArray = theNextWord.split("");
//   createSpans(nextWordArray, nextWord);
// };
const random = (container, theWord) => {
  letterIndex = 0;
  container.innerHTML = ""; // clears previous word;
  const currentWordIndex = Math.floor(Math.random() * list.length); //generate random array index
  theWord = list[currentWordIndex];
  const wordArray = theWord.split("");

  createSpans(wordArray, container);

  // const currentNextWordIndex = Math.floor(Math.random() * list.length); //generate random array index
  // theNextWord = list[currentNextWordIndex]
  // const nextWordArray = theNextWord.split("");
  // for (let i = 0; i < nextWordArray.length; i++) {
  // const span = document.createElement("span");
  // span.classList.add("span");
  // span.textContent = nextWordArray[i];
  // words.appendChild(span);
  // }

  //   wordToCheck = document.querySelectorAll(".span");
};

function createSpans(word, parent) {
  for (let i = 0; i < word.length; i++) {
    console.log(word[i]);
    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = word[i];
    parent.appendChild(span);
  }
}

let bottom = 0;
let gravity = .12;
let isJumping = false;
function jumpChar() {
    if (isJumping) return;
    let jumpUpTimerId = setInterval( () => {
        if (bottom > 300) {
            clearInterval(jumpUpTimerId)
            let downTimerId = setInterval(() => {
                if (bottom < 0) {
                    clearInterval(downTimerId)
                    isJumping = false;
                }
                bottom -=5
                angelInGame.style.bottom = bottom + 'px'   
            }, 20)
        }
        isJumping = true;
        bottom += 30;
        bottom = bottom + gravity;
        console.log(bottom);
        angelInGame.style.bottom = bottom + "px";
    }, 20)
}

//=====$$$$$======Checking every typed letters======$$$$$=======//
const typeLetters = (e) => {
  if (!gameStarted) return;
  let typed = e.key.toUpperCase();
  let currentSpan = wordToCheck[letterIndex];
  // if (letterIndex === 0) {
  //     startTimer();
  // }
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
      jumpChar();
      letterIndex = 0;
      //   wordToCheck = [...spansTwo];
      // random();
      // nextRandom()
      // setTimeout(random, 20)
      // setTimeout(random, 30)
    }
  } else {
    lifeCount -= 1;
    console.log(lifeCount);
    currentSpan.classList.add("error");
    setTimeout(() => currentSpan.classList.remove("error"), 200);
    console.log("typo");
  }
  life.textContent = lifeCount;
  if (lifeCount <= 0) {
    gameOverLogic();
  }
};

//===$$$======$$$$===========

document.addEventListener("keydown", typeLetters);
//====$$ CLICK START BUTTON $$==== //
startBtn.addEventListener("click", function (e) {
  startGame();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  wordToCheck = document.querySelectorAll(".words span");
  console.log(wordToCheck, nextWordContainer, currentWordContainer);
  gameStarted = true;
});

reStartBtn.addEventListener("click", function (e) {
  startGame();
  random(currentWordContainer, theWord);
  random(nextWordContainer, theNextWord);
  gameStarted = true;
});
