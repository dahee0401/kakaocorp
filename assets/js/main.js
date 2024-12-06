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

//swiper1 숫자애니메이션
const maxNumbers = [61322120]; // 목표 숫자 배열
const targets = document.querySelectorAll('.number_count');

// 숫자 애니메이션 함수
function animateNumber(target, maxValue) {
    const duration = 1000; // 애니메이션 지속 시간 (ms)
    const frameRate = 60; // 초당 프레임 수
    const totalFrames = Math.ceil(duration / (1000 / frameRate)); // 총 프레임 수
    const increment = Math.ceil(maxValue / totalFrames); // 각 프레임 증가값

    let currentValue = 0;

    const spans = target.querySelectorAll('span > span'); // 숫자 스팬만 선택
    const updateNumber = () => {
        currentValue += increment;
        if (currentValue > maxValue) currentValue = maxValue;

        // 현재 숫자를 쉼표 포함 문자열로 변환
        const currentString = currentValue.toLocaleString();
        const digits = currentString.replace(/,/g, '').split(''); // 쉼표 제거 후 배열로 변환

        // 각 숫자 스팬 업데이트
        let digitIndex = 0;
        spans.forEach((span) => {
            if (span.parentElement.textContent === ',') {
                return; // 쉼표는 건너뜀
            }
            if (digitIndex < digits.length) {
                span.textContent = digits[digitIndex];
                digitIndex++;
            }
        });

        if (currentValue < maxValue) {
            requestAnimationFrame(updateNumber);
        }
    };

    updateNumber();
}

// 모든 타겟에 대해 숫자 애니메이션 실행
targets.forEach((target, index) => {
    if (index < maxNumbers.length) {
        animateNumber(target, maxNumbers[index]);
    }
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

// footer link_info클릭 토글
document.addEventListener('DOMContentLoaded', function () {
    const linkInfoElements = document.querySelectorAll('.link_info');

    linkInfoElements.forEach(function (linkInfo) {
        linkInfo.addEventListener('click', function (event) {
            // 현재 클릭한 요소의 on 클래스를 토글
            this.classList.toggle('on');

            // 이벤트 전파 방지
            event.stopPropagation();
        });
    });

    // 문서 전체에 클릭 이벤트 추가
    document.addEventListener('click', function () {
        linkInfoElements.forEach(function (linkInfo) {
            linkInfo.classList.remove('on'); // 모든 link_info에서 on 클래스 제거
        });
    });

    // 형제 요소 클릭 시 on 클래스 제거
    linkInfoElements.forEach(function (linkInfo) {
        linkInfo.addEventListener('click', function (event) {
            // 형제 요소의 on 클래스 제거
            linkInfoElements.forEach(function (sibling) {
                if (sibling !== linkInfo) {
                    sibling.classList.remove('on');
                }
            });
        });
    });

    // ESC 키 => on 클래스 제거
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            // ESC 키가 눌렸는지 확인
            linkInfoElements.forEach(function (linkInfo) {
                linkInfo.classList.remove('on'); // 모든 link_info에서 on 클래스 제거
            });
        }
    });
});

// 햄버거 버튼 메뉴
const hamburgerButton = document.querySelector('.btn__hamburger');
const closeButton = document.querySelector('.btn_close');
const header = document.querySelector('.header');
const areaGnb = document.querySelector('.area_gnb');

hamburgerButton.addEventListener('click', function () {
    header.classList.add('open_gnb');
    areaGnb.classList.add('slide_on');
    if (header.classList.contains('open_gnb')) {
        document.body.classList.add('no-scr');
    }
});
closeButton.addEventListener('click', function () {
    header.classList.remove('open_gnb');
    areaGnb.classList.remove('slide_on');
    document.body.classList.remove('no-scr');
});

// GNB 서브메뉴 show/hide
const listItems = document.querySelectorAll('.list_gnb--item');

listItems.forEach((item) => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();

        // 다른 서브메뉴 숨기기
        listItems.forEach((otherItem) => {
            if (otherItem !== item) {
                const otherSubList = otherItem.querySelector('.list_sub');
                if (otherSubList) {
                    otherSubList.style.display = 'none';
                }
            }
        });

        // 클릭한 아이템의 서브메뉴 토글
        const subList = this.querySelector('.list_sub');
        if (subList) {
            if (subList.style.display === 'none' || subList.style.display === '') {
                subList.style.display = 'block';
            } else {
                subList.style.display = 'none';
            }
        }
    });
});

// 빈 곳 클릭 시 모든 서브메뉴 숨기기
document.addEventListener('click', () => {
    listItems.forEach((item) => {
        const subList = item.querySelector('.list_sub');
        if (subList) {
            subList.style.display = 'none';
        }
    });
});
