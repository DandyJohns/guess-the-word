// The unordered list where the player’s guessed letters will appear.
const guessed = document.querySelector(".guessed-letters");

// The button with the text “Guess!” in it. 
const guessButton = document.querySelector(".guess");

//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");

// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");

//The paragraph where the remaining guesses will display.  
const remainingLetters = document.querySelector(".remaining");

// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");

// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");


// Starting word to test out the game until you fetch words from a hosted file in a later step. //
const word = 'magnolia';
const guessedLetters = [];



// Place holders for each letter 
const placeHolder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push('●');
    }
    wordInProgress.innerText = placeholderLetters.join('');
};

placeHolder(word);

guessButton.addEventListener('click', function (event) {
    event.preventDefault(); // Empty message paragraph
    const usersGuess = letterInput.value; // Get the user's guess
    message.innerText = '';
    
    const goodGuess = validateInput(usersGuess) // validate the input value
    
    if(goodGuess != undefined) {
        console.log(goodGuess)
        makeGuess(goodGuess)
    }

    letterInput.value = ''; // Clear the input field
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = 'Please enter one letter.';
    } else if (input.length > 1) {
        message.innerText = 'Oops! Please enter a single letter.'; 
    } else if (!input.match(acceptedLetter)) {
        message.innerText = 'Oops! Please enter a single letter between A-Z.';
    } else {
        return input;
    }   
};

const makeGuess = function (guess) {
    const upperCaseGuess = guess.toUpperCase()

    if(guessedLetters.includes(upperCaseGuess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(upperCaseGuess)
    }
}

            
