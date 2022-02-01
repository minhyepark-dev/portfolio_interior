const body = document.querySelector("body");
const vidList = document.querySelector(".vidList");
const key = "AIzaSyCEH01dII9F6sGxDEU4lWx-wmMec8Miz00";
const playListId = "PLjIdINgJblV--hzUP4fzSuXlVk5n090dy";
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

const btnPlay = document.querySelector(".btn-play");

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

fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;
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
                        <a href="${item.snippet.resourceId.videoId}" class="pic">
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
    });

vidList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.parentNode.nodeName != "A") return;
    const vidId = e.target.closest("a").getAttribute("href");
    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">close</span>
  `;
    vidList.append(pop);
    body.style.overflow = "hidden";
});

vidList.addEventListener("click", (e) => {
    const pop = vidList.querySelector("figure");
    if (pop != null) {
        const close = pop.querySelector(".btnClose");
        if (e.target == close) {
            e.target.closest("figure").remove();
            body.style.overflow = "auto";
        }
    }
});
