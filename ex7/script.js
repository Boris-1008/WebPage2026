const container = document.getElementById("container");
const letters = "abcdefghijklmnopqrstuvwxyz";

let wrongCount = 0; // 連續打錯次數

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * letters.length);
    result += letters[index];
  }
  return result;
}

// b = true: 隨機產生 1~x 個字
// b = false: 固定產生 x 個字
function addNewChars(x, b = true) {
  let count = x;
  if (b) {
    count = randomInt(1, x);
  }
  container.textContent += randomString(count);
}

window.onload = function () {
  container.textContent = "";
  addNewChars(3); // 一開始先產生 1~3 個字
};

window.addEventListener("keyup", function (e) {
  const currentText = container.textContent;

  // 只接受 a-z
  if (!/^[a-z]$/.test(e.key)) return;

  // 打對第一個字
  if (currentText.length > 0 && e.key === currentText[0]) {
    container.textContent = currentText.slice(1);
    wrongCount = 0;
  } else {
    // 打錯
    wrongCount++;
  }

  // 原本每次都補 1~3 個亂數字
  addNewChars(3);

  // 連續打錯三次，再額外增加 3 個固定字元
  if (wrongCount >= 3) {
    addNewChars(3, false);
    wrongCount = 0;
  }
});