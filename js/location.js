var container = document.getElementById("map");
const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];

const branch_btns = document.querySelectorAll(".branch li");
const mapOverlay = document.querySelectorAll(".map-overlay > div");

let drag = true;
let zoom = true;

var options = {
    center: new kakao.maps.LatLng(37.551301397986144, 126.98855314889764),
    level: 3,
};

var map = new kakao.maps.Map(container, options);

var markerOptions = [
    {
        title: "Head Office",
        latlng: new kakao.maps.LatLng(37.551301397986144, 126.98855314889764),
        imgSrc: "../img/icon-map.png",
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(50, 60) },
        button: branch_btns[0],
        overlay: mapOverlay[0],
    },
    {
        title: "First Branch",
        latlng: new kakao.maps.LatLng(35.15317690680852, 129.11898444686017),
        imgSrc: "../img/icon-map.png",
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(25, 50) },
        button: branch_btns[1],
        overlay: mapOverlay[1],
    },
    {
        title: "Second Branch",
        latlng: new kakao.maps.LatLng(37.286978547618006, 127.01215097235253),
        imgSrc: "../img/icon-map.png",
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(50, 60) },
        button: branch_btns[2],
        overlay: mapOverlay[2],
    },
];

if (window.innerWidth < 768) {
    mapOverlay.forEach((el) => {
        el.classList.remove("on");
    });
}

for (let i = 0; i < markerOptions.length; i++) {
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos),
    });

    markerOptions[i].button.addEventListener("click", (e) => {
        e.preventDefault();
        for (let k = 0; k < markerOptions.length; k++) {
            markerOptions[k].button.classList.remove("on");
            markerOptions[k].overlay.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");
        if (window.innerWidth > 460) {
            markerOptions[i].overlay.classList.add("on");
        }
        moveTo(markerOptions[i].latlng);
    });

    kakao.maps.event.addListener(marker, "click", function () {
        for (let k = 0; k < markerOptions.length; k++) {
            markerOptions[k].overlay.classList.remove("on");
        }
        markerOptions[i].overlay.classList.add("on");
    });
}

mapOverlay.forEach((el) => {
    const close = el.querySelector(".close");
    close.addEventListener("click", (e) => {
        e.preventDefault();
        e.currentTarget.closest(".text-map").classList.remove("on");
    });
});

t_on.addEventListener("click", (e) => {
    e.preventDefault();
    if (t_on.classList.contains("on")) return;
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.add("on");
    t_off.classList.remove("on");
});
t_off.addEventListener("click", (e) => {
    e.preventDefault();
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_off.classList.add("on");
    t_on.classList.remove("on");
});

function moveTo(target) {
    var moveLatLon = target;
    map.setCenter(moveLatLon);
}

window.onresize = () => {
    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");
    map.setCenter(markerOptions[active_index].latlng);
    if (window.innerWidth < 768) {
        mapOverlay.forEach((el) => {
            el.classList.remove("on");
        });
    }
};

function setMapType(maptype) {
    var roadmapControl = document.getElementById("btnRoadmap");
    var skyviewControl = document.getElementById("btnSkyview");
    if (maptype === "roadmap") {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = "selected_btn";
        skyviewControl.className = "btn";
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = "selected_btn";
        roadmapControl.className = "btn";
    }
}

setDraggable(drag);
function setDraggable(draggable) {
    map.setDraggable(draggable);
}

setZoomable(zoom);
function setZoomable(zoomable) {
    map.setZoomable(zoomable);
}

const sub = document.querySelectorAll("#gnb > li .sub");
const locationBtn = document.querySelector(".location .inner");

locationBtn.addEventListener("mouseenter", () => {
    sub.forEach((el) => {
        el.style.display = "none";
    });
});
locationBtn.addEventListener("mouseleave", () => {
    sub.forEach((el) => {
        el.style.display = "block";
    });
});
