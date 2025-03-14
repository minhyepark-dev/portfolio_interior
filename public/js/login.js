const Loginform = document.querySelector("#login");
const btnLogin = Loginform.querySelector("input[type=submit]");

// 로그인 버튼 클릭시 두 항목 모두 에러가 없는지 인증
btnLogin.addEventListener("click", (e) => {
    if (!isTxt("id", 5)) e.preventDefault();
    if (!isPwd("pwd", 5)) e.preventDefault();
});

// 텍스트 인증 함수 정의
function isTxt(name, len) {
    if (len === undefined) len = 5;
    let input = Loginform.querySelector(`[name=${name}]`);
    let txt = input.value;

    const errMsgs = input.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("div").querySelector("p").remove();

    // 문자의 수가 5개이상이고 공란이 아니면
    if (txt.length >= len && txt != "") {
        input.classList.remove("text-error");
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`아이디를 ${len}글자 이상 입력하세요`);
        input.closest("div").append(errMsg);
        input.classList.add("text-error");
        return false;
    }
}

// 비밀번호 인증 함수 정의
function isPwd(name1, len) {
    let pwd = Loginform.querySelector(`[name=${name1}]`);
    let pwd_val = pwd.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+]/;

    const errMsgs = pwd.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) pwd.closest("div").querySelector("p").remove();

    // 문자의 수가 5개이상이고 공란이 아니고, 숫자포함, 영문자포함, 특수문자포함
    if (pwd_val.length >= len && num.test(pwd_val) && eng.test(pwd_val) && spc.test(pwd_val)) {
        pwd.classList.remove("text-error");
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상 영문, 숫자, 특수문자를 포함하여 입력하세요`);
        pwd.closest("div").append(errMsg);
        pwd.classList.add("text-error");
        return false;
    }
}
