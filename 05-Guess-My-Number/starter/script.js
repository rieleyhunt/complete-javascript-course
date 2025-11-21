
'use strict';

let myNumber = Math.floor(Math.random() * 20);
let message = document.querySelector(".message");
let myNumberField = document.querySelector(".number");
let body = document.querySelector("body");
let scoreText = document.querySelector(".score").textContent;
let score = 20;
let highScore = 0;

let setMessage = function(newMessage) {
    message.textContent = newMessage;
}

document.querySelector(".check").addEventListener('click', function() {
    let guess = document.querySelector(".guess").value;
    if (!guess) {
        message.textContent = "No number inputted...";
    }
    else {
        if (guess == myNumber) {
            setMessage(`You guessed the right number, ${myNumber}!`);
            myNumberField.textContent = String(myNumber);
            body.style.backgroundColor = "#60b347";
            myNumberField.style.width = "20rem";
            if (score > highScore) {
                highScore = score;
                document.querySelector(".highscore").textContent = highScore;
            }
        } else if (guess < myNumber) {
            setMessage(`${guess} is too low!`);
            score--;
        } else if (guess > myNumber) {
            setMessage(`${guess} is too high!`);
            score--;
        }
    }
    document.querySelector(".score").textContent = score;
})

document.querySelector(".again").addEventListener('click', function () {
    myNumber = Math.floor(Math.random() * 10);
    setMessage("Start guessing...");
    body.style.backgroundColor = "#222";
    myNumberField.style.width = "15rem";
    myNumberField.textContent = "?";
    document.querySelector(".guess").value = undefined;
    score = 20;
    document.querySelector(".score").textContent = score;
})