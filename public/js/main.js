// ********** Query Selectors ********** //
const navHamburgerBtn = document.querySelector('.nav--dropdownBtn');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav')
const navList = document.querySelector('.nav--list');

// ********** Event Listeners ********** //
navHamburgerBtn.addEventListener('click', toggleNavBarMobile);

// ********** Functions ********** //
async function toggleNavBarMobile() {
  header.classList.toggle('open');
  nav.classList.toggle('open')
  navList.classList.toggle('open');
}
