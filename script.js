document.addEventListener("DOMContentLoaded", function () {
  // DOM element references
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const correctContainer = document.getElementById("correct-container"); // Added reference for correct message
  const incorrectContainer = document.getElementById("incorrect-container"); // Added reference for incorrect message
  const scoreContainer = document.getElementById("score-container");
  const timerContainer = document.getElementById("timer-container");
  const questionCountContainer = document.getElementById("question-count-container"); // Added reference

  // Variables for quiz logic
  let timer;
  let timeLeft = 100; // Set time to 100 seconds
  let currentQuestionIndex = 0;
  let score = 0;
  let pastScores = [];
  const totalQuestions = 10; // Set the total number of questions

  // Array of quiz questions
  const questions = [
    // Each question object includes the question, options, and correct answer
    { question: "What is the primary purpose of JavaScript?", options: ["Styling web pages", "Creating dynamic content", "Handling databases", "Running server-side code"], correctAnswer: "Creating dynamic content" },
    { question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "let", "const", "variable"], correctAnswer: "var" },
    { question: "What is the result of the expression '2' + 2 in JavaScript?", options: ["22", "4", "Error", "Undefined"], correctAnswer: "22" },
    { question: "How do you write a single-line comment in JavaScript?", options: ["//", "/*", "#", "--"], correctAnswer: "//" },
    { question: "What does the 'DOM' stand for in JavaScript?", options: ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Document Oriented Model"], correctAnswer: "Document Object Model" },
    { question: "Which function is used to parse a string and return a floating-point number in JavaScript?", options: ["parseInt()", "parseFloat()", "toFixed()", "toPrecision()"], correctAnswer: "parseFloat()" },
    { question: "What is the purpose of the 'this' keyword in JavaScript?", options: ["Refers to the current HTML document", "Refers to the global object", "Refers to the current object", "Refers to the previous object"], correctAnswer: "Refers to the current object" },
    { question: "How do you declare a function in JavaScript?", options: ["function myFunction()", "var myFunction = function()", "def myFunction():", "myFunction = function()"], correctAnswer: "function myFunction()" },
    { question: "What is an example of a falsy value in JavaScript?", options: ["0", "1", "true", "empty string"], correctAnswer: "empty string" },
    { question: "Which method is used to add an element to the end of an array in JavaScript?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" }
  ];

  // Show past scores on page load
  showPastScores();

  // Function to start the quiz
  function startQuiz() {
    startBtn.style.display = "none"; // Hide the start button
    timer = setInterval(updateTimer, 1000); // Set up a timer to update every second
    showQuestion(); // Display the first question
  }

  // Function to display the current question
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
      // Display the question
      questionContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;

      // Create options container for the current question
      const optionsContainer = document.createElement("div");
      optionsContainer.id = "options-container";

      // Create buttons for each option and add event listeners
      currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionsContainer.appendChild(optionButton);

        optionButton.addEventListener("click", () => {
          checkAnswer(option);
        });
      });

      // Append options container to the question container
      questionContainer.appendChild(optionsContainer);

      // Display question count at the bottom
      questionCountContainer.innerHTML = `Question ${currentQuestionIndex + 1} out of ${totalQuestions}`;
    } else {
      // End the quiz if there are no more questions
      endQuiz();
    }
  }

  // Function to update the timer
  function updateTimer() {
    timeLeft--;
    timerContainer.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      // End the quiz when time runs out
      endQuiz();
    }
  }

  // Function to check the user's answer
  function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
      // Update score and display correct message
      score += 10;
      correctContainer.innerHTML = "Correct! +10 points";

      // Hide correct message after 1 second (adjust as needed)
      setTimeout(() => {
        correctContainer.innerHTML = "";
      }, 1000);
    } else {
      // Display incorrect message and penalize time for wrong answer
      incorrectContainer.innerHTML = "Incorrect! No points awarded";

      // Add a class to #timer-container to turn the timer red
      timerContainer.classList.add("timer-wrong-answer");

      // Hide incorrect message and remove the class after 1 second (adjust as needed)
      setTimeout(() => {
        incorrectContainer.innerHTML = "";
        timerContainer.classList.remove("timer-wrong-answer");
      }, 1000);

      timeLeft = Math.max(0, timeLeft - 10);
    }

    // Move to the next question and show it
    currentQuestionIndex++;
    questionContainer.innerHTML = "";
    showQuestion();
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timer); // Clear the timer
    questionContainer.innerHTML = ""; // Clear the question container

    // Display the final score and question count
    scoreContainer.innerHTML = `<h2>Quiz Completed</h2><p>Your Score: ${score} points</p>`;

    // Prompt for initials and save score
    const initials = prompt("Enter your initials:");
    if (initials) {
      saveScore(initials, score, 100 - timeLeft);
      showPastScores();
    }

    // Add "Retake Quiz" button only after the quiz is complete
    const retakeBtn = document.createElement("button");
    retakeBtn.textContent = "Retake Quiz";
    retakeBtn.classList.add("btn", "btn-primary", "retake-btn", "mt-3");
    retakeBtn.addEventListener("click", retakeQuiz);
    scoreContainer.appendChild(retakeBtn);
  }

  // Function to save the score to local storage
  function saveScore(initials, score, time) {
    pastScores.push({ initials, score, time });
    localStorage.setItem("quizScores", JSON.stringify(pastScores));
  }

  // Function to display past scores
  function showPastScores() {
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    pastScores = storedScores;

    console.log("Stored Scores:", pastScores);

    if (pastScores.length > 0) {
      const sortedScores = pastScores.sort((a, b) => b.score - a.score);

      const scoresList = document.createElement("ol");
      scoresList.innerHTML = "<h3>Past Scores:</h3>";

      sortedScores.forEach((entry, index) => {
        const scoreItem = document.createElement("li");
        scoreItem.textContent = `${entry.initials}: ${entry.score} out of 100 points (${entry.time}s)`;

        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear";
        clearButton.classList.add("btn", "btn-danger", "clear-btn");
        clearButton.addEventListener("click", () => {
          clearScore(index);
        });

        scoreItem.appendChild(clearButton);
        scoresList.appendChild(scoreItem);
      });

      scoreContainer.innerHTML = "";
      scoreContainer.appendChild(scoresList);
    }
  }

  // Function to clear a past score
  function clearScore(index) {
    const confirmDelete = confirm("Are you sure you want to delete this past score?");
    if (confirmDelete) {
      pastScores.splice(index, 1);
      localStorage.setItem("quizScores", JSON.stringify(pastScores));
      scoreContainer.innerHTML = "";
      showPastScores();
    }
  }

  // Function to retake the quiz
  function retakeQuiz() {
    timeLeft = 100; // Reset time to 100 seconds
    currentQuestionIndex = 0;
    score = 0;

    questionContainer.innerHTML = "";
    correctContainer.innerHTML = ""; // Clear correct message container
    incorrectContainer.innerHTML = ""; // Clear incorrect message container
    scoreContainer.innerHTML = "";
    questionCountContainer.innerHTML = ""; // Clear question count

    startQuiz();
  }

  // Event listener for starting the quiz
  startBtn.addEventListener("click", () => {
    scoreContainer.innerHTML = "";
    startQuiz();
  });
});