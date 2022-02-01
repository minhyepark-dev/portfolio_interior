// menu
const gnb_lis = document.querySelectorAll("#gnb > li");
gnb_lis.forEach((li) => {
    li.addEventListener("mouseenter", (e) => {
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
});

// go to top
const goTop = document.querySelector("#go-top");

goTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// mobile menu
const btnCall = document.querySelector(".btn-call");
const menuMobile = document.querySelector(".nav-mobile");

btnCall.onclick = function (e) {
    e.preventDefault();
    btnCall.classList.toggle("on");
    menuMobile.classList.toggle("on");
    body.classList.toggle("on");
};

// sub page h2 line
const subTitle = document.querySelector(".title-wrap h2");
if (subTitle) subTitle.classList.add("on");
