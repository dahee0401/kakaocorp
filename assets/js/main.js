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
