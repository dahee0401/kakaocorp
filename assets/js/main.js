const links = document.querySelectorAll('.gnb__list-item');

// header mouseover event
links.forEach((link) => {
    link.addEventListener('mouseover', () => {
        link.classList.add('active');
        links.forEach((sibling) => {
            if (sibling !== link) {
                sibling.classList.add('not-active');
            }
        });
    });

    link.addEventListener('mouseout', () => {
        links.forEach((sibling) => {
            sibling.classList.remove('active', 'not-active');
        });
    });
});

// tooltip
const innerTop = document.querySelector('.inner-top');
const tooltip = document.querySelector('.info_banner');

innerTop.addEventListener('mouseenter', () => {
    tooltip.style.display = 'flex';
});

innerTop.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
});

// story 무한 슬라이드
const list = document.querySelector('.cont-story__list');
const items = document.querySelectorAll('.cont-story__list-item');
const button = document.querySelector('.btn_story');

let offset = 0; // 초기 offset 값
let animationId; // 애니메이션 ID를 저장할 변수
let isPaused = false; // 초기 상태를 false로 설정하여 애니메이션이 시작되도록 함

// 리스트 아이템 복제 및 클래스 변경 함수
function cloneItems() {
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        updateItemClass(clone); // 복제된 아이템의 클래스 업데이트
        list.appendChild(clone);
    });
}

// 아이템의 클래스 상태를 업데이트하는 함수
function updateItemClass() {
    const changeItem = document.querySelector('.cont-story__list-item.first');
    if (changeItem) {
        if (window.innerWidth <= 1439) {
            changeItem.classList.remove('type_wide');
            changeItem.classList.add('type_normal');
        } else {
            changeItem.classList.remove('type_normal');
            changeItem.classList.add('type_wide');
        }
    }
}

// 슬라이드 애니메이션 함수
function slide() {
    if (!isPaused) {
        // isPaused가 false일 때만 애니메이션 진행
        offset -= 0.3; // offset 값을 줄여 아이템을 왼쪽으로 이동
        list.style.transform = `translateX(${offset}px)`;

        if (Math.abs(offset) >= items[0].offsetWidth) {
            offset += items[0].offsetWidth; // offset을 조정하여 무한 스크롤 유지
            list.appendChild(list.firstElementChild); // 첫 번째 아이템을 리스트의 끝으로 이동
        }
    }

    animationId = requestAnimationFrame(slide); // 다음 애니메이션 프레임 요청
}

// 버튼 클릭 이벤트 처리
button.addEventListener('click', () => {
    isPaused = !isPaused; // 상태 토글

    if (isPaused) {
        button.classList.remove('pause');
        button.classList.add('play');
        cancelAnimationFrame(animationId); // 애니메이션 멈추기
    } else {
        button.classList.remove('play');
        button.classList.add('pause');
        slide(); // 애니메이션 시작
    }
});

cloneItems(); // 복제된 아이템의 클래스 업데이트
slide(); // 페이지 로드 시 애니메이션 시작

// 리사이즈 이벤트 시 클래스 업데이트
window.addEventListener('resize', () => {
    items.forEach((item) => {
        updateItemClass(item); // 기존 아이템의 클래스 업데이트
    });
});

// 검색버튼 search_layer
const searchButtons = document.querySelectorAll('.searchBtn');

searchButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        document.body.classList.toggle('open_search'); // body에 open_search 클래스 토글
        const searchLayer = document.querySelector('.search_layer');
    });
});
document.getElementById('closeBtn').addEventListener('click', function () {
    document.body.classList.remove('open_search'); // body에서 open_search 클래스 제거
});

// ESC 키 눌렀을 때 검색 레이어 닫기
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.body.classList.remove('open_search'); // body에서 open_search 클래스 제거
    }
});

// 다크모드
document.querySelector('.util__btn--mode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode'); // body에 dark-mode 클래스 토글s
});
