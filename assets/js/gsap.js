// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Add the active class when scrolling down
ScrollTrigger.create({
    start: '1px top', // Trigger the animation when the user scrolls 1px down
    onEnter: () => document.querySelector('.header').classList.add('active'),
    onLeaveBack: () => document.querySelector('.header').classList.remove('active'),
});
