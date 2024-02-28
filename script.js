document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const scoreContainer = document.getElementById("score-container");
  
    let currentQuestionIndex = 0;
  
    const questions = [
      { question: "Sample Question 1", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: "Option 1" },
      { question: "Sample Question 2", options: ["Option A", "Option B", "Option C", "Option D"], correctAnswer: "Option A" },
      // Add more sample
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
  
        // Instead of adding the click event, let's just log it for now
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
      
      resultContainer.innerHTML = userAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect!";
  
      // Move to the next question
      currentQuestionIndex++;
  
      // Clear the question container
      questionContainer.innerHTML = "";
  
  
      showQuestion();
    }
  
    function endQuiz() {
      questionContainer.innerHTML = "";
      resultContainer.innerHTML = "";
      scoreContainer.innerHTML = "<h2>Quiz Completed</h2>";
    }
  
    startBtn.addEventListener("click", startQuiz);
  });