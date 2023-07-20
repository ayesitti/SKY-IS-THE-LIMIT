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
// const heartOne = document.getElementById("heart1");
// const heartTwo = document.getElementById("heart2");
// const heartThree= document.getElementById("heart3");
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
// const heartsContainer = document.querySelector(".hearts-container");
// const hearts = heartsContainer.querySelectorAll(".heart");
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

//=====$$$$$=====RESET THE VARIABLES=======$$$$$=============
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
  endTime.textContent = currentTime;
  console.log(currentTime);
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
  lifeCount = 3;
  initGame();
  showGameScreen();
  endGameTime();
  startTimer();
  timerInterval = setInterval(updateTimer, 1000);
};

// ==$$=======GAME OVER =====$$$=========
const gameOverLogic = () => {
  gameStarted = false;
  showGameOver();
  stopTimer();
  endGameTime();
  
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


// let bottom = 0;
// let gravity = 0.12;
// let isJumping = false;
// function jumpChar() {
//   if (isJumping) return;
//   let jumpUpTimerId = setInterval(() => {
//     if (bottom > 300) {
//       clearInterval(jumpUpTimerId);
//       let downTimerId = setInterval(() => {
//         if (bottom < 0) {
//           clearInterval(downTimerId);
//           isJumping = false;
//         }
//         bottom -= 5;
//         angelInGame.style.bottom = bottom + "px";
//       }, 20);
//     }
//     isJumping = true;
//     bottom += 30;
//     bottom = bottom + gravity;
//     console.log(bottom);
//     angelInGame.style.bottom = bottom + "px";
//   }, 10);
// }

//=====$$$$$======Checking every typed letters======$$$$$=======//
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
      console.log(points);
      angelInGame.classList.add('jumpAnimation')
      setTimeout(() => angelInGame.classList.remove("jumpAnimation"), 1000);
      //jumpChar();
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
    hearts[0].classList.add("hidden")
    console.log("decrement the heart");
    
  }
  //   life.textContent = lifeCount;
  if (lifeCount <= 0) {
    gameOverLogic();
  }

  //   for (let i=1; i <= 3; i++) {
  //     const heart = document.querySelectorAll(`hearts${i}`);
  //     if (i > lifeCount) {
  //         heart.style.display = 'none';
  //     } else {
  //         heart.style.display = 'inline-block'
  //     }
  //   }
};
// const updateHearts = (lifeCount) => {
// //   const heartsContainer = document.querySelector(".hearts-container");
// //   const hearts = heartsContainer.querySelectorAll(".heart");
//   hearts[0].classList.add("hidden");
// //   if (gameStarted) {
// //     hearts[0].classList.remove("hidden")
// // //   }
// //   for (let i = 3; i > 0; i--) {
// //       hearts[0].classList.add("hidden");
// //   }
// }

// const removeHearts = () => {
//   if (lifeCount === 3) {
//     heartThree.classList.remove("hidden")
//     heartTwo.classList.remove("hidden")
//     heartOne.classList.remove("hidden")
//   }
//    if (lifeCount === 2) {
//     heartThree.classList.add("hidden")
//     heartTwo.classList.remove("hidden")
//     heartOne.classList.remove("hidden")
//   }
//   if (lifeCount === 1) {
//     heartThree.classList.add("hidden")
//     heartTwo.classList.add("hidden")
//     heartOne.classList.remove("hidden")
//   }
//   else {
//     heartThree.classList.add("hidden")
//     heartTwo.classList.add("hidden")
//     heartOne.classList.add("hidden")
//   }
// }
//====$$ CLICK BUTTON $$==== //

document.addEventListener("keydown", typeLetters);

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
