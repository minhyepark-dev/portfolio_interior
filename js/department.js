const memberWrap = document.querySelector('.box-member');

// 팀원목록 json 데이터 불러오기
fetch('/public/dbs/department.json')
  .then((response) => response.json())
  .then((data) => {
    let items = data.data;
    creatMemberList(items);
  });

// 데이터 갯수만큼 동적으로 리스트 생성
function creatMemberList(items) {
  let htmls = '';
  items.forEach((data) => {
    htmls += `
                <div>
                    <p>${data.name}<span>${data.position}</span></p>
                    <img src="${data.img}" alt="">
                </div>
         `;
  });
  memberWrap.innerHTML = htmls;
}
