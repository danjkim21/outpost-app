// ********** Query Selectors ********** //
const deleteBtn = document.querySelectorAll('.del');
const tripItem = document.querySelectorAll('h4.not');
const tripComplete = document.querySelectorAll('h4.completed');
const tripEditor = document.querySelectorAll('.editTrip');
const upcomingTripsTab = document.querySelector('.tripsCard--title__Upcoming');
const completedTripsTab = document.querySelector('.tripsCard--title__Completed');

// ********** Event Listeners ********** //
// –––––––– TRIP DASHBOARD –––––––– //
Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTrip);
});
Array.from(tripItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});
Array.from(tripComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

upcomingTripsTab.addEventListener('click', viewUpcomingTrips);
completedTripsTab.addEventListener('click', viewCompletedTrips);

// ********** Functions ********** //
// –––––––– TRIP DASHBOARD FUNCTIONS –––––––– //
async function deleteTrip() {
  const tripId = this.parentNode.dataset.id;
  try {
    const response = await fetch('trips/deleteTrip', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markComplete() {
  const tripId = this.parentNode.dataset.id;
  try {
    const response = await fetch('trips/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function markIncomplete() {
  const tripId = this.parentNode.dataset.id;
  try {
    const response = await fetch('trips/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function viewUpcomingTrips() {
  if (!upcomingTripsTab.classList.contains('selected')) {
    // Toggle's tab active color
    upcomingTripsTab.classList.add('selected');
    completedTripsTab.classList.remove('selected');

    // Toggle's tab display between none & inline-block
    let upcomingTripsTabSection = document.querySelector('.tripsCard--upcoming__tab');
    let completedTripsTabSection = document.querySelector('.tripsCard--completed__tab');
    upcomingTripsTabSection.classList.add('selectedCard');
    completedTripsTabSection.classList.remove('selectedCard');
  }
}

async function viewCompletedTrips() {
  if (!completedTripsTab.classList.contains('selected')) {
    // Toggle's tab color
    completedTripsTab.classList.add('selected');
    upcomingTripsTab.classList.remove('selected');

    // Toggle's tab display between none & inline-block
    let completedTripsTabSection = document.querySelector('.tripsCard--completed__tab');
    let upcomingTripsTabSection = document.querySelector('.tripsCard--upcoming__tab');
    completedTripsTabSection.classList.add('selectedCard');
    upcomingTripsTabSection.classList.remove('selectedCard');
  }
}

// –––––––– TRIP EDITOR FUNCTIONS –––––––– //
async function editTitle() {
  const tripId = this.parentNode.dataset.id;
  const tripTitle = this.textContent.trim();

  console.log(tripId, tripTitle);
  try {
    const response = await fetch('editTitle', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        updatedTitle: tripTitle,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}