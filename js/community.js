const tabControls = document.querySelectorAll('#tab-table a');
const tabContent = document.querySelectorAll('.tab-content > div');
const btnSearch = document.querySelector('.box-search button[type=submit]');
const pageNumbers = document.querySelectorAll('.numbers a');

let isOn = null;

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
});

// 탭 메뉴 클릭시
tabControls.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    isOn = e.currentTarget.classList.contains('on');
    if (isOn) return;
    activation(index);
    // 클릭한 탭 메뉴에 따라 호출하는 함수
    if (index === 0) board();
    else if (index === 1) ask();
    else if (index === 2) faq();
  });
});

// 탭 메뉴 순서를 체크해서 클래스 on 추가,제거
const activation = (index) => {
  for (let i = 0; i < tabControls.length; i++) {
    tabControls[i].classList.remove('on');
    tabContent[i].classList.remove('on');
  }
  tabControls[index].classList.add('on');
  tabContent[index].classList.add('on');
};

// 페이지네이션 클릭시
pageNumbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    e.preventDefault();
    for (let i = 0; i < pageNumbers.length; i++) {
      pageNumbers[i].classList.remove('on');
    }
    e.currentTarget.classList.add('on');
  });
});

// board json 데이터 불러오기
function board() {
  const tabBoard = document.querySelector('#board tbody');
  fetch('dbs/community.json')
    .then((response) => response.json())
    .then((data) => {
      let items = data.board;
      creatBoardList(items);
    });

  // 데이터 갯수만큼 동적으로 리스트 생성
  function creatBoardList(items) {
    let htmls = '';
    items.forEach((data) => {
      htmls += `
                    <tr>
                        <td>${data.number}</td>
                        <td>
                            <a href="#">${data.title}</a>
                        </td>
                        <td>${data.writer}</td>
                        <td>${data.date}</td>
                    </tr>
             `;
    });
    tabBoard.innerHTML = htmls;
  }
}

// ask json 데이터 불러오기
function ask() {
  const tabAsk = document.querySelector('.ask');
  fetch('dbs/community.json')
    .then((response) => response.json())
    .then((data) => {
      let items = data.ask;
      creatAskList(items);
    });

  // 데이터 갯수만큼 동적으로 리스트 생성
  function creatAskList(items) {
    let htmls = '';
    items.forEach((data) => {
      htmls += `
                <div class="card">
                    ${
                      data.answer
                        ? `<i class="fas fa-check-circle on"></i>`
                        : `<i class="fas fa-check-circle"></i>`
                    }
                    <h3>${data.title}</h3>
                    <span>${data.writer}</span>
                    <p class="date">${data.date}</p>
                    <p>${data.content}</p>
                    ${
                      data.answer
                        ? `<div class="answer">
                                <strong>Answer</strong>
                                <p>${data.answer}</p>
                            </div>`
                        : ''
                    }
                </div>
             `;
    });
    tabAsk.innerHTML = htmls;
  }
}
// faq json 데이터 불러오기
function faq() {
  const tabFaq = document.querySelector('.faq tbody');
  fetch('dbs/community.json')
    .then((response) => response.json())
    .then((data) => {
      let items = data.faq;
      creatFaqList(items);
    });

  // 데이터 갯수만큼 동적으로 리스트 생성
  function creatFaqList(items) {
    let htmls = '';
    items.forEach((data) => {
      htmls += `
                    <tr>
                        <td>${data.number}</td>
                        <td>
                            <a href="#">${data.title}</a>
                        </td>
                        <td>Admin</td>
                        <td>${data.date}</td>
                    </tr>
             `;
    });
    tabFaq.innerHTML = htmls;
  }
}

board();
