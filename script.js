// window.addEventListener('load', startGame)
// ===$$$== GLOBALS == $$$==== //
let spans = [];
let points = 0; // will be used to keep track of the player's score
let lifeCount = 3;
let startTime;
let timerInterval;
let gameStarted = false;
let theWord = '';
let theNextWord = '';
let letterIndex = 0;
let nextLetterIndex = 0;

//======$$$$====DOM====$$$$======//
const mainScreen = document.getElementById('main-screen');
const gameScreen = document.getElementById('game-screen');
const gameOver = document.getElementById('game-over-screen');
let startBtn = document.querySelector(".btn-play");
let reStartBtn = document.querySelector(".btn-replay")
let words = document.querySelector(".words");
let nextWords = document.querySelector(".nextWords");
let score = document.querySelector(".words-count")
let life = document.querySelector(".life")
let endScore = document.querySelector(".scoreDisplay")
let timeDuration = document.querySelector(".playDuration")





const list = ['SAMPLE', 'RANDOM', 'WORDS', 'SAMPLE', 'RANDOM', 'WORDS', 'SAMPLE', 'RANDOM', 'WORDS', 'SAMPLE', 'RANDOM', 'WORDS','QUITE','RABBIT','RACE','RADIO','RAILROAD',
'RAIN','RAISE','RAN','RANCH','RANGE','RAPIDLY','RATE','RATHER',
'RAW','RAYS','REACH','READ','READER','READY','REAL','REALIZE',
'REAR','REASON','RECALL','RECEIVE','RECENT','RECENTLY','RECOGNIZE','RECORD',
'RED','REFER','REFUSED','REGION','REGULAR','RELATED','RELATIONSHIP','RELIGIOUS',
'REMAIN','REMARKABLE','REMEMBER','REMOVE','REPEAT','REPLACE','REPLIED','REPORT',
'REPRESENT','REQUIRE','RESEARCH','RESPECT','REST','RESULT','RETURN','REVIEW',
'RHYME','RHYTHM','RICE','RICH','RIDE','RIDING','RIGHT','RING',
'RISE','RISING','RIVER','ROAD','ROAR','ROCK','ROCKET','ROCKY',
'ROD','ROLL','ROOF','ROOM','ROOT','ROPE','ROSE','ROUGH',
'ROUND','ROUTE','ROW','RUBBED','RUBBER','RULE','RULER','RUN',
'RUNNING','RUSH','SAD','SADDLE','SAFE','SAFETY','SAID','SAIL',
'SALE','SALMON','SALT','SAME','SAND','SANG','SAT','SATELLITES',
'SATISFIED','SAVE','SAVED','SAW','SAY','SCALE','SCARED','SCENE',
'SCHOOL','SCIENCE','SCIENTIFIC','SCIENTIST','SCORE','SCREEN','SEA','SEARCH',
'SEASON','SEAT','SECOND','SECRET','SECTION','SEE','SEED','SEEING',]


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

// ===$$$$======START GAME=====$$$$======
const startGame = () => {
    showGameScreen();
    lifeCount = 3;
    points = 0;
    words.innerHTML= "";
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);       
}
// ===$$$===TIMER===$$$====
const updateTimer = () => {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDuration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const stopTimer = () => {
    clearInterval(timerInterval)
}

// ==$$=======GAME OVER =====$$$=========
const gameOverLogic = () => {
    gameStarted = false;
    showGameOver()
    stopTimer()
    // const scoreDisplay = document.querySelector('.words-count');
    // console.log(points);
    endScore.textContent = `Congratulations!!! You typed ${points} words `;
    timeDuration.textContent = `in ${timeDuration.textContent}seconds`

}

const random = () => {
    letterIndex = 0
    words.innerHTML = ""; // clears previous word;
    const currentWordIndex = Math.floor(Math.random() * list.length); //generate random array index;
    theWord = list[currentWordIndex]
    const wordArray = theWord.split("");
    for (let i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = wordArray[i];
    words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}
const nextRandom = () => {
    nextLetterIndex = 0
    nextWords.innerHTML = ""; // clears previous word;
    const currentNextWordIndex = Math.floor(Math.random() * list.length); //generate random array index;
    theNextWord = list[currentNextWordIndex]
    const nextWordArray = theNextWord.split("");
    for (let i = 0; i < nextWordArray.length; i++) { //building the words with spans around the letters
    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = nextWordArray[i];
    nextWords.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}
//=====$$$$$======Checking every typed letters======$$$$$=======//
const typeLetters = (e) => {
    if (!gameStarted) return;
    let typed = e.key.toUpperCase()
    let currentSpan = spans[letterIndex]
    // if (letterIndex === 0) {
    //     startTime();
    // }
    if (currentSpan.textContent === typed) {
        currentSpan.classList.add('bg')
        letterIndex++;
        if (letterIndex === spans.length) {
            random()
            // setTimeout(random, 20)
            setTimeout(nextRandom, 30)
        }
        else if (letterIndex === spans.length-1) {
            points+=1;
            score.textContent = points;
        }
    } else {
        lifeCount-=1;
        console.log(lifeCount);
        currentSpan.classList.add('error')
        setTimeout(() => currentSpan.classList.remove('error'), 200)
        console.log('typo')
    }
    life.textContent = lifeCount;
    if (lifeCount <= 0) {
        gameOverLogic()
    }
}

//===$$$======$$$$===========

document.addEventListener("keydown", typeLetters);
//====$$ CLICK START BUTTON $$==== //
startBtn.addEventListener("click", function(e){
    startGame()
    random();
    nextRandom()
    gameStarted = true;
    
});

reStartBtn.addEventListener("click", function(e){
    startGame()
    random();
    nextRandom()
    gameStarted = true;
   	
});