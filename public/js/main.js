// ********** Query Selectors ********** //
const deleteBtn = document.querySelectorAll('.del');
const tripItem = document.querySelectorAll('span.not');
const tripComplete = document.querySelectorAll('span.completed');
const tripEditor = document.querySelectorAll('.editTrip');
const tripTitleEdit = document.querySelector('.trip--title');
const tripDescEdit = document.querySelector('.trip--description');
const addDestination = document.querySelector('.newDestination--btn');
const deleteDestinationBtn = document.querySelectorAll('.deleteDestination--btn');
const editDestinationBtn = document.querySelectorAll('.editDestination--btn');

// ********** Event Listeners ********** //
Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTrip);
});

Array.from(tripItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(tripComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

Array.from(deleteDestinationBtn).forEach((el) => {
  el.addEventListener('click', deleteDestination);
});

Array.from(editDestinationBtn).forEach((el) => {
  el.addEventListener('click', editDestination);
});

tripTitleEdit.addEventListener('focusout', editTitle);

tripDescEdit.addEventListener('focusout', editDescription);

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

async function editDestination() {
  const tripId = this.parentNode.dataset.id;
}
