document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const scoreContainer = document.getElementById("score-container");

  let currentQuestionIndex = 0;
  let score = 0; // Initial score

  const questions = [
    { question: "Sample Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: "Option 1" },
    { question: "Sample Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correctAnswer: "Option A" },
    { question: "Sample Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: "Option 1" },
    { question: "Sample Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correctAnswer: "Option A" },
    // Add more sample questions
  ];

  function startQuiz() {
    startBtn.style.display = "none";
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

      console.log("Displaying question:", currentQuestion);

      optionsContainer.addEventListener("click", (event) => {
        console.log("Clicked on an option:", event.target.textContent);
        checkAnswer(event.target.textContent);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
      score += 10; // Add 10 points for correct answer
      resultContainer.innerHTML = "Correct! +10 points";
    } else {
      resultContainer.innerHTML = "Incorrect! No points awarded";
    }

    currentQuestionIndex++;

    questionContainer.innerHTML = "";

    showQuestion();
  }

  function endQuiz() {
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    scoreContainer.innerHTML = `<h2>Quiz Completed</h2><p>Your Score: ${score} points</p>`;
  }

  startBtn.addEventListener("click", startQuiz);
});