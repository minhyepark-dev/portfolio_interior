import"./common-DqpJ4Grd.js";/* empty css              */const m=document.querySelector(".box-member");fetch("/public/dbs/department.json").then(e=>e.json()).then(e=>{let t=e.data;i(t)});function i(e){let t="";e.forEach(n=>{t+=`
                <div>
                    <p>${n.name}<span>${n.position}</span></p>
                    <img src="${n.img}" alt="">
                </div>
         `}),m.innerHTML=t}
