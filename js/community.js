// community tab
const tabControls = document.querySelectorAll("#tab-table a");
const tabContent = document.querySelectorAll(".tab-content > div");
const btnSearch = document.querySelector(".box-search button[type=submit]");

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
});

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

const pageNumbers = document.querySelectorAll(".numbers a");

pageNumbers.forEach((number, index) => {
    number.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < pageNumbers.length; i++) {
            pageNumbers[i].classList.remove("on");
        }
        e.currentTarget.classList.add("on");
    });
});
