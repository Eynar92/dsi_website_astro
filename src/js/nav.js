const navBtn = document.querySelector('#menu__btn');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav__links');

navBtn.addEventListener('click', () => {
    navLinks.classList.add('activated');
    const isExpanded = JSON.parse(navBtn.getAttribute('aria-expanded'));
    navBtn.setAttribute('aria-expanded', !isExpanded);
    (!isExpanded ? nav.classList.add('active') : nav.classList.remove('active'))
})