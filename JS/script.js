// Get All Elements
let selectLevel = document.querySelector(".level-select"),
    detailsDiv = document.querySelector(".details"),
    levelName = document.querySelector(".span-level"),
    levelTime = document.querySelector(".span-seconds"),
    startBtn = document.querySelector(".start"),
    randomWord = document.querySelector(".random-word"),
    myInput = document.querySelector(".input"),
    wordsBox = document.querySelector(".words-box"),
    timeDiv = document.querySelector(".time"),
    secondsLeft = document.querySelector(".seconds-left"),
    minScore = document.querySelector(".min-score"),
    maxScore = document.querySelector(".max-score"),
    finishGame = document.querySelector(".finish-game");

// Levels Time
let levels = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 2,
}

// Words for the game
const testWords = [
    "HTML",
    "CSS",
    "Code",
    "Programming",
    "Javascript",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Destructuring",
    "Styling",
    "CSS",
    "Documentation",
    "Coding",
    "Working",
    "Dependencies",
    "Task Runners",
    "Roles",
    "Test",
    "Rust",
    "OOP",
    "Data Structure",
    "Algorithm",
    "Parameters",
    "Arguments",
    "Compiler",
    "Loops",
    "Pointer",
    "Array",
    "Keyword",
    "Variable",
    "Operators",
    "Functions",
    "API",
    "Version Control",
    "Operating System",
    "DRY",
    "Debugging",
    "Databases",
    "Objects",
    "Class",
    "Syntax",
    "ASCII",
    "Library",
    "Framework",
    "Data Types",
    "Flowchart",
];

// Disable pasting in input field
myInput.onpaste = () => false;

// Its implementation down
hideAll();

// Select a level
selectLevel.onchange = function () {
    // Disable all options
    selectLevel.disabled = true;

    displayAll();

    levelName.innerHTML = this.value;
    levelTime.innerHTML = levels[levelName.innerHTML];

    // Initiate time left and score
    secondsLeft.innerHTML = levels[levelName.innerHTML] * testWords.length;
    minScore.innerHTML = 0;
    maxScore.innerHTML = testWords.length;
};

// Start the game
startBtn.addEventListener("click", () => {
    // Disable the button so the user can't click it again and get a problem
    startBtn.disabled = true;

    // Hide start button
    hideStart();
    // Get All Words I have
    addWords();

    // Add a random word to div
    setTimeout(() => {
        myInput.disabled = false;
        myInput.focus();
        randWord();
    }, 3500);

    setTimeout(() => {
        // Decrease left time
        leftTime();
    }, 3000);
})

// Input processing and compare values
myInput.addEventListener("keyup", (event) => {
    let wordIndex = testWords.indexOf(randomWord.innerHTML);
    if (event.code === "Enter") {
        if (randomWord.innerHTML.toLowerCase() === myInput.value.toLowerCase()) {
            // Start increase the score
            minScore.innerHTML++;

            // Check if the user win 
            if (minScore.innerHTML == maxScore.innerHTML) {
                // Hide some divs
                wordsBox.style.cssText =
                myInput.style.cssText =
                randomWord.style.cssText = "display:none;"

                // Add the result to page (Winner)
                winner();
            }
            // Remove the word from our array & Add all words to words-box again
            testWords.splice(wordIndex, 1);
            wordsBox.innerHTML = "";
            addWords();

            // Empty the input field and the random word & get new random word
            myInput.value = "";
            randWord();

        } else {
            // Add the result to page (Loser)
            loser();
        }
    }
})

// Hide everything untill the user select a level
function hideAll() {
    detailsDiv.style.cssText =
        startBtn.style.cssText =
        randomWord.style.cssText =
        myInput.style.cssText =
        wordsBox.style.cssText =
        finishGame.style.cssText =
        timeDiv.style.cssText = "display:none;"
}

// Show everything
function displayAll() {
    detailsDiv.style.cssText =
        startBtn.style.cssText =
        randomWord.style.cssText =
        myInput.style.cssText =
        wordsBox.style.cssText =
        finishGame.style.cssText =
        timeDiv.style.cssText = "display:flexbox;"

    myInput.disabled = true;
}

// Hide Start Button
function hideStart() {
    startBtn.innerHTML = 3;
    let ready = setInterval(() => {
        startBtn.innerHTML--;
        if (startBtn.innerHTML == '0') {
            clearInterval(ready);
            startBtn.style.cssText = "opacity:0%;";
            setTimeout(() => {
                startBtn.style.cssText = "display:none;";
            }, 500);
        }
    }, 1000);
}

// Add all words to my words-box
function addWords() {
    for (let index = 0; index < testWords.length; index++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("word-box");
        let newText = document.createTextNode(testWords[index]);
        newDiv.appendChild(newText);
        wordsBox.appendChild(newDiv);
    }
}

// Get a random word
function randWord() {
    // Show the random word
    randomWord.innerHTML = '';
    randomWord.innerHTML = testWords[Math.floor(Math.random() * testWords.length)];
}

// Start decreasing secondsLeft var
function leftTime() {
    secondsLeft.innerHTML = levels[levelName.innerHTML] * testWords.length;
    let secLeft = setInterval(() => {  
        if (secondsLeft.innerHTML-- == "1") {
            clearInterval(secLeft);
            loser()
        }
    }, 1000);
}

// Create the winning text
function winner() {
    let finishDiv = document.createElement("div"),
    finishText = document.createTextNode("Winner Winner Chicken Dinner");
    finishDiv.classList.add("win");
    finishDiv.appendChild(finishText);
    finishGame.appendChild(finishDiv);
    secondsLeft = 0;
}

// Create the losing text
function loser() {
    myInput.disabled = true;
    let finishDiv = document.createElement("div"),
    finishText = document.createTextNode("Game Over");
    finishDiv.classList.add("lose");
    finishDiv.appendChild(finishText);
    finishGame.appendChild(finishDiv);
    secondsLeft = 0;
}