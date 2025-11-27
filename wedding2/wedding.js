// 기존 코드 전체를 삭제하고 아래로 교체
setTimeout(() => {
    // 오버레이 페이드 아웃
    document.getElementById('introOverlay').classList.add('fade-out');

    // 타이틀 프레임 표시
    document.querySelector('.title-frame').classList.add('show');

    // 메인 텍스트 애니메이션 시작
    setTimeout(() => {
        var textWrapper = document.querySelector('.ml1 .letters');

        anime.timeline({loop: false})
            .add({
                targets: '.ml1 .letter',
                scale: [0.3,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 600,
                delay: (el, i) => 70 * (i+1)
            }).add({
            targets: '.ml1 .line',
            scaleX: [0,1],
            opacity: [0.5,1],
            easing: "easeOutExpo",
            duration: 700,
            offset: '-=875',
            delay: (el, i, l) => 80 * (l - i)
        });
    }, 500);
}, 3000);

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

    const totalImages = 24;
    const images = [];
    let loadedImages = 0;
    const imagesPerLoad = 4;

    // 모든 이미지 경로 미리 저장
    for(let i=1; i<=totalImages; i++){
        images.push(`img/img${i}.jpg`);
    }

    let currentIndex = 0;

    // 이미지 로드 함수
    function loadMoreImages() {
        const start = loadedImages + 1;
        const end = Math.min(loadedImages + imagesPerLoad, totalImages);

        for(let i = start; i <= end; i++){
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'gallery-img';

            const img = document.createElement('img');
            img.id = `img${i}`;
            img.src = `img/img${i}.jpg`;
            img.alt = 'Gallery Image';

            // 특수 스타일 적용
            if(i === 6) img.style.objectPosition = 'calc(50% - 30px) center';
            if(i === 12) img.style.transform = 'scale(1.2)';

            img.addEventListener('click', () => {
                currentIndex = i-1;
                modalImg.src = images[currentIndex];
                modal.style.display = 'flex';
            });

            imgWrapper.appendChild(img);
            galleryGrid.appendChild(imgWrapper);
        }

        loadedImages = end;

        // 더보기 버튼 표시/숨김
        if(loadedImages >= totalImages) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // 더보기 버튼 생성
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = '더보기 +';
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.addEventListener('click', loadMoreImages);
    galleryGrid.parentElement.appendChild(loadMoreBtn);

    // 초기 이미지 로드
    loadMoreImages();

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


document.addEventListener("DOMContentLoaded", updateCountdown);
document.addEventListener("DOMContentLoaded", generateCalendar);

// 스크롤 애니메이션 - Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const frames = document.querySelectorAll('.frame');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10%가 보이면 트리거
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    frames.forEach(frame => {
        observer.observe(frame);
    });
});

// Frame7 - 마음 전하실 곳 콤보박스
// ===== Frame7: 드롭다운 토글 & 복사 토스트 =====
document.addEventListener("DOMContentLoaded", () => {
    // 드롭다운 토글
    document.querySelectorAll(".dropdown-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target || btn.getAttribute('data-target') || btn.nextElementSibling?.id;
            const content = document.getElementById(targetId) || btn.nextElementSibling;
            if (!content) return;
            const isOpen = content.style.display === "block";
            // close all siblings first (optional)
            document.querySelectorAll(".dropdown-content").forEach(c => { if (c !== content) c.style.display = "none"; });
            content.style.display = isOpen ? "none" : "block";
            btn.setAttribute("aria-expanded", String(!isOpen));
            content.setAttribute("aria-hidden", String(isOpen));
        });
    });

    // 복사 + 토스트
    const toast = document.getElementById("copy-toast");
    function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 1500);
    }

    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const acc = btn.getAttribute("data-account") || "";
            try {
                await navigator.clipboard.writeText(acc);
                showToast();
            } catch (err) {
                // fallback
                const ta = document.createElement("textarea");
                ta.value = acc;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast();
            }
        });
    });

    // 클릭 외부 닫기 (드롭다운)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
    });
});