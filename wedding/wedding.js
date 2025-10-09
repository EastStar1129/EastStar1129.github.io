// Calendar Generation
function generateCalendar() {
    const calendarBody = document.getElementById('calendar');
    const year = 2026;
    const month = 0; // January (0-indexed)

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Previous month's last days
    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        calendarBody.appendChild(day);
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;

        if (i === 31) {
            day.classList.add('wedding');
        }

        calendarBody.appendChild(day);
    }
}

// D-Day Calculation
function calculateDday() {
    const weddingDate = new Date('2026-01-31');
    const today = new Date();
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.getElementById('days').textContent = diffDays;
}

// Gallery Generation
function generateGallery() {
    const gallery = document.getElementById('gallery');
    const imageIds = [
        '1519741497674-611481863552',
        '1465495976277-4387d14b5f1f',
        '1511285560929-80b456fea0bc',
        '1606216794385-b2f312d7c921',
        '1583939003579-730e3918a45a',
        '1529636798458-92182e662485',
        '1460978812857-470ed1c77af0',
        '1522673607200-164d1b6ce486',
        '1595433562696-d3e4fe84bf1c',
        '1543159127-ddf0f8654f7f',
        '1515934751361-17ac0d9c6e05',
        '1525258437003-d575e34f6e69',
        '1591604466107-ec97de3adbf4',
        '1520854221256-17451cc331bf',
        '1519225729993-1d0e8e5ca84e',
        '1478146896981-5116c7e6c5d5',
        '1469371670807-013ccf25f16a',
        '1522926193341-e9fac7863480',
        '1528908481142-baa4e1e3a069',
        '1515934751361-17ac0d9c6e05',
        '1606800893732-96e1c6af5398',
        '1510936111840-65e151ad71bb',
        '1524824267900-2365da7a1f92',
        '1460978812857-470ed1c77af0',
        '1511285560929-80b456fea0bc',
        '1583939003579-730e3918a45a',
        '1519741497674-611481863552',
        '1465495976277-4387d14b5f1f',
        '1606216794385-b2f312d7c921',
        '1529636798458-92182e662485'
    ];

    imageIds.forEach((id, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="https://images.unsplash.com/photo-${id}?w=400" alt="Gallery ${index + 1}">`;
        item.onclick = () => openModal(index);
        gallery.appendChild(item);
    });
}

// Modal Functions
let currentImageIndex = 0;
const galleryImages = [];

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryImages.length = 0;
    galleryItems.forEach(img => galleryImages.push(img.src.replace('w=400', 'w=1200')));

    modalImage.src = galleryImages[index];
    document.getElementById('currentIndex').textContent = index + 1;
    document.getElementById('totalImages').textContent = galleryImages.length;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
    document.getElementById('currentIndex').textContent = currentImageIndex + 1;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
    document.getElementById('currentIndex').textContent = currentImageIndex + 1;
}

// Phone Call
function callPhone(number) {
    window.location.href = `tel:${number}`;
}

// Map Functions
function openMap(type) {
    const address = '서울특별시 구로구 경인로 661 신도림 더링크호텔';
    const encodedAddress = encodeURIComponent(address);

    let url = '';
    switch(type) {
        case 'naver':
            url = `nmap://place?lat=37.508&lng=126.891&name=${encodedAddress}&appname=wedding`;
            window.location.href = url;
            setTimeout(() => {
                window.open(`https://map.naver.com/v5/search/${encodedAddress}`, '_blank');
            }, 1000);
            break;
        case 'kakao':
            url = `kakaomap://look?p=37.508,126.891`;
            window.location.href = url;
            setTimeout(() => {
                window.open(`https://map.kakao.com/link/search/${encodedAddress}`, '_blank');
            }, 1000);
            break;
        case 'tmap':
            url = `tmap://search?name=${encodedAddress}`;
            window.location.href = url;
            setTimeout(() => {
                window.open(`https://m.map.naver.com/search2/search.naver?query=${encodedAddress}`, '_blank');
            }, 1000);
            break;
    }
}

// Account Toggle
function toggleAccount(side) {
    const accountDiv = document.getElementById(`${side}-account`);
    accountDiv.classList.toggle('active');
}

// Copy Account
function copyAccount(accountNumber) {
    const textarea = document.createElement('textarea');
    textarea.value = accountNumber;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('계좌번호가 복사되었습니다.');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    calculateDday();
    generateGallery();
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    }
});

// Close modal on background click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Smooth scroll animation observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.frame').forEach(frame => {
    observer.observe(frame);
});