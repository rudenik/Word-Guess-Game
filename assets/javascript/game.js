var moviesList = ["Back to the Future", "The Breakfast Club", "Ghostbusters",
        "Ferris Bueller's Day Off", "The Goonies", "Aliens", "The Empire Strikes Back",
        "Die Hard"];
    var specialWorld = ["Gnarly", "tubular", "Way Cool", "Awesome", "Groovy", "Mondo", "Outrageous", "Funky"];
    var availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'];
    var numberOfGuesses = 14;
    var gameIsOn = false;
    console.log(numberOfGuesses);
    var clueArray = [];
    var wordToGuess = specialWorld[1];
    var letterGuessed ;
    var guessedLetters = [];
    buildClue();

window.onload = function () {

    
    document.addEventListener("keyup", function (e) {
        //console.log(e.key);
        letterGuessed = e.key;
        console.log("Number of Guesses: " + numberOfGuesses);
        if (e.key == 'y' && !gameIsOn) {
            console.log("y key pressed");
            gameIsOn = true;
            gameStart();
            

        } else {
            console.log(e.key + " key Pressed");
        }
        letterPressed(e);

    })
}
    function gameStart() {
        while (gameIsOn) {
            if (numberOfGuesses > 0 ){
            console.log("game is on");
            document.getElementById('gameplay').innerHTML = "Shall we play a game?";
            //document.getElementById('remainingGuesses').innerHTML = numberOfGuesses;
            printNumberOfGuesses()
            printLetters();
            printClue();
            //document.getElementById('lettersLeft').innerHTML = availableLetters;
            // if (wordToGuess.indexOf(letterGuessed) > -1 ){
            //     console.log('that letter is in there');
            // }
            gameIsOn = false;
        } else {
            document.getElementById('remainingGuesses').innerHTML = "Game Over"
            console.log("Game Over");
            gameIsOn = false;

        }
        }
    }
    function buildClue(){
        for (letters in specialWorld[1]){
            clueArray.push(" __")
            console.log("Clue Array: " + clueArray.length)
        }
    }
    function printClue(){
        document.getElementById('wordToGuess').innerHTML = "";
        for (letters in clueArray){
            document.getElementById('wordToGuess').innerHTML +=  clueArray[letters] + " ";
            console.log("clueAarray: " + clueArray);
        }
    }
    function printLetters(){
        // if(!gameIsOn){
        // document.getElementById('lettersLeft').innerHTML= "";
        // }else{
        document.getElementById('lettersLeft').innerHTML= "";
        for (letters in availableLetters){
        document.getElementById('lettersLeft').innerHTML += availableLetters[letters] + " ";
        //}
    }
}
    function letterPressed(letter){
        if (wordToGuess.indexOf(letterGuessed) > -1 ){
            console.log('that letter is in there');
            var indexofEle=availableLetters.indexOf(letterGuessed);
            console.log("Index Is: " + indexofEle)
            availableLetters[indexofEle]="[x]"
            var clueIndex=clueArray.indexOf(letterGuessed);
            clueArray[clueIndex] = letterGuessed.toUpperCase(); //Problem here
            printClue();
            printLetters();
            printNumberOfGuesses();
        } else {
            console.log(letter + ': not there');
            numberOfGuesses -= 1;
            guessedLetters.push(letter);
            var indexofEle=availableLetters.indexOf(letterGuessed);
            console.log("Index Is: " + indexofEle)
            availableLetters[indexofEle]="[x]"
            printLetters();
            printNumberOfGuesses()
        }
    }
    function printNumberOfGuesses(){
        document.getElementById('remainingGuesses').innerHTML = numberOfGuesses;
    }
    // 


    //for(var i=0; i < moviesList.length; i++){
    //  document.write(moviesList[i]+" <br>");
    //}
//}
