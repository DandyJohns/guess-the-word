// The unordered list where the player’s guessed letters will appear.
const guessedUL = document.querySelector(".guessed-letters");

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
    
    const goodGuess = validateInput(usersGuess); // validate the input value
    
    if(goodGuess != undefined) {
        makeGuess(goodGuess);
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
    const upperCaseGuess = guess.toUpperCase();
    if(guessedLetters.includes(upperCaseGuess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(upperCaseGuess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () { 
    guessedUL.innerHTML = ''; // Empty UL
    for (const letter of guessedLetters) { // Loop through each letter of guessedLetters array
        const li = document.createElement("li"); // Create a list item
        li.innerText = letter; // Set innerText of li to letter
        guessedUL.append(li); // append li to UL
    }
}; 

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split('');
    const updatedChars = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedChars.push(letter.toUpperCase());
        } else {
            updatedChars.push('●');
        }
    }
    //console.log(updatedChars);
    wordInProgress.innerText = updatedChars.join('');
    checkIfWon();
};

const checkIfWon = function () {
    const textOfWordInProgress = wordInProgress.innerText
    if (word.toUpperCase() === textOfWordInProgress.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML= '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};
