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

// flickr에서 현재 인기있는 사진을 기본으로 표출
const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
callData(url);

// 상단의 카테고리 클릭시
caterogyBtn.forEach((el) => {
    // living room
    const url1 = `${base}method=${method3}&api_key=${key}&gallery_id=${livingRoom}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
    // bed room
    const url2 = `${base}method=${method3}&api_key=${key}&gallery_id=${bedRoom}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
    // kitchen
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

    el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
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
        }
    });
});

// 검색버튼을 클릭시
btn.addEventListener("click", (e) => {
    let tag = input.value;
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
        <span class="close" tabindex="1">close</span>
    `;
        pop.innerHTML = pops;
        body.append(pop);
    } else {
        return;
    }
});
frame.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (e.target == frame) return;
        let target = e.target.closest(".item").querySelector(".thumb");
        if (e.target.childNodes[1] == target) {
            body.style.overflow = "hidden";
            let imgSrc = target.parentElement.getAttribute("href");
            let pop = document.createElement("aside");
            pop.classList.add("pop");
            let pops = `
            <div class="con">
                <img src="${imgSrc}">
            </div>
            <span class="close" tabindex="1">close</span>
        `;
            pop.innerHTML = pops;
            body.append(pop);
        } else {
            return;
        }
    }
});

//팝업 닫기 버튼 클릭시
body.addEventListener("click", (e) => {
    closePop(e);
});
body.addEventListener("keydown", (e) => {
    closePop(e);
});

// 팝업 제거 함수
function closePop(e) {
    let pop = body.querySelector(".pop");
    if (pop != null) {
        let close = pop.querySelector(".close");
        if (e.target == close) {
            body.style.overflow = "auto";
            pop.remove();
        }
    }
}

// flickr 데이터 호출 함수 정의
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

// flickr 리스트 함수 정의
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

// 로딩 함수 정의
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

// isotope 레이아웃 함수 정의
function isoLayout() {
    loading.classList.add("off");
    frame.classList.add("on");

    new Isotope("#list", {
        itemSelector: ".item",
        columnWidth: ".item",
        transitionDuration: "0.5s",
    });
}
