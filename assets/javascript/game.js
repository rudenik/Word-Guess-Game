var moviesList = ["empty", "Back to the Future", "The Breakfast Club", "Ghostbusters",
    "Ferris Buellers Day Off", "The Goonies", "Aliens", "The Empire Strikes Back",
    "Die Hard", "Top Gun", "Stand by Me", "Raiders of the Lost Ark", "Gremlins", "The Terminator", "Sixteen Candles", "Pretty in Pink",
    "Fast Times at Ridgemont High", "Weird Science", "Heathers", "Blade Runner", "Dirty Dancing", "Beetlejuice", "The Princess Bride",
    "The Shining"];
var specialWorld = ["Gnarly", "Tubular", "Way Cool", "Awesome", "Groovy", "Mondo", "Outrageous", "Funky"];
var availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];
var numberOfGuesses = 7;
var gameIsOn = false;
console.log(numberOfGuesses);
var clueArray = [];
var wordToGuess = pickNewWord();
var wordArray = [];
var letterGuessed;
var guessedLetters = [];
var audio;
var winCount=0;
//var lettersGuessArray = [];


window.onload = function () {
    printGameInfo("Press Y key to get started");
    pickNewWord();
    printClue();
    document.addEventListener("keyup", function (e) {
        letterGuessed = e.key;
        console.log(e.key + " key Pressed");
        console.log("letterGuessed: " + letterGuessed);
        letterGuessed = letterGuessed.toLowerCase()
        if (letterGuessed.length > 1) {
            console.log("Not a valid character, ignore it");
        } else if (e.key == 'y' && !gameIsOn && (numberOfGuesses > 0)) {
            gameIsOn = true;
            gameStart();
        } else if ((/^\w+/).test(letterGuessed) && gameIsOn && (numberOfGuesses > 0)) {
            //console.log("true");
            letterGuessed = letterGuessed.toLowerCase()
            //console.log("Number of Guesses: " + numberOfGuesses);
            letterPressed(letterGuessed);
        } else if (document.getElementById('gameinfo').textContent == "Game Over!") {
            console.log("game is over, stop pressing keys");
        } else {
            //console.log("Not a valid Key stroke entered");
            printGameInfo("The Key you pressed isn't valid");
        }
    })
}
function gameStart() {
    printGameInfo("Guess this movie title");
    //console.log("game is on");
    document.getElementById('gameplay').innerHTML = "Shall we play a game?";
    printNumberOfGuesses()
    printLetters();
    buildClue();
    printClue();
    buildWordArray();


}

function printGameInfo(textToPrint) {
    document.getElementById('gameinfo').innerHTML = textToPrint
}
function buildClue() {
    for (letters in wordToGuess) {
        if (wordToGuess.charAt(letters) == " ") {
            clueArray.push("<br>");
        } else {
            clueArray.push(" __");
            //console.log("Clue Array: " + clueArray.length);
        }
    }
}
function buildWordArray() {
    for (letters in wordToGuess) {
        if (wordToGuess.charAt(letters) == " ") {
            wordArray.push("&nbsp;&nbsp;&nbsp;");  
        } else {
            wordArray.push(wordToGuess.charAt(letters))
            //console.log("Added: " + wordToGuess.charAt(letters) + " To word array")
        }
    }
}
function printClue() {
    document.getElementById('wordToGuess').innerHTML = "";
    for (letters in clueArray) {
        document.getElementById('wordToGuess').innerHTML += clueArray[letters] + " ";
        //console.log("clueAarray: " + clueArray);
    }
}
function printLetters() {
    document.getElementById('lettersLeft').innerHTML = "";
    for (letters in availableLetters) {
        document.getElementById('lettersLeft').innerHTML += availableLetters[letters] + " ";
    }
}
function printLettersGuessed(){
    document.getElementById('lettersguessed').innerHTML = "";
    for (letters in guessedLetters){
        document.getElementById('lettersguessed').innerHTML += guessedLetters[letters] + " ";
    }
}
function letterPressed(letter) {
    if (wordToGuess.indexOf(letterGuessed) > -1) {
        //console.log('that letter is in there');
        var indexofEle = availableLetters.indexOf(letterGuessed);
        guessedLetters.push(letterGuessed.toUpperCase());
        console.log("Alpha Index Is: " + indexofEle);
        availableLetters[indexofEle] = "[x]";
        var indices = getAllIndex(wordToGuess, letterGuessed);
        console.log("indices: " + indices)
        for (i = 0; i < indices.length; i++) {
            clueArray[indices[i]] = letterGuessed.toUpperCase();
            console.log("inserted " + letterGuessed + " at index: " + indices[i]);
        }
        printClue();
        printLetters();
        printNumberOfGuesses();
        printLettersGuessed();
        printGameInfo("Correct, that letter is in the word!");
        if (clueArray.indexOf(" __") < 0) {
            printGameInfo("You win!");
            createButton();
            winCount++;
            printWins();
            audio = new Audio('assets/audio/BTTF8bit.mp3');
            audio.play();
        }
    } else {
        numberOfGuesses -= 1;
        var indexofEle = availableLetters.indexOf(letterGuessed);
        if (indexofEle < 0) {
            printGameInfo("You've already guessed that letter");
        } else if (numberOfGuesses < 1) {
            printGameInfo("Game Over!");
            printNumberOfGuesses();
            gameIsOn = false;
            audio = new Audio('assets/audio/MadWorld.mp3');
            audio.play();
            createButton();
        } else {
            //console.log("Index Is: " + indexofEle)
            availableLetters[indexofEle] = "[x]"
            guessedLetters.push(letterGuessed.toUpperCase());
            
            printLetters();
            printLettersGuessed();
            printNumberOfGuesses()
            printGameInfo("Try again, That letter isn't in the title")
        }
    }
}
function printNumberOfGuesses() {
    document.getElementById('remainingGuesses').innerHTML = numberOfGuesses;
}
function printWins(){
    document.getElementById('wincount').innerHTML = winCount;
}
function getAllIndex(word, value) {
    var indexes = [];
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == value) {
            indexes.push(i);
        }
    }
    return indexes;
}
function createButton() {
    var restartButton = document.createElement("BUTTON");
    var textForButton = document.createTextNode("Restart Game");
    //restartButton.setAttribute()
    restartButton.appendChild(textForButton);
    var divForButton = document.getElementById('additionalinfo');
    divForButton.appendChild(restartButton);
    restartButton.addEventListener("click", function () {
        console.log("button clicked");
        restartGame();
        restartButton.remove();
        audio.pause();
    })
}
function restartGame() {
    numberOfGuesses = 7;
    clueArray = [];
    guessedLetters = [];
    pickNewWord();
    buildClue();
    printClue();
    printNumberOfGuesses();
    printLettersGuessed();
    availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'];
    printLetters();
    printGameInfo("Type a letter and guess this movie title")
    gameIsOn = true;
}
function pickNewWord() {
    wordToGuess = moviesList[(Math.floor(Math.random() * moviesList.length) + 1)].toLowerCase();
    //console.log("New Movie title picked: " + wordToGuess);
}
