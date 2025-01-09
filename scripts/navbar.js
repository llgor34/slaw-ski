const navButton = document.querySelector('.mobile-button');
const navbar = document.querySelector('.navbar');
const navLinks = navbar.querySelectorAll('a');

navButton.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.toggle('active');
});

navLinks.forEach((navLink) =>
    navLink.addEventListener('click', (e) => {
        const element = e.target;

        if (shouldScrollToElement(element)) {
            e.preventDefault();

            const scrollElementSelector = getElementSelector(element);
            closeNavbarIfNecessary().then(() => scrollToElementBySelector(scrollElementSelector));
        }
    })
);

function shouldScrollToElement(element) {
    return element.hasAttribute('scrollToElement');
}

function getElementSelector(element) {
    return `#${element.href.split('#')[1]}`;
}

function closeNavbarIfNecessary() {
    return new Promise((resolve, reject) => {
        if (navbar.classList.contains('active') && window.screen.width <= 1000) {
            navbar.classList.remove('active');
            navbar.addEventListener('transitionend', resolve);
        } else {
            resolve();
        }
    });
}

function scrollToElementBySelector(selector) {
    const element = document.querySelector(selector);
    const offset = navbar.getBoundingClientRect().height;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
}
