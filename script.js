document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const scoreContainer = document.getElementById("score-container");
  const timerContainer = document.getElementById("timer-container");

  let timer;
  let timeLeft = 60;
  let currentQuestionIndex = 0;
  let score = 0;
  let pastScores = loadScores(); // Load past scores from local storage

  const questions = [
    { question: "Sample Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: "Option 1" },
    { question: "Sample Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correctAnswer: "Option A" },
    // Add more sample questions as needed
  ];

  function startQuiz() {
    startBtn.style.display = "none";
    timer = setInterval(updateTimer, 1000);
    showQuestion();
  }

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
      questionContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;

      const optionsContainer = document.createElement("div");
      optionsContainer.id = "options-container";

      currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionsContainer.appendChild(optionButton);
      });

      questionContainer.appendChild(optionsContainer);

      optionsContainer.addEventListener("click", (event) => {
        checkAnswer(event.target.textContent);
      });
    } else {
      endQuiz();
    }
  }

  function updateTimer() {
    timeLeft--;
    timerContainer.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }

  function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
      score += 10;
      resultContainer.innerHTML = "Correct! +10 points";
    } else {
      resultContainer.innerHTML = "Incorrect! No points awarded";
      timeLeft = Math.max(0, timeLeft - 10);
    }

    currentQuestionIndex++;
    questionContainer.innerHTML = "";
    showQuestion();
  }

  function endQuiz() {
    clearInterval(timer);
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    
    // Display the final score
    scoreContainer.innerHTML = `<h2>Quiz Completed</h2><p>Your Score: ${score} points</p>`;
    
    // Prompt for initials
    const initials = prompt("Enter your initials:");
    if (initials) {
      saveScore(initials, score);
      showPastScores(); // Display past scores after saving the current score
    }
  }

  function saveScore(initials, score) {
    // Save the score to local storage
    pastScores.push({ initials, score });
    localStorage.setItem("quizScores", JSON.stringify(pastScores));
  }

  function showPastScores() {
    // Retrieve and display past scores
    const sortedScores = pastScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    
    const scoresList = document.createElement("ol");
    scoresList.innerHTML = "<h3>Past Scores:</h3>";
    
    sortedScores.forEach((entry) => {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${entry.initials}: ${entry.score} points`;
      scoresList.appendChild(scoreItem);
    });

    scoreContainer.appendChild(scoresList);
  }

  function loadScores() {
    // Load scores from local storage or return an empty array if not found
    return JSON.parse(localStorage.getItem("quizScores")) || [];
  }

  startBtn.addEventListener("click", startQuiz);
});