'use strict';

var secretWord = getSecretWord();
var secretWordArray = secretWord.toUpperCase().split("");
var wordPlaceHolder = document.getElementsByClassName("wordPlaceholder")[0];
var life = 6;
var imageNum = 0;

// initializer
function init() {
    document.getElementById("LetterInput").value = "";
    document.getElementById("LetterInput").focus();
    document.getElementById("Life").innerHTML = life;
}


// create holders for letters in the secret word
function createLetterHolders() {
    init();
    wordPlaceHolder.removeChild(wordPlaceHolder.childNodes[0]);
    for (var item in secretWordArray) {
        var div = document.createElement("div");
        var span = document.createElement("span");
        var text = document.createTextNode(secretWordArray[item]);
        div.appendChild(span);
        span.appendChild(text);
        wordPlaceHolder.appendChild(div);
    }
}
createLetterHolders();


// get secret word from the library
function getSecretWord() {
    var library = ["apple", "banana", "orange", "lemon", "pear", "kiwi", "strawberry"];
    var randomIndex = Math.floor(Math.random() * library.length);
    return library[randomIndex];
}


// remaining lives calculator
function calculateLives() {
    life--;
    document.getElementById("Life").innerHTML = life;
}

// gameplay main logic
function tryTheLetter() {
    if (event.which == 13 || event.keyCode == 13) {
        checkIfHasError();
        checkIfInputEmpty();

        var guessLetter = document.getElementById("LetterInput").value.toUpperCase();

        // check if the guess letter matched
        if (life > 0 && document.getElementById("LetterInput").value) {
            for (var item in secretWordArray) {
                if (secretWordArray[item] == guessLetter) {
                    wordPlaceHolder.children[item].className = "matched";
                }
            }

            if (document.querySelectorAll("div.matched").length == secretWordArray.length) {
                document.getElementById("Result").innerHTML = "<span class='win'>Congratulations!!!</span>";
                document.getElementById("LetterInput").className = "disabled";
                document.getElementById("LetterInput").disabled = true;
                document.getElementById("HangmanImg").src = "images/hangman7.png";
            }

            // change images
            if (!secretWordArray.includes(guessLetter) && document.getElementById("LetterInput").value) {
                imageNum++;
                document.getElementById("HangmanImg").src = "images/hangman" + imageNum + ".png";
                calculateLives();
            }

            init();
        }

        // if game over, show the answer
        if (life == 0) {
            document.getElementById("Result").innerHTML = "<span class='gameOver'>Game Over.</span>";
            document.getElementById("LetterInput").className = "disabled";
            document.getElementById("LetterInput").disabled = true;
            for (var item in secretWordArray) {
                document.querySelectorAll(".wordPlaceholder div span")[item].style.visibility = "visible";
            }
        }
    }
}


// checking exceptions
function checkIfHasError() {
    var hasError = document.getElementsByClassName("error");
    if (hasError.length > 0) {
        document.getElementById("LetterInput").classList.remove("error");
        document.getElementById("Message").innerHTML = "";
    }
}

function checkIfInputEmpty() {
    if (!document.getElementById("LetterInput").value) {
        document.getElementById("Message").innerHTML = "Can't be empty!";
        document.getElementById("LetterInput").className = "error";
        document.getElementById("LetterInput").focus();
    }
}