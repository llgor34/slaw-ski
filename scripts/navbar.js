const navButton = document.querySelector('.mobile-button');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('a');

navButton.addEventListener('click', (e) => {
    e.preventDefault();
    navbar.classList.toggle('active');
});

navLinks.forEach((navLink) => {
    if (!shouldScrollToElement(navLink)) {
        return;
    }

    navLink.addEventListener('click', (e) => {
        const element = e.target.closest('a');
        e.preventDefault();

        const scrollElementSelector = getElementSelector(element);
        closeNavbarIfNecessary().then(() => scrollToElementBySelector(scrollElementSelector));
    });
});

function shouldScrollToElement(element) {
    return element.hasAttribute('scrollToElement');
}

function getElementSelector(element) {
    return `#${element.href.split('#')[1]}`;
}

function closeNavbarIfNecessary() {
    return new Promise((resolve, reject) => {
        if (navbar.classList.contains('active') && window.innerWidth <= 1000) {
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
