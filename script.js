// عناصر الواجهة
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const tapBtn = document.getElementById("tapBtn");

const slider = document.getElementById("slider");
const bar = document.getElementById("bar");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const finalScoreText = document.getElementById("finalScore");

// متغيرات اللعبة
let score = 0;
let level = 1;
let speed = 2;
let position = 0;
let direction = 1;
let animation;

// تشغيل اللعبة
startBtn.onclick = startGame;
restartBtn.onclick = startGame;
tapBtn.onclick = tap;

// بدء اللعب
function startGame() {
  score = 0;
  level = 1;
  speed = 2;
  position = 0;

  updateHUD();

  showScreen(gameScreen);
  moveSlider();
}

// تحريك المؤشر
function moveSlider() {
  animation = setInterval(() => {
    position += speed * direction;

    if (position <= 0 || position >= bar.clientWidth - slider.clientWidth) {
      direction *= -1;
    }

    slider.style.left = position + "px";
  }, 16);
}

// عند الضغط
function tap() {
  const sliderCenter = position + slider.clientWidth / 2;
  const barWidth = bar.clientWidth;
  const perfectStart = barWidth * 0.45;
  const perfectEnd = barWidth * 0.55;

  if (sliderCenter >= perfectStart && sliderCenter <= perfectEnd) {
    score += 100;
    level++;
    speed += 0.5;
    updateHUD();
  } else {
    endGame();
  }
}

// إنهاء اللعبة
function endGame() {
  clearInterval(animation);
  finalScoreText.textContent = score;
  showScreen(gameOverScreen);
}

// تحديث الواجهة
function updateHUD() {
  scoreText.textContent = score;
  levelText.textContent = level;
}

// إدارة الشاشات
function showScreen(screen) {
  [startScreen, gameScreen, gameOverScreen].forEach(s =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}