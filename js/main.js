const init = () => {
    mainSlider();
    mainTab();
    cookiePop();
};

init();

// 메인 슬라이드 정의 함수
function mainSlider() {
    const slider = document.querySelector(".visual");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const slideList = slider.querySelectorAll("li");
    const dots = document.querySelectorAll(".arrow-dots div");
    // mask동작이 끝났는지 체크
    let enableClick = true;
    // 슬라이드 인덱스
    let slideIndex = 0;

    slider.style.marginLeft = "-100%";
    slider.prepend(slider.lastElementChild);
    slideList[0].classList.add("on");

    // slider의 순서를 체크
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

    // 다음버튼 클릭시
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

    // 이전버튼 클릭시
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
}

// 메인 탭 정의 함수
function mainTab() {
    const tabControls = document.querySelectorAll(".tab-controller li");
    const tabContent = document.querySelectorAll(".tab-content > div");
    let isOn = null;

    // 탭 메뉴를 클릭시
    tabControls.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            isOn = e.currentTarget.classList.contains("on");
            if (isOn) return;
            activation(index);
        });
    });

    // 탭 메뉴를 클릭한 순서를 체크하여 클래스 on 추가 제거
    const activation = (index) => {
        for (let i = 0; i < tabControls.length; i++) {
            tabControls[i].classList.remove("on");
            tabContent[i].classList.remove("on");
        }
        tabControls[index].classList.add("on");
        tabContent[index].classList.add("on");
    };
}

// 라인이 그려지는 효과 정의 함수
function drawBorder(scrollPosition) {
    const hangImg = document.querySelector(".line-top-right");
    const imgTop = document.querySelector("#banner-overlap").offsetTop - 300;
    if (scrollPosition > imgTop) {
        hangImg.classList.add("fixed");
    }
}

let countShow = true;
// 카운터 함수 정의
function counter(scrollPosition) {
    const counterTop = document.querySelector("#parallax").offsetTop - 500;

    if (scrollPosition > counterTop && countShow) {
        countingAction(0, 15, ".counter1", 100);
        countingAction(0, 25, ".counter2", 100);
        countingAction(0, 1234, ".counter3");
        countingAction(0, 369, ".counter4");
        countShow = false;
    }
}

function countingAction(min, max, el, speed) {
    const counter = document.querySelector(el);
    const counts = setInterval(() => {
        if (min < max) {
            counter.innerHTML = ++min;
        } else {
            clearInterval(counts);
        }
    }, speed);
}

// 스크롤 할 때 실행
window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    drawBorder(scrollPosition);
    counter(scrollPosition);
});

// 쿠키 팝업 함수 정의
function cookiePop() {
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

    // 닫기 버튼 클릭시
    cookieClose.addEventListener("click", () => {
        cookiePopup.style.display = "none";
        let isChecked = cookiePopup.querySelector("#ck").checked;
        if (isChecked) setCookie("popup=done", 1);
    });

    // 쿠키값 저장
    const setCookie = (name, due) => {
        const today = new Date();
        const date = today.getDate();
        today.setDate(date + due);
        const duedate = today.toGMTString();
        document.cookie = `${name}; path=/; expires=${duedate}`;
    };
}
