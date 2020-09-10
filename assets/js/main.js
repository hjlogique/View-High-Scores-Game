
// View High Scores Game - Web APIs: Code Game Application - main.js

// An array of questions, answers and the correct answers
var quesAnsPool = [
  ["What color is an orange?", "Blue", "Orange", "Black", "White", "answer2"],
  ["What is the sum of 10 and 5?", "15", "11", "16", "17", "answer1"],
  ["25 - 13 = ?", "5", "11", "14", "12", "answer4"],
  ["What is cheese made of?", "Air", "Wood", "Milk", "Apple", "answer3"],
  ["Which one of the following flies?", "Airplane", "Donkey", "Table", "History", "answer1"]
];

// Accessing the HTML DOM objects
var container = document.querySelector(".container");
var startPage = document.querySelector("#startPage");
var questionsPool = document.querySelector("#questionsPool");
var pageHeader = document.querySelector(".page-header");
var answersPool = document.querySelector("#answersPool");
var scoreForm = document.querySelector("#scoreForm");
var scoreTxt = document.querySelector("#scoreTxt");
var nameEntry = document.querySelector("#nameEntry");
var saveBtn = document.querySelector("#saveBtn");
var highScoreContainer = document.querySelector("#highScoreContainer");
var highScoreScreen = document.querySelector("#highScoreScreen");
var highScoreList = document.querySelector("#highScoreList");
var highScoreBtns = document.querySelector("#highScoreBtns");

var newAnswer = [];
var numOfQues = 0;
var timeLeft = 70;
var timerInterval;
var score = 0;

// ************   User Interface - start   ***************

// Hide the Questions, answers and the form
function hideScreens() {
  questionsPool.classList.add("hide");
  answersPool.classList.add("hide");
  scoreForm.classList.add("hide");
  highScoreContainer.classList.add("hide");
}
hideScreens();

// Create a dynamic Start page: Text
var startText = document.createElement("p");
startText.setAttribute("id", "startText");
startText.textContent = "Choose the right answers and win the game!";
startText.setAttribute("style", "display: block; margin: 0 auto; margin-top: 11%; text-align: center; padding: 10px; color: #a3a1a1;");
startPage.appendChild(startText);

// Create a dynamic Start page: Start button
var startBtn = document.createElement("button");
startBtn.setAttribute("class", "btn btn-outline-secondary");
startBtn.setAttribute("id", "startBtn");
startBtn.textContent = "Start";
startBtn.setAttribute("style", "display: block; margin: 0 auto; margin-top: 30px; padding: 5px 25px 5px 25px; color: #ECEAEA; border-color: #ECEAEA;");
startPage.appendChild(startBtn);

// Create a dynamic question 
var newQuestion = document.createElement("p");
newQuestion.setAttribute("id", "questions");
newQuestion.textContent = "Question";
questionsPool.appendChild(newQuestion);

// Create dynamic answer buttons
for (var i = 0; i < quesAnsPool[0].length - 2; i++) {
  newAnswer[i] = document.createElement("button");
  newAnswer[i].setAttribute("class", "btn btn-outline-info btn-lg btn-block");
  newAnswer[i].setAttribute("id", "answer" + (i + 1));
  answersPool.appendChild(newAnswer[i]);
}

// Create a dynamic time display and stylize it  
var timeDisplay = document.createElement("div");
timeDisplay.setAttribute("id", "timeDisplay");
timeDisplay.textContent = "Time: 70";
timeDisplay.setAttribute("style", "color: #d9dbdb; float: right; margin-right: 3px; margin-top:-37px; border: solid 1px #727272; border-radius: 3px; background: #555555; padding: 1px 2px 1px 2px; text-align: center; width: 70px; height: 26px; font-size: 15px;");
pageHeader.appendChild(timeDisplay);

// ************   User Interface - end   ***************

// ************   Main functions - start   ***************

// Quiz starts
startBtn.addEventListener("click", function () {
  startPage.classList.add("hide");
  questionsPool.classList.remove("hide");
  answersPool.classList.remove("hide");
  updateQuiz();
  verifyAnswers();

  // Quiz Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timeDisplay.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Show Score
      showScore();
    }
  }, 1000);

});

// Verify the selected buttons
function verifyAnswers() {
  // Find the ID of the selected button
  answersPool.addEventListener("click", function (event) {
    event.stopPropagation();
    var selected = event.target;
    if (selected.id === quesAnsPool[numOfQues][5] && numOfQues !== quesAnsPool.length) {
      alert("correct Answer!");
      numOfQues++;
      score++;
      updateQuiz();
    } else if (selected.id !== quesAnsPool[numOfQues][5] && numOfQues !== quesAnsPool.length) {
      alert("wrong Answer!");
      // For a wrong selection, decrease time left by 10 sec
      timeLeft -= 10;
      numOfQues++;
      updateQuiz();
    } else {
      // Show Score
      showScore();
    }
  });
}

// Update questions and answers in each set
function updateQuiz() {
  // Change the answers
  for (var j = 1; j < quesAnsPool[0].length - 1; j++) {
    if (numOfQues < quesAnsPool.length) {
      document.getElementById("questions").textContent = quesAnsPool[numOfQues][0];
      document.getElementById("answer" + j).textContent = quesAnsPool[numOfQues][j];
    } else {
      showScore();
    }
  }
}

// Display Score value and set the time left to 0
function showScore() {
  clearInterval(timerInterval);
  timeDisplay.textContent = "Time: 0";
  questionsPool.classList.add("hide");
  answersPool.classList.add("hide");
  scoreForm.classList.remove("hide");
  scoreTxt.setAttribute("style", "white-space: pre; text-align: center;");
  scoreTxt.textContent = "Game Over! \r\nYour score is: " + (score / quesAnsPool.length) * 100 + "%.";
}

// Save player's name and score
saveBtn.addEventListener("click", function highscore() {
  if (nameEntry.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentPlayer = nameEntry.value.trim();
    var currentHighscore = {
      name: currentPlayer,
      score: score
    };
    hideScreens();
    highScoreContainer.style.display = "flex";
    highScoreScreen.style.display = "block";
    highScoreBtns.style.display = "flex";
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    updateHighscores();
  }
});

// Clear list of high scores, update the list from local storage and display it
function updateHighscores() {
  highScoreList.innerHTML = "";
  var highScores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highScores.length; i++) {
    var newPlayerInfo = document.createElement("li");
    newPlayerInfo.textContent = highScores[i].name + ": " + (highScores[i].score / quesAnsPool.length) * 100 + "%";
    highScoreList.appendChild(newPlayerInfo);
  }
}

// Display high scores screen 
function showHighscore() {
  hideScreens();
  highScoreContainer.style.display = "flex";
  highScoreScreen.style.display = "block";
  highScoreBtns.style.display = "flex";
  updateHighscores();
}

// Delete the local storage and clear the high score screen
function clearScore() {
  window.localStorage.clear();
  highScoreList.textContent = "";
}

// Reset the screen and replay
function replay() {
  location.reload();
}

// ************   Main functions - end   ***************


