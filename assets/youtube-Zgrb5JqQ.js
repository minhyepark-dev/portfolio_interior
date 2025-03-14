import"./common-DqpJ4Grd.js";/* empty css              */const i=document.querySelector("body"),r=document.querySelector(".vidList"),d="AIzaSyCEH01dII9F6sGxDEU4lWx-wmMec8Miz00",p="PLjIdINgJblV--hzUP4fzSuXlVk5n090dy",u=12,f=`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${d}&playlistId=${p}&maxResults=${u}`,m=document.querySelector(".btn-play");y(f);m.addEventListener("click",e=>{e.preventDefault();const s=e.currentTarget.querySelector("i"),t=e.currentTarget.closest(".video-wrap").querySelector("video");t.paused||t.ended?(s.className="fas fa-pause",t.play()):(s.className="fas fa-play",t.pause())});r.addEventListener("click",e=>{b(e),l(e)});r.addEventListener("keydown",e=>{e.target!=r&&e.key==="Enter"&&(h(e),l(e))});function y(e){fetch(e).then(s=>s.json()).then(s=>{let t=s.items;v(t)})}function v(e){let s="";e.forEach(t=>{let n=t.snippet.title;n.length>26&&(n=n.substr(0,26));let o=t.snippet.description;o.length>100&&(o=o.substr(0,100));let a=t.snippet.publishedAt;a=a.split("T")[0];let c=t.snippet.resourceId.videoId;s+=`
            <article>
                <div class="box-video">
                    <a href="${c}" class="pic">
                        <img src="${t.snippet.thumbnails.medium.url}">
                        <i class="fas fa-play"></i>
                    </a>
                </div>
                <div class="text-video">
                    <h2>${n}...</h2>
                    <p>${o}...</p>
                    <span>${a}</span>
                </div>
            </article>
    `}),r.innerHTML=s}function b(e){if(e.preventDefault(),e.target.parentNode.nodeName!="A")return;const s=e.target.closest("a").getAttribute("href");let t=document.createElement("figure");t.classList.add("pop"),t.innerHTML=`
        <iframe src="https://www.youtube.com/embed/${s}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose" tabindex="0">close</span>
  `,r.append(t),i.style.overflow="hidden"}function h(e){if(e.preventDefault(),e.target.nodeName!="A")return;const s=e.target.getAttribute("href");let t=document.createElement("figure");t.classList.add("pop"),t.innerHTML=`
            <iframe src="https://www.youtube.com/embed/${s}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="btnClose" tabindex="0">close</span>
      `,r.append(t),i.style.overflow="hidden"}function l(e){const s=r.querySelector("figure");if(s!=null){const t=s.querySelector(".btnClose");e.target==t&&(e.target.closest("figure").remove(),i.style.overflow="auto")}}
