const gnb_lis = document.querySelectorAll("#gnb > li");
const goTop = document.querySelector("#go-top");
const btnCall = document.querySelector(".btn-call");
const menuMobile = document.querySelector(".nav-mobile");
const subTitle = document.querySelector(".title-wrap h2");

// 메뉴 버튼에 마우스오버시 서브메뉴 표출
gnb_lis.forEach((li) => {
    li.querySelector("a").addEventListener("mouseenter", (e) => {
        li.classList.add("on");
        const sub = e.currentTarget.closest("li").querySelector(".sub");
        if (sub) {
            sub.style.zIndex = 3;
        }
    });
    li.addEventListener("mouseleave", (e) => {
        li.classList.remove("on");
        const sub = e.currentTarget.querySelector(".sub");
        if (sub) {
            sub.style.zIndex = 2;
        }
    });
    li.addEventListener("focusin", (e) => {
        li.classList.add("on");
        const sub = e.currentTarget.closest("li").querySelector(".sub");
        if (sub) {
            sub.style.zIndex = 3;
        }
    });
    li.addEventListener("focusout", (e) => {
        li.classList.remove("on");
    });
    const sub = li.querySelector(".sub ul");
    if (sub) {
        const lastEl = sub.lastElementChild;
        lastEl.addEventListener("focusout", (e) => {
            e.currentTarget.closest(".sub").style.zIndex = 0;
        });
    }
});

// 상단으로 이동하는 버튼 클릭 시
goTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 모바일 햄버거 메뉴 클릭시
btnCall.onclick = function (e) {
    e.preventDefault();
    btnCall.classList.toggle("on");
    menuMobile.classList.toggle("on");
    body.classList.toggle("on");
};

// 서브페이지가 로딩되었을 때
if (subTitle) subTitle.classList.add("on");
