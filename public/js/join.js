const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

// submit 버튼 클릭시 모든 항목에 에러가 없는지 인증
btnSubmit.addEventListener("click", (e) => {
    //userid 인증함수
    if (!isTxt("userid", 5)) e.preventDefault();
    //비밀번호 인증함수
    if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
    //email 인증함수
    if (!isEmail("email")) e.preventDefault();
    //gender 인증함수
    if (!isCheck("gender")) e.preventDefault();
    //hobby 인증함수
    if (!isCheck("hobby")) e.preventDefault();
    //comments 인증함수
    if (!isTxt("comments", 20)) e.preventDefault();
});

// 텍스트 인증 함수 정의
function isTxt(name, len) {
    if (len === undefined) len = 5;
    let input = form.querySelector(`[name=${name}]`);
    let txt = input.value;

    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    if (txt.length >= len && txt != "") {
        input.classList.remove("text-error");
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
        input.closest("td").append(errMsg);
        input.classList.add("text-error");
        return false;
    }
}

// email 인증 함수 정의
function isEmail(name) {
    let input = form.querySelector(`[name=${name}]`);
    let txt = input.value;

    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();

    // @ 문자가 포함되어있는지
    if (/@/.test(txt)) {
        input.classList.remove("text-error");
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append("@를 포함한 전체 이메일 주소를 입력해주세요");
        input.closest("td").append(errMsg);
        input.classList.add("text-error");
        return false;
    }
}

// 체크박스,라디오박스 인증 함수 정의
function isCheck(name) {
    let inputs = form.querySelectorAll(`[name=${name}]`);
    let isChecked = false;

    // 체크되어있는 요소 확인
    for (let el of inputs) {
        if (el.checked) isChecked = true;
    }

    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

    if (isChecked) {
        return true;
    } else {
        const errMsg = document.createElement("p");
        errMsg.append("필수입력항목을 체크해주세요");
        inputs[0].closest("td").append(errMsg);
        return false;
    }
}

// 비밀번호 인증 함수 정의
function isPwd(name1, name2, len) {
    let pwd1 = form.querySelector(`[name=${name1}]`);
    let pwd2 = form.querySelector(`[name=${name2}]`);
    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+]/;

    const errMsgs = pwd1.closest("td").querySelectorAll("p");
    const errMsgs2 = pwd2.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    if (errMsgs2.length > 0) pwd2.closest("td").querySelector("p").remove();

    // 비밀번호와 재입력 값이 값은지, 문자의 수가 5개이상, 공란이 아니고, 숫자포함, 영문자포함, 특수문자포함
    if (pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
        pwd1.classList.remove("text-error");
        pwd2.classList.remove("text-error");
        return true;
    } else {
        const errMsg = document.createElement("p");
        const errMsg2 = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상 영문, 숫자, 특수문자를 포함하여 입력하세요`);
        errMsg2.append(`비밀번호를 동일하게 입력하세요`);
        pwd1.closest("td").append(errMsg);
        pwd2.closest("td").append(errMsg2);
        pwd1.classList.add("text-error");
        pwd2.classList.add("text-error");
        return false;
    }
}
