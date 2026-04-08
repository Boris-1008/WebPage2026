const container = document.getElementById("container");
const letters = "abcdefghijklmnopqrstuvwxyz";

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

function addNewChars() {
  const count = randomInt(1, 3); // 1~3 個字元
  container.textContent += randomString(count);
}

window.onload = function () {
  const count = randomInt(0, 2); // 0~2 個字元
  container.textContent = randomString(count);
};

window.addEventListener("keyup", function (e) {
  const currentText = container.textContent;

  // 只接受 a-z
  if (/^[a-z]$/.test(e.key)) {
    // 如果按下的字跟第一個字一樣，就刪掉第一個字
    if (currentText.length > 0 && e.key === currentText[0]) {
      container.textContent = currentText.slice(1);
    }

    // 每次 keyup 後補 1~3 個字元
    addNewChars();
  }
});