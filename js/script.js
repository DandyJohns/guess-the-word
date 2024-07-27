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
let word = 'magnolia';
// An array to put all the guessed letters in
let guessedLetters = [];
// The maximum number of guesses the player can make. The value will change over time.
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt')
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();
    word = randomWord
    placeHolder(word);
};

getWord();

// Place holders for each letter 
const placeHolder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (event) {
    event.preventDefault(); 
    message.innerText = ""; // Empty message paragraph
    const usersGuess = letterInput.value; // Get the user's guess
    const goodGuess = validateInput(usersGuess); // Validate the input value
    
    if (goodGuess) {
        makeGuess(goodGuess);
    }
    letterInput.value = ""; // Clear the input field
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter one letter.";
    } else if (input.length > 1) {
        message.innerText = "Oops! Please enter a single letter."; 
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Oops! Please enter a single letter between A-Z.";
    } else {
        return input;
    }   
};

const makeGuess = function (guess) {
    const upperCaseGuess = guess.toUpperCase();
    if (guessedLetters.includes(upperCaseGuess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(upperCaseGuess);
        console.log(guessedLetters);
        countGuessesRemaining(upperCaseGuess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () { 
    guessedUL.innerHTML = ""; // Empty UL
    for (const letter of guessedLetters) { // Loop through each letter of guessedLetters array
        const li = document.createElement("li"); // Create a list item
        li.innerText = letter; // Set innerText of li to letter
        guessedUL.append(li); // append li to UL
    }
}; 

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedChars = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedChars.push(letter.toUpperCase());
        } else {
            updatedChars.push("●");
        }
    }
    wordInProgress.innerText = updatedChars.join("");
    checkIfWon();
};

const countGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word does not contain ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
       remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingLetters.classList.add("hide");
    guessedUL.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    // reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedUL.innerHTML = "";
    message.innerText = "";
    // Grab new word
    getWord();

    // Show the corect UI elements
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingLetters.classList.remove("hide");
    guessedUL.classList.remove("hide");
});


