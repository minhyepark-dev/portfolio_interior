import"./common-DqpJ4Grd.js";/* empty css              */const c=document.querySelector("body"),o=document.querySelector("#list"),h=document.querySelector("#wrapper"),$=document.querySelector("#search"),k=document.querySelector(".btn-search"),g=document.querySelectorAll(".list-title > div span"),a="https://www.flickr.com/services/rest/?",b="flickr.interestingness.getList",v="flickr.photos.search",u="flickr.galleries.getPhotos",m="39d6e86ec62077747de49698953a05a8",p=30,d="json",_="72157720386366321",S="72157720382448749",E="72157720392940072",y=`${a}method=${b}&api_key=${m}&per_page=${p}&format=${d}&nojsoncallback=1`;i(y);g.forEach(e=>{const s=`${a}method=${u}&api_key=${m}&gallery_id=${_}&per_page=${p}&format=${d}&nojsoncallback=1`,t=`${a}method=${u}&api_key=${m}&gallery_id=${S}&per_page=${p}&format=${d}&nojsoncallback=1`,r=`${a}method=${u}&api_key=${m}&gallery_id=${E}&per_page=${p}&format=${d}&nojsoncallback=1`;e.addEventListener("click",l=>{for(let n=0;n<g.length;n++)g[n].classList.remove("on");l.currentTarget.classList.add("on"),e.classList.contains("living")?i(s):e.classList.contains("bed")?i(t):e.classList.contains("kitchen")?i(r):i(y)}),e.addEventListener("keydown",l=>{if(l.key==="Enter"){for(let n=0;n<g.length;n++)g[n].classList.remove("on");l.currentTarget.classList.add("on"),e.classList.contains("living")?i(s):e.classList.contains("bed")?i(t):e.classList.contains("kitchen")?i(r):i(y)}})});k.addEventListener("click",e=>{let s=$.value;const t=`${a}method=${v}&api_key=${m}&per_page=${p}&format=${d}&nojsoncallback=1&tags=${s}&privacy_filter=1`;s!=""?i(t):(console.log("검색어를 입력하세요."),alert("검색어를 입력하세요."),o.innerHTML="",o.classList.remove("on"),o.style.height=0)});$.addEventListener("keyup",e=>{if(e.key==="Enter"){let s=$.value;const t=`${a}method=${v}&api_key=${m}&per_page=${p}&format=${d}&nojsoncallback=1&tags=${s}&privacy_filter=1`;s!=""?i(t):(console.log("검색어를 입력하세요."),alert("검색어를 입력하세요."),o.innerHTML="",o.classList.remove("on"),o.style.height=0)}});o.addEventListener("click",e=>{if(e.preventDefault(),e.target==o)return;let s=e.target.closest(".item").querySelector(".thumb");if(e.target==s){c.style.overflow="hidden";let t=s.parentElement.getAttribute("href"),r=document.createElement("aside");r.classList.add("pop");let l=`
        <div class="con">
            <img src="${t}">
        </div>
        <span class="close" tabindex="1">close</span>
    `;r.innerHTML=l,c.append(r)}else return});o.addEventListener("keydown",e=>{if(e.key==="Enter"){if(e.target==o)return;let s=e.target.closest(".item").querySelector(".thumb");if(e.target.childNodes[1]==s){c.style.overflow="hidden";let t=s.parentElement.getAttribute("href"),r=document.createElement("aside");r.classList.add("pop");let l=`
            <div class="con">
                <img src="${t}">
            </div>
            <span class="close" tabindex="1">close</span>
        `;r.innerHTML=l,c.append(r)}else return}});c.addEventListener("click",e=>{L(e)});c.addEventListener("keydown",e=>{L(e)});function L(e){let s=c.querySelector(".pop");if(s!=null){let t=s.querySelector(".close");e.target==t&&(c.style.overflow="auto",s.remove())}}function i(e){o.innerHTML="",h.classList.remove("off"),o.classList.remove("on"),fetch(e).then(s=>s.json()).then(s=>{let t=s.photos.photo;t.length>0?(q(t),w()):(console.log("검색하신 이미지의 데이터가 없습니다."),alert("검색하신 이미지의 데이터가 없습니다."),h.classList.add("off"),o.classList.remove("on"),o.style.height=0)})}function q(e){let s="";e.forEach(t=>{let r=`https://live.staticflickr.com/${t.server}/${t.id}_${t.secret}_m.jpg`,l=`https://live.staticflickr.com/${t.server}/${t.id}_${t.secret}_b.jpg`;s+=`
                  <li class="item">
                        <div>
                            <a href="${l}">
                                <img class="thumb" src="${r}">
                            </a>
                            <p class="img-title">${t.title}</p>
                            <span>
                                <img class="profile" src="http://farm${t.farm}.staticflickr.com/${t.server}/buddyicons/${t.owner}.jpg">
                                <strong>${t.owner}</strong>
                            </span>
                        </div>
                    </li>
         `}),o.innerHTML=s}function w(){const e=o.querySelectorAll("img"),s=e.length;let t=0;for(let r of e){r.onload=()=>{t++,t===s&&j()};let l=r.closest(".item").querySelector(".thumb");l.onerror=f=>{f.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src","../public/img/temp.jpg")};let n=r.closest(".item").querySelector(".profile");n.onerror=f=>{f.currentTarget.closest(".item").querySelector(".profile").setAttribute("src","https://combo.staticflickr.com/pw/images/buddyicon09.png")}}}function j(){h.classList.add("off"),o.classList.add("on"),new Isotope("#list",{itemSelector:".item",columnWidth:".item",transitionDuration:"0.5s"})}
