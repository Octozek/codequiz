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
  let pastScores = [];

  const questions = [
    { question: "What heart means love?", options: ["💚", "💙", "💛", "❤️"], correctAnswer: "❤️" },
    { question: "What heart means friends?", options: ["💛", "💜", "🤎", "🧡"], correctAnswer: "💛" },
    { question: "Who is not sick?", options: ["🤢", "🤧", "🤮", "🥶"], correctAnswer: "🥶" },
    // Add more sample questions as needed
  ];

  // Show past scores on page load
  showPastScores();

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

        optionButton.addEventListener("click", () => {
          checkAnswer(option);
        });
      });

      questionContainer.appendChild(optionsContainer);
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

      // Hide the message after 2 seconds (adjust the time as needed)
      setTimeout(() => {
        resultContainer.innerHTML = "";
      }, 2000);
    } else {
      resultContainer.innerHTML = "Incorrect! No points added";

      // Hide the message after 2 seconds (adjust the time as needed)
      setTimeout(() => {
        resultContainer.innerHTML = "";
      }, 2000);

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
      saveScore(initials, score, 60 - timeLeft);
      // Show past scores only after saving the score
      showPastScores();
    }
  }

  function saveScore(initials, score, time) {
    pastScores.push({ initials, score, time });
    localStorage.setItem("quizScores", JSON.stringify(pastScores));
  }

  function showPastScores() {
    // Retrieve and display past scores
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    pastScores = storedScores;

    console.log("Stored Scores:", pastScores);

    const sortedScores = pastScores.sort((a, b) => b.score - a.score);

    const scoresList = document.createElement("ol");
    scoresList.innerHTML = "<h3>Past Scores:</h3>";

    sortedScores.forEach((entry, index) => {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${entry.initials}: ${entry.score} points (${entry.time}s)`;

      const clearButton = document.createElement("button");
      clearButton.textContent = "Clear";
      clearButton.classList.add("btn", "btn-danger", "clear-btn");
      clearButton.addEventListener("click", () => {
        clearScore(index);
      });

      scoreItem.appendChild(clearButton);
      scoresList.appendChild(scoreItem);
    });

    // Add "Retake Quiz" button using Bootstrap classes
    const retakeBtn = document.createElement("button");
    retakeBtn.textContent = "Retake Quiz";
    retakeBtn.classList.add("btn", "btn-primary", "retake-btn", "mt-3");
    retakeBtn.addEventListener("click", retakeQuiz);

    // Append the scores list and "Retake Quiz" button to the scoreContainer
    scoreContainer.innerHTML = "";
    scoreContainer.appendChild(scoresList);
    scoreContainer.appendChild(retakeBtn);
  }

  function clearScore(index) {
    const confirmDelete = confirm("Are you sure you want to delete this past score?");
    if (confirmDelete) {
      pastScores.splice(index, 1);
      localStorage.setItem("quizScores", JSON.stringify(pastScores));
      showPastScores();
    }
  }

  function retakeQuiz() {
    // Reset variables and restart the quiz
    timeLeft = 60;
    currentQuestionIndex = 0;
    score = 0;
    pastScores = [];

    // Clear the displayed content
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    scoreContainer.innerHTML = "";

    // Start the quiz again
    startQuiz();
  }

  startBtn.addEventListener("click", () => {
    // Hide past scores before starting the quiz
    scoreContainer.innerHTML = "";
    startQuiz();
  });
});