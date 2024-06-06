const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
const _currentQuestion = document.getElementById("current-question");
const _category = document.getElementById("category");

let correctAnswer = "",
  correctScore = 0,
  askedCount = 0,
  totalQuestion = 25; // Assuming 25 questions for the counter

async function loadQuestion() {
  const APIUrl = "https://opentdb.com/api.php?amount=25&difficulty=easy";
  try {
    const result = await fetch(APIUrl);
    const data = await result.json();
    if (data.results && data.results.length > 0) {
      _result.innerHTML = "";
      showQuestion(data.results[0]);
    } else {
      console.error("No results found in API response");
    }
  } catch (error) {
    console.error("Error fetching question:", error);
  }
}

function eventListeners() {
  _checkBtn.addEventListener("click", checkAnswer);
  _playAgainBtn.addEventListener("click", restartQuiz);
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
  eventListeners();
  _currentQuestion.textContent = askedCount + 1;
});

function showQuestion(data) {
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswer.length + 1)),
    0,
    correctAnswer
  );
  _category.textContent = data.category;
  _question.innerHTML = `${data.question}`;
  _options.innerHTML = `${optionsList
    .map((option) => `<li><span>${option}</span></li>`)
    .join("")}`;
  selectOption();
}

function selectOption() {
  _options.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function () {
      _options.querySelectorAll("li").forEach(function (opt) {
        opt.classList.remove("selected");
      });
      option.classList.add("selected");
    });
  });
}

function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p><i class="fas fa-check"></i> Correct Answer!</p>`;
      loadNextQuestion();
    } else {
      _result.innerHTML = `<p><i class="fas fa-times"></i> Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
      _playAgainBtn.style.display = "block";
      _checkBtn.style.display = "none";
    }
    setCount();
  } else {
    _result.innerHTML = `<p><i class="fas fa-question"></i> Please select an option!</p>`;
    _checkBtn.disabled = false;
  }
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function loadNextQuestion() {
  setTimeout(function () {
    askedCount++;
    _currentQuestion.textContent = askedCount + 1;
    if (askedCount < totalQuestion) {
      loadQuestion();
    } else {
      _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
      _playAgainBtn.style.display = "block";
      _checkBtn.style.display = "none";
    }
  }, 300);
}

function setCount() {
  _currentQuestion.textContent = askedCount + 1;
}

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  _result.innerHTML = "";
  setCount();
  loadQuestion();
}
