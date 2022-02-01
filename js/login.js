const Loginform = document.querySelector("#login");
const btnLogin = Loginform.querySelector("input[type=submit]");

btnLogin.addEventListener("click", (e) => {
    if (!isTxt("id", 5)) e.preventDefault();
    if (!isPwd("pwd", 5)) e.preventDefault();
});

function isTxt(name, len) {
    if (len === undefined) len = 5;
    let input = Loginform.querySelector(`[name=${name}]`);
    let txt = input.value;

    if (txt.length >= len && txt != "") {
        const errMsgs = input.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) input.closest("div").querySelector("p").remove();
        input.classList.remove("text-error");
        return true;
    } else {
        const errMsgs = input.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) input.closest("div").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`아이디를 ${len}글자 이상 입력하세요`);
        input.closest("div").append(errMsg);
        input.classList.add("text-error");
        return false;
    }
}

function isPwd(name1, len) {
    let pwd = Loginform.querySelector(`[name=${name1}]`);
    let pwd_val = pwd.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+]/;

    if (pwd_val.length >= len && num.test(pwd_val) && eng.test(pwd_val) && spc.test(pwd_val)) {
        const errMsgs = pwd.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) {
            pwd.closest("div").querySelector("p").remove();
        }
        pwd.classList.remove("text-error");
        return true;
    } else {
        const errMsgs = pwd.closest("div").querySelectorAll("p");
        if (errMsgs.length > 0) pwd.closest("div").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상 영문, 숫자, 특수문자를 포함하여 입력하세요`);
        pwd.closest("div").append(errMsg);
        pwd.classList.add("text-error");
        return false;
    }
}
