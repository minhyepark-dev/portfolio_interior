// slider
// ul
const slider = document.querySelector(".visual");
// btn
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
// 슬라이드
const slideList = slider.querySelectorAll("li");
// 슬라이드 버튼
const dots = document.querySelectorAll(".arrow-dots div");
// mask동작이 끝났는지 체크
let enableClick = true;
// 슬라이드 인덱스
let slideIndex = 0;

const init = () => {
    slider.style.marginLeft = "-100%";
    slider.prepend(slider.lastElementChild);
    const len = slider.length;
    slider.style.width = `${100 * len}%`;
    slideList[0].classList.add("on");
    slideList.forEach((el) => {
        el.style.width = `${100 / len}%`;
    });
};

const setIndex = (nextIndex) => {
    if (nextIndex >= slideList.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = slideList.length - 1;
    }
    slideIndex = nextIndex;
    slideList.forEach((el, index) => {
        index === slideIndex ? el.classList.add("on") : el.classList.remove("on");
    });
    dots.forEach((el, index) => {
        index === slideIndex ? el.classList.add("on") : el.classList.remove("on");
    });
};

const nextClick = (e) => {
    e.preventDefault();
    setIndex(slideIndex + 1);
    if (enableClick) {
        enableClick = false;
        new Anime(slider, {
            prop: "margin-left",
            value: "-200%",
            duration: 500,
            callback: () => {
                slider.append(slider.firstElementChild);
                slider.style.marginLeft = "-100%";
                enableClick = true;
            },
        });
    }
};

const prevClick = (e) => {
    e.preventDefault();
    setIndex(slideIndex - 1);
    if (enableClick) {
        enableClick = false;
        new Anime(slider, {
            prop: "margin-left",
            value: "0%",
            duration: 500,
            callback: () => {
                slider.prepend(slider.lastElementChild);
                slider.style.marginLeft = "-100%";
                enableClick = true;
            },
        });
    }
};

next.addEventListener("click", nextClick);
prev.addEventListener("click", prevClick);
init();

// tab
const tabControls = document.querySelectorAll(".tab-controller li");
const tabContent = document.querySelectorAll(".tab-content > div");
let isOn = null;

tabControls.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        isOn = e.currentTarget.classList.contains("on");
        if (this.isOn) return;
        activation(index);
    });
});

const activation = (index) => {
    for (let i = 0; i < tabControls.length; i++) {
        tabControls[i].classList.remove("on");
        tabContent[i].classList.remove("on");
    }
    tabControls[index].classList.add("on");
    tabContent[index].classList.add("on");
};

// banner with line
const hangImg = document.querySelector(".line-top-right");
const imgTop = document.querySelector("#banner-overlap").offsetTop - 300;
const counterTop = document.querySelector("#parallax").offsetTop - 500;
let countShow = true;

window.addEventListener("scroll", (e) => {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > imgTop) {
        hangImg.classList.add("fixed");
    }
    if (scrollPosition > counterTop && countShow) {
        // counter
        let upto1 = 0;
        let upto2 = 0;
        let upto3 = 0;
        let upto4 = 0;
        let counts1 = setInterval(updated, 100);
        let counts2 = setInterval(updated2, 100);
        let counts3 = setInterval(updated3);
        let counts4 = setInterval(updated4);

        function updated() {
            const counter1 = document.querySelector(".counter1");
            counter1.innerHTML = ++upto1 + "k";
            if (upto1 === 15) {
                clearInterval(counts1);
            }
        }
        function updated2() {
            const counter2 = document.querySelector(".counter2");
            counter2.innerHTML = ++upto2;
            if (upto2 === 25) {
                clearInterval(counts2);
            }
        }
        function updated3() {
            const counter3 = document.querySelector(".counter3");
            counter3.innerHTML = ++upto3;
            if (upto3 === 1234) {
                clearInterval(counts3);
            }
        }
        function updated4() {
            const counter4 = document.querySelector(".counter4");
            counter4.innerHTML = ++upto4;
            if (upto4 === 369) {
                clearInterval(counts4);
            }
        }
        countShow = false;
    }
});

// cookie
const cookiePopup = document.querySelector("#cookie-popup");
const cookieClose = cookiePopup.querySelector(".close");
const isCookie = document.cookie.includes("popup=done");

let isCookieOn;

//쿠키가 있다면
if (isCookie) {
    isCookieOn = "none";
} else {
    isCookieOn = "block";
}
cookiePopup.style.display = isCookieOn;

cookieClose.addEventListener("click", () => {
    cookiePopup.style.display = "none";
    let isChecked = cookiePopup.querySelector("#ck").checked;
    if (isChecked) setCookie("popup=done", 1);
});

const setCookie = (name, due) => {
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + due);
    const duedate = today.toGMTString();
    document.cookie = `${name}; path=/; expires=${duedate}`;
};
