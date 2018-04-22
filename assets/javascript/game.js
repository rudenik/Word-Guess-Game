var moviesList = ["Back to the Future", "The Breakfast Club", "Ghostbusters",
    "Ferris Buellers Day Off", "The Goonies", "Aliens", "The Empire Strikes Back",
    "Die Hard"];
var specialWorld = ["Gnarly", "Tubular", "Way Cool", "Awesome", "Groovy", "Mondo", "Outrageous", "Funky"];
var availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];
var numberOfGuesses = 3;
var gameIsOn = false;
console.log(numberOfGuesses);
var clueArray = [];
var wordToGuess = moviesList[6].toLocaleLowerCase();
var wordArray = [];
var letterGuessed;
var guessedLetters = [];
//buildClue();
//buildWordArray();

window.onload = function () {
    printGameInfo("Press Y key to get started");
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
            console.log("true");
            letterGuessed = letterGuessed.toLowerCase()
            console.log("Number of Guesses: " + numberOfGuesses);
            letterPressed(letterGuessed);
        } else if (document.getElementById('gameinfo').textContent == "Game Over!") {
            console.log("game is over, stop pressing keys");
        } else {
            console.log("Not a valid Key stroke entered");
            printGameInfo("The Key you pressed isn't valid");
        }
    })
}
function gameStart() {
    printGameInfo("Guess This word");
    //gameIsOn=true;
    console.log("game is on");
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
            clueArray.push("&nbsp;&nbsp;&nbsp;");
        } else {
            clueArray.push(" __");
            console.log("Clue Array: " + clueArray.length);
        }

    }
}
function buildWordArray() {
    for (letters in wordToGuess) {
        if (wordToGuess.charAt(letters) == " ") {
            wordArray.push("&nbsp;&nbsp;&nbsp;");
        } else {
            wordArray.push(wordToGuess.charAt(letters))
            console.log("Added: " + wordToGuess.charAt(letters) + " To word array")
        }
    }
}
function printClue() {
    document.getElementById('wordToGuess').innerHTML = "";
    for (letters in clueArray) {
        document.getElementById('wordToGuess').innerHTML += clueArray[letters] + " ";
        console.log("clueAarray: " + clueArray);
    }
}
function printLetters() {
    document.getElementById('lettersLeft').innerHTML = "";
    for (letters in availableLetters) {
        document.getElementById('lettersLeft').innerHTML += availableLetters[letters] + " ";

    }
}
function letterPressed(letter) {
    if (wordToGuess.indexOf(letterGuessed) > -1) {
        console.log('that letter is in there');
        var indexofEle = availableLetters.indexOf(letterGuessed);
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
        printGameInfo("Correct, that letter is in the word!");
        if (clueArray.indexOf(" __") < 0) {
            printGameInfo("You win!");
        }

    } else {
        console.log(letter + ': not there');
        numberOfGuesses -= 1;
        guessedLetters.push(letter);
        var indexofEle = availableLetters.indexOf(letterGuessed);
        if (indexofEle < 0) {
            printGameInfo("You've already guessed that letter");
        } else if (numberOfGuesses < 1) {
            printGameInfo("Game Over!");
            printNumberOfGuesses();
            gameIsOn = false;
        } else {
            console.log("Index Is: " + indexofEle)
            availableLetters[indexofEle] = "[x]"
            printLetters();
            printNumberOfGuesses()
            printGameInfo("Try again, That letter isn't in the word")
        }
    }
}
function printNumberOfGuesses() {
    document.getElementById('remainingGuesses').innerHTML = numberOfGuesses;
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
/* Add button for restart
-return number of guesses to original number
-choose new word
-set game to on. 
-hide restart button

fix word/movie choosing method
incorperate contra code
sounds for the site

ascii art for game over, skull cross bones for lose/the more you know for win
*/