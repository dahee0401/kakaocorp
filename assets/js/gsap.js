// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Add the active class when scrolling down once
ScrollTrigger.create({
    trigger: window, // Trigger scroll on the entire window
    start: 'top+=1', // Start trigger when the user scrolls at least 1px down
    onEnter: () => document.querySelector('.header').classList.add('active'),
    onLeaveBack: () => document.querySelector('.header').classList.remove('active'),
});
