const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector("#wrapper");
const input = document.querySelector("#search");
const btn = document.querySelector(".btn-search");
const caterogyBtn = document.querySelectorAll(".list-title > div span");

// flickr api
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const method3 = "flickr.galleries.getPhotos";
const key = "39d6e86ec62077747de49698953a05a8";
const per_page = 30;
const format = "json";
const livingRoom = "72157720386366321";
const bedRoom = "72157720382448749";
const kitchen = "72157720392940072";

caterogyBtn.forEach((el) => {
    //flickr.galleries.getPhotost method
    const url1 = `${base}method=${method3}&api_key=${key}&gallery_id=${livingRoom}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
    const url2 = `${base}method=${method3}&api_key=${key}&gallery_id=${bedRoom}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
    const url3 = `${base}method=${method3}&api_key=${key}&gallery_id=${kitchen}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

    el.addEventListener("click", (e) => {
        for (let i = 0; i < caterogyBtn.length; i++) {
            caterogyBtn[i].classList.remove("on");
        }
        e.currentTarget.classList.add("on");
        if (el.classList.contains("living")) {
            callData(url1);
        } else if (el.classList.contains("bed")) {
            callData(url2);
        } else if (el.classList.contains("kitchen")) {
            callData(url3);
        } else {
            callData(url);
        }
    });
});

//flickr.interestingness.getList method
const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

callData(url);

btn.addEventListener("click", (e) => {
    let tag = input.value;
    //flickr.photos.search method
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if (tag != "") {
        callData(url);
    } else {
        console.log("검색어를 입력하세요.");
        alert("검색어를 입력하세요.");

        frame.innerHTML = "";
        frame.classList.remove("on");
        frame.style.height = 0;
    }
});

//검색어 입력후 enter 눌렀을 때
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        let tag = input.value;
        //flickr.photos.search method
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

        if (tag != "") {
            callData(url);
        } else {
            console.log("검색어를 입력하세요.");
            alert("검색어를 입력하세요.");

            frame.innerHTML = "";
            frame.classList.remove("on");
            frame.style.height = 0;
        }
    }
});

//동적으로 레이어팝업 생성 이벤트
frame.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == frame) return;
    let target = e.target.closest(".item").querySelector(".thumb");
    if (e.target == target) {
        body.style.overflow = "hidden";
        let imgSrc = target.parentElement.getAttribute("href");
        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops = `
        <div class="con">
            <img src="${imgSrc}">
        </div>
        <span class="close">close</span>
    `;
        pop.innerHTML = pops;
        body.append(pop);
    } else {
        return;
    }
});

//팝업 닫기 버튼 클릭시
body.addEventListener("click", (e) => {
    let pop = body.querySelector(".pop");
    if (pop != null) {
        let close = pop.querySelector(".close");
        if (e.target == close) {
            body.style.overflow = "auto";
            pop.remove();
        }
    }
});

function callData(url) {
    frame.innerHTML = "";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            let items = json.photos.photo;

            if (items.length > 0) {
                creatList(items);
                delayLoading();
            } else {
                console.log("검색하신 이미지의 데이터가 없습니다.");
                alert("검색하신 이미지의 데이터가 없습니다.");
                loading.classList.add("off");
                frame.classList.remove("on");
                frame.style.height = 0;
            }
        });
}

function creatList(items) {
    let htmls = "";
    items.forEach((data) => {
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls += `
                  <li class="item">
                        <div>
                            <a href="${imgSrcBig}">
                                <img class="thumb" src="${imgSrc}">
                            </a>
                            <p class="img-title">${data.title}</p>
                            <span>
                                <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                                <strong>${data.owner}</strong>
                            </span>
                        </div>
                    </li>
         `;
    });

    frame.innerHTML = htmls;
}

function delayLoading() {
    const imgs = frame.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for (let el of imgs) {
        el.onload = () => {
            count++;

            if (count === len) isoLayout();
        };

        let thumb = el.closest(".item").querySelector(".thumb");
        thumb.onerror = (e) => {
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "../img/temp.jpg");
        };

        let profile = el.closest(".item").querySelector(".profile");
        profile.onerror = (e) => {
            e.currentTarget
                .closest(".item")
                .querySelector(".profile")
                .setAttribute("src", "https://combo.staticflickr.com/pw/images/buddyicon09.png");
        };
    }
}

function isoLayout() {
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list", {
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s",
    });
}
