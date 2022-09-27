// ********** Query Selectors ********** //
const navHamburgerBtn = document.querySelector('.nav--dropdownBtn');
const sidebar = document.querySelector('.sidebar');
const profileSection = document.querySelector('.profile');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.sidebar--nav')

// ********** Event Listeners ********** //
navHamburgerBtn.addEventListener('click', toggleSideBarMobile);

// ********** Functions ********** //
async function toggleSideBarMobile() {
  sidebar.classList.toggle('open')
  profileSection.classList.toggle('open')
  nav.classList.toggle('open')
}
