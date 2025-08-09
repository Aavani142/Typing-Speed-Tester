const quotes = [
  "Supercalifragilisticexpialidocious is a word invented for fun and wonder.",
  "Pneumonoultramicroscopicsilicovolcanoconiosis describes a lung disease.",
  "Floccinaucinihilipilification means the act of estimating something as worthless.",
  "Antidisestablishmentarianism was once a political movement in England.",
  "Honorificabilitudinitatibus is the longest word used by Shakespeare."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const inputArea = document.getElementById("inputArea");
const startBtn = document.getElementById("startBtn");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result");

let timeLeft = 30;
let timer;
let isRunning = false;

startBtn.addEventListener("click", () => {
  if (!isRunning) startTest();
});

function startTest() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = randomQuote;
  quoteDisplay.classList.add("fade-in");

  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();
  resultBox.classList.add("hidden");
  resultBox.classList.remove("show");

  timeLeft = 30;
  timerEl.textContent = timeLeft + "s";
  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + "s";
    if (timeLeft <= 0) endTest(randomQuote);
  }, 1000);
}

function endTest(originalQuote) {
  clearInterval(timer);
  isRunning = false;
  inputArea.disabled = true;

  const typedWords = inputArea.value.trim().split(/\s+/);
  const quoteWords = originalQuote.trim().split(/\s+/);
  let correctCount = 0;

  typedWords.forEach((word, index) => {
    if (word === quoteWords[index]) correctCount++;
  });

  const wpm = correctCount * 2; // since test is 30s
  const accuracy = ((correctCount / quoteWords.length) * 100).toFixed(1);

  resultBox.innerHTML = `
     Correct Words: ${correctCount}<br>
     Speed: ${wpm} WPM<br>
     Accuracy: ${accuracy}%
  `;
  
  resultBox.classList.remove("hidden");
  resultBox.classList.add("show");
}




