"use strict";
const input = document.querySelector(".left__input");
const backColor = document.querySelector(".background");
const winAudio = document.querySelector(".win");
const failAudio = document.querySelector(".fail");
const gameOverAudio = document.querySelector(".game-over");
const checkBtn = document.querySelector(".left__btn-check");
const retryBtn = document.querySelector(".retry");
const guessedNum = document.querySelector(".number__correct");
const scores = document.querySelector(".points");
const highScore = document.querySelector(".high-score");
const hintBox = document.querySelector(".hint-box");
const settingTitle = document.querySelector(".setting__title");
const settingTitleImg = document.querySelector(".setting__title img");
const settingPanel = document.querySelector(".setting__panel");
const themeText = document.querySelector(".last > p");
const setting = document.querySelector(".setting");
const theme = document.querySelector(".theme");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const indicator = document.querySelector(".theme .indicator");
const easyIndicator = document.querySelector(".easy .indicator");
const mediumIndicator = document.querySelector(".medium .indicator");
const HardIndicator = document.querySelector(".hard .indicator");
const commonLevel = document.querySelectorAll(".level");
const commonLevelInner = document.querySelectorAll(".level-inner");
const difficultText = document.querySelector(".difficult");

let difficulty = 20;
difficulty = localStorage.getItem("difficultyVal");
let difficultyVal = difficulty;
let secretNumber = Math.trunc(Math.random() * difficultyVal) + 1;
console.log(secretNumber);
let scoreVal = 20;
let highScoreVal = 0;
let stat = 0;
stat = Number(localStorage.getItem("status"));
lightDark();
highScore.textContent = localStorage.getItem("highscore");
difficultyLevel();
commonLevel.forEach((elem) => {
    elem.addEventListener("click", () => {
        difficultyLevel();
        difficultyVal = localStorage.getItem("difficultyVal");
        difficultyLevel();
        secretNumber = Math.trunc(Math.random() * difficultyVal) + 1;
        console.log(
            `secret number: ${secretNumber} at difficulty: ${difficultyVal}`
        );
        // console.log(difficulty)
    });
});

function difficultyLevel() {
    localStorage.setItem("difficultyVal", difficulty);
    commonLevel[0].addEventListener("click", () => {
        difficulty = 20;
    });
    commonLevel[1].addEventListener("click", () => {
        difficulty = 200;
    });
    commonLevel[2].addEventListener("click", () => {
        difficulty = 2000;
    });
    if (difficultyVal == 20) {
        commonLevelInner[0].classList.add("difficulty-active");
        commonLevelInner[1].classList.remove("difficulty-active");
        commonLevelInner[2].classList.remove("difficulty-active");
    } else if (difficultyVal == 200) {
        commonLevelInner[1].classList.add("difficulty-active");
        commonLevelInner[0].classList.remove("difficulty-active");
        commonLevelInner[2].classList.remove("difficulty-active");
    } else if (difficultyVal == 2000) {
        commonLevelInner[2].classList.add("difficulty-active");
        commonLevelInner[1].classList.remove("difficulty-active");
        commonLevelInner[0].classList.remove("difficulty-active");
    }
    difficultText.textContent = difficultyVal;
}

function fails(variable, variableDef) {
    failAudio.play();
    scoreVal-=1;
    scores.textContent = scoreVal;
    if (scoreVal === 18) {
        let hintEvenOrOdd = document.createElement("li");
        secretNumber % 2
            ? (hintEvenOrOdd.textContent = `It is an odd number`)
            : (hintEvenOrOdd.textContent = `It is an even number`);
        hintBox.appendChild(hintEvenOrOdd);
    } else if (scoreVal < 1) {
        gameOverAudio.play();
        scores.textContent = 0;
        backColor.style.backgroundColor = "rgb(138, 3, 3)";
        // retry();
    }
    variable.textContent = `Try guessing a ${variableDef} number`;
    hintBox.appendChild(variable);
}

function retry() {
    scoreVal = 20;
    scores.textContent = scoreVal;
    stat === 0
        ? (backColor.style.backgroundColor = "#eee")
        : (backColor.style.backgroundColor = "#222");
    input.value = "";
    guessedNum.textContent = "?";

    while (hintBox.hasChildNodes) {
        hintBox.removeChild(hintBox.lastChild);
    }
}

function check() {
    const guess = Number(input.value);

    // if your guess is correct
    if (guess === secretNumber) {
        winAudio.play();
        backColor.style.backgroundColor = "#60b347";
        guessedNum.textContent = secretNumber;
        if (scoreVal > highScoreVal) {
            highScoreVal = scoreVal;
            localStorage.setItem("highscore", highScoreVal);
            highScore.textContent = localStorage.getItem("highscore");
        }
        // if your guess is lower than the number
    } else if (guess < secretNumber) {
        let higher = document.createElement("li");
        fails(higher, "higher");

        // if your guess is higher than the number
    } else if (guess > secretNumber) {
        let lower = document.createElement("li");
        fails(lower, "lower");
    }
}

function lightDark() {
    localStorage.setItem("status", stat);
    stat = Number(localStorage.getItem("status"));
    if (stat === 1) {
        // for light mode
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        settingTitleImg.setAttribute("src", "icons/settingdark.svg");
        themeText.textContent = "Light:";
        stat = 0;
    } else if (stat === 0) {
        // for dark mode
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        settingTitleImg.setAttribute("src", "icons/setting.svg");
        themeText.textContent = "Dark:";
        stat = 1;
    }
}

checkBtn.addEventListener("click", function () {
    check();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        check();
    }
});

retryBtn.addEventListener("click", () => {
    retry();
});

settingTitle.addEventListener("click", () => {
    settingPanel.classList.toggle("panel-active");
    // settingPanel.classList.contains("panel-active")
    //     ? (setting.style.right = "1rem")
    //     : (setting.style.right = "0rem");
    settingTitleImg.classList.toggle("rotate");
    // settingPanel.style.maxWidth = '20rem'
});
document.addEventListener('click', (e) => {
    if (!settingPanel.contains(e.target) && !settingTitle.contains(e.target)) {
        settingPanel.classList.remove('panel-active')
    }
})

theme.addEventListener("click", () => {
    lightDark();
});

// check()
