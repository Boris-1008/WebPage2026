const loadBtn = document.getElementById("loadBtn");
const gallery = document.getElementById("gallery");

const apiKey = "ca370d51a054836007519a00ff4ce59e";

const imglist_Url =
  `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=4&format=json&nojsoncallback=1`;

loadBtn.addEventListener("click", function () {
  gallery.innerHTML = "";
  getImgList();
});

function getImgList() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", imglist_Url, true);
  xhr.send();

  xhr.onload = function () {
    const data = JSON.parse(this.responseText);
    const photos = data.photos.photo;

    photos.forEach(function (item) {
      getImgById(item.id);
    });
  };
}

function getImgById(photoId) {
  const img_Url =
    `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  const xhr = new XMLHttpRequest();

  xhr.open("GET", img_Url, true);
  xhr.send();

  xhr.onload = function () {
    const data = JSON.parse(this.responseText);

    // 找一張適合顯示的圖片
    const sizes = data.sizes.size;

    let imgSrc = "";
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i].label === "Medium") {
        imgSrc = sizes[i].source;
        break;
      }
    }

    // 如果沒有 Medium，就用最後一張
    if (imgSrc === "" && sizes.length > 0) {
      imgSrc = sizes[sizes.length - 1].source;
    }

    addNewImg(imgSrc);
  };
}

function addNewImg(src) {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  gallery.appendChild(img);
}