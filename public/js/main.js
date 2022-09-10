// ********** Query Selectors ********** //
const deleteBtn = document.querySelectorAll('.del');
const tripItem = document.querySelectorAll('h4.not');
const tripComplete = document.querySelectorAll('h4.completed');
const tripEditor = document.querySelectorAll('.editTrip');
const tripTitleEdit = document.querySelector('.trip--title');
const tripDescEdit = document.querySelector('.trip--description');
const coverImgEdit = document.querySelector('.changeCoverImg-btn');
const addDestination = document.querySelector('.newDestination--btn');
const deleteDestinationBtn = document.querySelectorAll('.deleteDestination--btn');
const destinationStartDate = document.querySelectorAll('.destination--startDate');
const destinationEndDate = document.querySelectorAll('.destination--endDate');
const destinationContentTabs = document.querySelectorAll('.content--tabs');

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

// –––––––– TRIP EDITOR –––––––– //
Array.from(deleteDestinationBtn).forEach((el) => {
  el.addEventListener('click', deleteDestination);
});
Array.from(destinationStartDate).forEach((el) => {
  el.addEventListener('input', editDestStartDate);
});
Array.from(destinationEndDate).forEach((el) => {
  el.addEventListener('input', editDestEndDate);
});
Array.from(destinationContentTabs).forEach((el) => {
  el.addEventListener('click', toggleContentTab);
});

tripTitleEdit.addEventListener('focusout', editTitle);
tripDescEdit.addEventListener('focusout', editDescription);
coverImgEdit.addEventListener('click', changeCoverImage);
addDestination.addEventListener('click', addNewDestination);

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

async function editDescription() {
  const tripId = this.parentNode.dataset.id;
  const tripDesc = this.textContent.trim();

  console.log(tripId, tripDesc);
  try {
    const response = await fetch('editDescription', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        updatedDesc: tripDesc,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function changeCoverImage() {
  const tripId = this.parentNode.dataset.id;
  const newUrl = document.querySelector('.changeCoverImg-input').value.trim();

  try {
    const response = await fetch('changeCoverImg', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        coverImgFromJSFile: newUrl,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function addNewDestination() {
  const tripId = this.parentNode.dataset.id;
  const newDestination = document.querySelector('.newDestination--input').value.trim();
  console.log(tripId, newDestination);

  try {
    const response = await fetch('addDestination', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        newDestination: newDestination,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function deleteDestination() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  console.log(tripId, destination);

  try {
    const response = await fetch('deleteDestination', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        destinationFromJSFile: destination,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function editDestStartDate() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const startDate = this.value;
  console.log(tripId, destination, startDate);

  try {
    const response = await fetch('editDestStartDate', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        destinationFromJSFile: destination,
        startDateFromJSFile: startDate,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function editDestEndDate() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const endDate = this.value;
  console.log(tripId, endDate);

  try {
    const response = await fetch('editDestEndDate', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        destinationFromJSFile: destination,
        endDateFromJSFile: endDate,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function toggleContentTab() {
  Array.from(destinationContentTabs).forEach((tab) => {
    tab.classList.remove('active');
  });

  this.classList.toggle('active');
}
