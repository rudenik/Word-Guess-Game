window.onload = function(){
    
var moviesList = ["Back to the Future", "The Breakfast Club", "Ghostbusters", 
                "Ferris Bueller's Day Off", "The Goonies", "Aliens", "The Empire Strikes Back", 
                "Die Hard"];
var numberOfGuesses = 14;
console.log(numberOfGuesses);



    document.getElementById('remainingGuesses').innerHTML = numberOfGuesses;
    

//for(var i=0; i < moviesList.length; i++){
  //  document.write(moviesList[i]+" <br>");
//}
function displayNumGuess(){
    return numberOfGuesses;
}

}