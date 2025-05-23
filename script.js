let score = 0;
let questionIndex = 0;
let wrongAnswers = 0;
let playerName = "";
let music;

const questions = [
  {
    text: "¿Cuál país ha ganado más Copas del Mundo?",
    options: ["Alemania", "Argentina", "Brasil", "Italia"],
    answer: 2
  },
  {
    text: "¿Cuántos jugadores hay en un equipo de fútbol titular?",
    options: ["9", "10", "11", "12"],
    answer: 2
  },
  {
    text: "¿Quién es conocido como “La Pulga”?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Pelé"],
    answer: 1
  },
  {
    text: "¿En qué país se jugó el Mundial 2014?",
    options: ["España", "Rusia", "Alemania", "Brasil"],
    answer: 3
  },
  {
    text: "¿Qué equipo tiene más Champions League?",
    options: ["Barcelona", "Bayern Munich", "Real Madrid", "Milan"],
    answer: 2
  }
];

function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  document.getElementById("welcome").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("greeting").innerText = `¡Bienvenido, ${playerName}!`;
  resetGame();
  showQuestion();
  playMusic();
}

function resetGame() {
  score = 0;
  questionIndex = 0;
  wrongAnswers = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("resultMessage").innerText = "";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("questionBox").style.display = "block";
  document.getElementById("playerImage").style.display = "none";
}

function showQuestion() {
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }

  const q = questions[questionIndex];
  document.getElementById("questionText").innerText = q.text;
  document.getElementById("currentQuestion").innerText = questionIndex + 1;

  const img = document.getElementById("playerImage");
  if (questionIndex < 5) {
    img.style.display = "block";
    img.src = "images/Soccer Baila Sticker by FOX Deportes.gif";
  } else {
    img.style.display = "none";
  }

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const correct = questions[questionIndex].answer;
  const img = document.getElementById("playerImage");

  if (questionIndex < 5) {
    if (selectedIndex === correct) {
      score += 20;
      img.src = "images/shoot_goal.png";
    } else {
      wrongAnswers++;
      img.src = "images/shoot_fail.png";
    }
  }

  document.getElementById("score").innerText = score;
  questionIndex++;

  setTimeout(showQuestion, 1000);
}

function endGame() {
  let message = "";
  if (wrongAnswers >= 3) {
    message = "Fallaste demasiadas preguntas. Intenta de nuevo.";
  } else {
    message = "¡GANASTE!";
  }

  document.getElementById("resultMessage").innerText = message;
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("questionBox").style.display = "none";
  document.getElementById("playerImage").style.display = "none";
  pauseMusic();
}

// Música
function playMusic() {
  music = document.getElementById("bgMusic");
  music.play();
}

function pauseMusic() {
  if (music) {
    music.pause();
  }
}
