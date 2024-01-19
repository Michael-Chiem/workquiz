const quizData = [
  {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
  },
  {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars"
  },
  // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let highestScores = JSON.parse(localStorage.getItem('highestScores')) || [];

let timer;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const playerNameInput = document.getElementById('player-name');
const submitButton = document.getElementById('submit-button');
const highScoreTable = document.getElementById('high-score-table');

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  playerName = playerNameInput.value || 'Anonymous';
  showQuestion();
  startTimer();
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  if (currentQuestion) {
      questionElement.textContent = currentQuestion.question;
      optionsContainer.innerHTML = '';

      currentQuestion.options.forEach((option, index) => {
          const button = document.createElement('button');
          button.textContent = option;
          button.addEventListener('click', () => checkAnswer(option));
          optionsContainer.appendChild(button);
      });
  } else {
      endQuiz();
  }
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
      score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
      showQuestion();
  } else {
      endQuiz();
  }
}

function startTimer() {
  let seconds = 10; // Set the initial time to 60 seconds

  timer = setInterval(() => {
    seconds--;

    if (seconds >= 0) {
      timerElement.textContent = seconds;
    } else {
      clearInterval(timer);
      endQuiz(); // End the quiz when the timer reaches zero
    }
  }, 1000);
}


function endQuiz() {
  clearInterval(timer);
  showScore();
  updateHighestScores();
  displayHighScores();
}

document.addEventListener('DOMContentLoaded', function() {
  // Your script code here
});
function initializeQuiz() {
  displayHighScores();
  // Add any other initialization logic here
}

document.addEventListener('DOMContentLoaded', function() {
  // Your script code here
});

nextButton.addEventListener('click', initializeQuiz);

function showScore() {
  questionElement.textContent = `Quiz completed, ${playerName}! Your score is ${score}`;
  optionsContainer.innerHTML = '';
  scoreElement.textContent = `Your Score: ${score}`;
}

function updateHighestScores() {
  const playerScore = { playerName, score };
  highestScores.push(playerScore);
  highestScores.sort((a, b) => b.score - a.score); // Sort in descending order
  highestScores = highestScores.slice(0, 5); // Keep only the top 5 scores
  localStorage.setItem('highestScores', JSON.stringify(highestScores));
}

function displayHighScores() {
  highScoreTable.innerHTML = '<tr><th>Player Name</th><th>Score</th></tr>';
  highestScores.forEach(({ playerName, score }) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${playerName}</td><td>${score}</td>`;
      highScoreTable.appendChild(row);
  });
}

nextButton.addEventListener('click', startQuiz);

// Display highest scores when the page loads
displayHighScores();
function clearHighestScores() {
  localStorage.removeItem('highestScores');
  highestScores = [];
  displayHighScores(); // Update the displayed scores after clearing
}
document.addEventListener('DOMContentLoaded', function() {
  clearHighestScores(); // Call the function when the page loads
  // Other initialization code here
});
