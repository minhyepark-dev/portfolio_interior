const body = document.querySelector("body");
const vidList = document.querySelector(".vidList");
const key = "AIzaSyCEH01dII9F6sGxDEU4lWx-wmMec8Miz00";
const playListId = "PLjIdINgJblV--hzUP4fzSuXlVk5n090dy";
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

const btnPlay = document.querySelector(".btn-play");

callData(url);

// 상단 메인 영상의 플레이버튼 클릭시
btnPlay.addEventListener("click", (e) => {
    e.preventDefault();
    const videoIcon = e.currentTarget.querySelector("i");
    const video = e.currentTarget.closest(".video-wrap").querySelector("video");
    if (video.paused || video.ended) {
        videoIcon.className = "fas fa-pause";
        video.play();
    } else {
        videoIcon.className = "fas fa-play";
        video.pause();
    }
});

// 동영상 썸네일 클릭시
vidList.addEventListener("click", (e) => {
    // 팝업 생성
    createPop(e);
    // 팝업 제거
    removePop(e);
});

vidList.addEventListener("keydown", (e) => {
    if (e.target == vidList) return;

    if (e.key === "Enter") {
        createPopTab(e);
        removePop(e);
    }
});

// 데이터 호출 함수 정의
function callData(url) {
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((json) => {
            let items = json.items;
            createVideoList(items);
        });
}

// 비디오 리스트 함수 정의
function createVideoList(items) {
    let result = "";
    items.forEach((item) => {
        let title = item.snippet.title;
        if (title.length > 26) {
            title = title.substr(0, 26);
        }
        let con = item.snippet.description;
        if (con.length > 100) {
            con = con.substr(0, 100);
        }
        let date = item.snippet.publishedAt;
        date = date.split("T")[0];
        let video = item.snippet.resourceId.videoId;

        result += `
            <article>
                <div class="box-video">
                    <a href="${video}" class="pic">
                        <img src="${item.snippet.thumbnails.medium.url}">
                        <i class="fas fa-play"></i>
                    </a>
                </div>
                <div class="text-video">
                    <h2>${title}...</h2>
                    <p>${con}...</p>
                    <span>${date}</span>
                </div>
            </article>
    `;
    });
    vidList.innerHTML = result;
}

// 팝업 생성 함수 정의
function createPop(e) {
    e.preventDefault();
    if (e.target.parentNode.nodeName != "A") return;
    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose" tabindex="0">close</span>
  `;
    vidList.append(pop);
    body.style.overflow = "hidden";
}

function createPopTab(e) {
    e.preventDefault();
    if (e.target.nodeName != "A") return;
    const vidId = e.target.getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="btnClose" tabindex="0">close</span>
      `;
    vidList.append(pop);
    body.style.overflow = "hidden";
}

// 팝업 제거 함수 정의
function removePop(e) {
    const pop = vidList.querySelector("figure");
    if (pop != null) {
        const close = pop.querySelector(".btnClose");
        if (e.target == close) {
            e.target.closest("figure").remove();
            body.style.overflow = "auto";
        }
    }
}
