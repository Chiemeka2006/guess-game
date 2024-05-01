"use strict";

/*
console.log(document.querySelector(".right__hints").textContent);
document.querySelector(".right__hints").textContent = "🥳 Correct NUmber!";

document.querySelector(".number__correct").textContent = 13
document.querySelector('.score').textContent = 20

document.querySelector('.left__input').value = 23;
console.log(document.querySelector('.left__input').value)
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = document.querySelector(".high-score");
let highScoreVal = 0;
highScore.textContent = localStorage.getItem("score");

document.querySelector(".left__btn-check").addEventListener('click', function() {
    const guess = Number(document.querySelector('.left__input').value);
    console.log(`${guess} ${typeof guess}`);

    // when there is no input
    if(!guess){
        document.querySelector(".right__hints").textContent =
            "📛 No number!";

    // when player wins
    } else if (guess === secretNumber) {
        document.querySelector(".right__hints").textContent = "🥳 Correct Number";
        document.querySelector('.background').style.backgroundColor = '#60b347'
        document.querySelector(".number__correct").textContent = secretNumber;
        if (score > highScoreVal) {
            highScoreVal = score
            localStorage.setItem('score', highScoreVal)
            highScore.textContent = localStorage.getItem('score');
        }

        // document.querySelector(".number__correct").style.width = '30rem';
        
        // when guess is too high
    } else if (guess > secretNumber) {
        if (score > 1) {
            document.querySelector(".right__hints").textContent = "📈 Too High";
            score--;
            document.querySelector(".score").textContent = score;
        } else {
            document.querySelector(".right__hints").textContent =
            "😿 You Lost the game";
            document.querySelector(".score").textContent = 0;
        }
        
        // when guess is too low
    } else if (guess < secretNumber) {
        if (score > 1) {
            document.querySelector(".right__hints").textContent = "📉 Too Low";
            score--;
            document.querySelector(".score").textContent = score;
        } else {
            document.querySelector(".right__hints").textContent =
            "😿 You Lost the game";
            document.querySelector('.score').textContent = 0;
        }
    }
}) 

const retryBtn = document.querySelector(".retry");

retryBtn.addEventListener('click', function() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    // secretNumber = newNumber
    document.querySelector('.background').style.backgroundColor = '#222'
    document.querySelector('.number__correct').textContent = '?'
    document.querySelector(".right__hints").textContent = "Start guessing...";
    document.querySelector(".score").textContent = 20;
    score = 20;
    document.querySelector('.left__input').value = ''
})



