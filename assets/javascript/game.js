
    var MAX_GUESSES = 12;
    var IMG_ROOT = "assets/images/";


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
      resetGameBoard();
      console.log("New game started");
    }

    function resetGameBoard() {
      updateNumGuessesRemaining(MAX_GUESSES);
      updateLettersGuessed("");
      updateMessage("");
      updateCurrentWord("");
      setImage(IMG_ROOT + "gameOfThrones.jpg", "Game of Thrones");
    }

    function setImage(src, alt) {
      var imgDivId = document.querySelector("#GOT");
      imgDivId.src = src;
      imgDivId.alt = alt;
    }

    function updateWins(num) {
      document.querySelector("#wins").innerHTML = num;
    }

    function updateMessage(msg) {
      document.querySelector("#message").innerHTML = msg;
    }

    function updateNumGuessesRemaining(num) {
      document.querySelector("#num-guesses-remaining").innerHTML = num;
    }

    function updateLettersGuessed(letters) {
      document.querySelector("#letters-guessed").innerHTML = letters;
    }
    function updateCurrentWord(word) {
      document.querySelector("#current-word").innerHTML = word;
    }

    function playGame() {
      if (userInput.includes(event.key)) {
        console.log("event key already in guesses.");
        updateMessage("You already guessed " + event.key);
      } else {
        updateMessage("");
        userInput.push(event.key);
        totalGuesses++;
        console.log("userInput ", userInput);
        console.log("totalGuesses ", totalGuesses);
        updateNumGuessesRemaining(MAX_GUESSES - totalGuesses);
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
      updateCurrentWord(result); 
      var userInputWord = "";
      for (var i = 0; i < userInput.length; i++) {
        userInputWord = userInputWord + userInput[i];
      }
      updateLettersGuessed(userInputWord.toUpperCase());
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
      updateMessage("You lose! " + currentWord + " was the answer.");
      setImage(IMG_ROOT + currentWord + ".jpg", currentWord);
    }

    function winner() {
      gameInProgress = false;
      wins++;
      console.log("you win");
      updateWins(wins);
      updateMessage("You win! Congratulations!");
      setImage(IMG_ROOT + currentWord + ".jpg", currentWord);
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

 