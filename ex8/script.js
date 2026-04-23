const loadBtn = document.getElementById("loadBtn");
const dataBody = document.getElementById("dataBody");

const openUrl =
  "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

loadBtn.addEventListener("click", function () {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", openUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      dataBody.innerHTML = "";

      for (let i = 0; i < 10; i++) {
        const item = data[i];

        let title = item.title || "無資料";
        let location = "無資料";
        let time = "無資料";

        if (item.showInfo && item.showInfo.length > 0) {
          location = item.showInfo[0].locationName || "無資料";
          time = item.showInfo[0].time || "無資料";
        }

        dataBody.innerHTML += `
          <tr>
            <td>${title}</td>
            <td>${location}</td>
            <td>${time}</td>
          </tr>
        `;
      }
    } else {
      alert("資料讀取失敗");
    }
  };

  xhr.send();
});