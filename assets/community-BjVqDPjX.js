import"./common-DqpJ4Grd.js";/* empty css              */const r=document.querySelectorAll("#tab-table a"),i=document.querySelectorAll(".tab-content > div"),d=document.querySelector(".box-search button[type=submit]"),o=document.querySelectorAll(".numbers a");let l=null;d.addEventListener("click",s=>{s.preventDefault()});r.forEach((s,e)=>{s.addEventListener("click",t=>{t.preventDefault(),l=t.currentTarget.classList.contains("on"),!l&&(u(e),e===0?a():e===1?f():e===2&&m())})});const u=s=>{for(let e=0;e<r.length;e++)r[e].classList.remove("on"),i[e].classList.remove("on");r[s].classList.add("on"),i[s].classList.add("on")};o.forEach(s=>{s.addEventListener("click",e=>{e.preventDefault();for(let t=0;t<o.length;t++)o[t].classList.remove("on");e.currentTarget.classList.add("on")})});function a(){const s=document.querySelector("#board tbody");fetch("/public/dbs/community.json").then(t=>t.json()).then(t=>{let c=t.board;e(c)});function e(t){let c="";t.forEach(n=>{c+=`
                    <tr>
                        <td>${n.number}</td>
                        <td>
                            <a href="#">${n.title}</a>
                        </td>
                        <td>${n.writer}</td>
                        <td>${n.date}</td>
                    </tr>
             `}),s.innerHTML=c}}function f(){const s=document.querySelector(".ask");fetch("/public/dbs/community.json").then(t=>t.json()).then(t=>{let c=t.ask;e(c)});function e(t){let c="";t.forEach(n=>{c+=`
                <div class="card">
                    ${n.answer?'<i class="fas fa-check-circle on"></i>':'<i class="fas fa-check-circle"></i>'}
                    <h3>${n.title}</h3>
                    <span>${n.writer}</span>
                    <p class="date">${n.date}</p>
                    <p>${n.content}</p>
                    ${n.answer?`<div class="answer">
                                <strong>Answer</strong>
                                <p>${n.answer}</p>
                            </div>`:""}
                </div>
             `}),s.innerHTML=c}}function m(){const s=document.querySelector(".faq tbody");fetch("/public/dbs/community.json").then(t=>t.json()).then(t=>{let c=t.faq;e(c)});function e(t){let c="";t.forEach(n=>{c+=`
                    <tr>
                        <td>${n.number}</td>
                        <td>
                            <a href="#">${n.title}</a>
                        </td>
                        <td>Admin</td>
                        <td>${n.date}</td>
                    </tr>
             `}),s.innerHTML=c}}a();
