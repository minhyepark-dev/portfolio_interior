import"./common-DqpJ4Grd.js";/* empty css              */const v=()=>{k(),y(),g()};v();function k(){const e=document.querySelector(".visual"),o=document.querySelector(".next"),c=document.querySelector(".prev"),n=e.querySelectorAll("li"),l=document.querySelectorAll(".arrow-dots div");let t=!0,s=0;e.style.marginLeft="-100%",e.prepend(e.lastElementChild),n[0].classList.add("on");const i=r=>{r>=n.length?r=0:r<0&&(r=n.length-1),s=r,n.forEach((a,f)=>{f===s?a.classList.add("on"):a.classList.remove("on")}),l.forEach((a,f)=>{f===s?a.classList.add("on"):a.classList.remove("on")})},u=r=>{r.preventDefault(),i(s+1),t&&(t=!1,new Anime(e,{prop:"margin-left",value:"-200%",duration:500,callback:()=>{e.append(e.firstElementChild),e.style.marginLeft="-100%",t=!0}}))},p=r=>{r.preventDefault(),i(s-1),t&&(t=!1,new Anime(e,{prop:"margin-left",value:"0%",duration:500,callback:()=>{e.prepend(e.lastElementChild),e.style.marginLeft="-100%",t=!0}}))};o.addEventListener("click",u),c.addEventListener("click",p)}function y(){const e=document.querySelectorAll(".tab-controller li"),o=document.querySelectorAll(".tab-content > div");let c=null;e.forEach((l,t)=>{l.addEventListener("click",s=>{s.preventDefault(),c=s.currentTarget.classList.contains("on"),!c&&n(t)})});const n=l=>{for(let t=0;t<e.length;t++)e[t].classList.remove("on"),o[t].classList.remove("on");e[l].classList.add("on"),o[l].classList.add("on")}}function L(e){const o=document.querySelector(".line-top-right"),c=document.querySelector("#banner-overlap").offsetTop-300;e>c&&o.classList.add("fixed")}let m=!0;function S(e){const o=document.querySelector("#parallax").offsetTop-500;e>o&&m&&(d(0,15,".counter1",100),d(0,25,".counter2",100),d(0,1234,".counter3"),d(0,369,".counter4"),m=!1)}function d(e,o,c,n){const l=document.querySelector(c),t=setInterval(()=>{e<o?l.innerHTML=++e:clearInterval(t)},n)}window.addEventListener("scroll",()=>{let e=window.scrollY||document.documentElement.scrollTop;L(e),S(e)});function g(){const e=document.querySelector("#cookie-popup"),o=e.querySelector(".close"),c=document.cookie.includes("popup=done");let n;c?n="none":n="block",e.style.display=n,o.addEventListener("click",()=>{e.style.display="none",e.querySelector("#ck").checked&&l("popup=done",1)});const l=(t,s)=>{const i=new Date,u=i.getDate();i.setDate(u+s);const p=i.toGMTString();document.cookie=`${t}; path=/; expires=${p}`}}
