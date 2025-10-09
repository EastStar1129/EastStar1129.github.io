// wedding.js
document.addEventListener("DOMContentLoaded", () => {
    const frames = document.querySelectorAll(".frame2, .frame3, .frame4");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    frames.forEach((frame) => observer.observe(frame));
});

//section 3
const weddingDate = new Date(2026, 0, 31); // 0월 = 1월

function generateCalendar() {
    const daysContainer = document.getElementById("days");
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 빈 칸
    for(let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        daysContainer.appendChild(empty);
    }

    // 날짜
    for(let i = 1; i <= lastDate; i++) {
        const day = document.createElement("div");
        day.textContent = i;

        const currentDate = new Date(year, month, i);
        const dayOfWeek = currentDate.getDay();

        if(i === 1 || dayOfWeek === 0) day.classList.add("sunday");
        if(dayOfWeek === 6) day.classList.add("saturday");
        if(i === weddingDate.getDate()) day.classList.add("event");

        daysContainer.appendChild(day);
    }
}

function updateCountdown() {
    const today = new Date();
    const wedding = new Date(2026, 0, 31); // 1월 31일
    const diffTime = wedding - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("daysLeft").textContent = diffDays > 0 ? diffDays : 0;
}

/*** 5 ***/
document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const totalImages = 30;
    const images = [];

    // 갤러리 이미지 자동 생성
    for(let i=1; i<=totalImages; i++){
        const img = document.createElement('img');
        img.src = `img/img${i}.jpg`; // 실제 이미지 경로
        img.alt = `Gallery Image ${i}`;
        galleryGrid.appendChild(img);
        images.push(img.src);

        img.addEventListener('click', () => {
            currentIndex = i-1;
            modalImg.src = images[currentIndex];
            modal.style.display = 'flex';
        });
    }

    let currentIndex = 0;

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex];
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    modal.addEventListener('click', () => modal.style.display = 'none');

    document.addEventListener('keydown', (e) => {
        if(modal.style.display === 'flex'){
            if(e.key === 'ArrowRight') showNext();
            if(e.key === 'ArrowLeft') showPrev();
            if(e.key === 'Escape') modal.style.display = 'none';
        }
    });

    // 모바일 스와이프
    let startX = 0;
    modal.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    modal.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if(endX - startX > 50) showPrev();
        else if(startX - endX > 50) showNext();
    });
});


/** 6 **/


document.addEventListener("DOMContentLoaded", updateCountdown);
document.addEventListener("DOMContentLoaded", generateCalendar);


