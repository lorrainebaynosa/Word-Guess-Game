
    var MAX_GUESSES = 12;

    var words = ["targaryen", "lannister", "stark", "bolton", "baratheon"];
    var currentWord = ""
    var wins = 0;
    var userInput = [];
    var totalGuesses = 0;
    var gameInProgress = false;
    var guessedCorrectly = false;

    function selectRandomWord(wordChoices) {
      var numberOfChoices = wordChoices.length;
      var randomIndex = Math.floor(Math.random() * numberOfChoices);
      return wordChoices[randomIndex];
    }

    function startNewGame() {
      gameInProgress = true;
      guessedCorrectly = false;
      currentWord = selectRandomWord(words);
      guessesTaken = 0;
      totalGuesses = 0;
      userInput = [];
      renderWord();
      //reset gameboard//
      document.querySelector("#num-guesses-remaining").innerHTML = MAX_GUESSES;
      document.querySelector("#letters-guessed").innerHTML = "";
      document.querySelector("#message").innerHTML = "";
      console.log("New game started");
    }

    function playGame() {
      if (userInput.includes(event.key)) {
        console.log("event key already in guesses.");
        document.querySelector("#message").innerHTML = "You already guessed " + event.key;
      } else {
        document.querySelector("#message").innerHTML = "";
        userInput.push(event.key);
        totalGuesses++;
        console.log("userInput ", userInput);
        console.log("totalGuesses ", totalGuesses);
        document.querySelector("#num-guesses-remaining").innerHTML = MAX_GUESSES - totalGuesses;
        renderWord();
      }
    }

    function renderWord() {
      var result = "";
      var incorrectGuesses = 0;
      for (var i = 0; i < currentWord.length; i++) {
        var currentLetter = currentWord.charAt(i);
        if (userInput.includes(currentLetter)) {
          result = result + currentLetter;
        } else {
          result = result + "_";
          incorrectGuesses++;
        }
      }
      console.log(result);
      document.querySelector("#current-word").innerHTML = result;
      var userInputWord = "";
      for (var i = 0; i < userInput.length; i++) {
        userInputWord = userInputWord + userInput[i];
      }
      document.querySelector("#letters-guessed").innerHTML = userInputWord.toUpperCase();
      if (incorrectGuesses === 0) {
        winner();
      }
      //testing if lose after 12th wrong guess
      if ((MAX_GUESSES - totalGuesses) === 0 && incorrectGuesses > 0) {
        endGame();
      }
    }

    function endGame() {
      gameInProgress = false;
      console.log("you lose");
      document.querySelector("#message").innerHTML = "You lose! Brush up on GOT!";
    }

    function winner() {
      gameInProgress = false;
      wins++;
      console.log("you win");
      document.querySelector("#wins").innerHTML = wins;
      document.querySelector("#message").innerHTML = "You win! Congratulations";
    }

    document.addEventListener('keyup', function (event) {
      if (gameInProgress === false) {
        startNewGame();
      }
      else {
        if (totalGuesses >= MAX_GUESSES) {
          endGame()
        }
        else {
          playGame();
        }
      }
    });

 