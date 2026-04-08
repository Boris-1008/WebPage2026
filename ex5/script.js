let count = 1;

const addBtn = document.getElementById("addBtn");
const delBtn = document.getElementById("delBtn");
const buttonContainer = document.getElementById("buttonContainer");

addBtn.addEventListener("click", addFunction);
delBtn.addEventListener("click", delFunction);

function addFunction() {
  const btn = document.createElement("button");

  btn.innerText = `CLICK ME (${count})`;
  btn.setAttribute("id", `btn_${count}`);
  btn.setAttribute("class", "btn btn-outline-danger");

  btn.addEventListener("click", function () {
    alert(`${btn.id} 被點擊了`);
  });

  buttonContainer.appendChild(btn);
  count++;
}

function delFunction() {
  if (count === 1) {
    alert("已經沒有按鈕可以刪除了");
    return;
  }

  const lastId = `btn_${count - 1}`;
  const btn = document.getElementById(lastId);

  if (btn) {
    buttonContainer.removeChild(btn);
    count--;
  }
}