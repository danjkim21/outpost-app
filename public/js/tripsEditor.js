// ********** Query Selectors ********** //
const deleteBtn = document.querySelectorAll('.del');
const tripItem = document.querySelectorAll('h4.not');
const tripComplete = document.querySelectorAll('h4.completed');
const tripEditor = document.querySelectorAll('.editTrip');
const tripTitleEdit = document.querySelector('.trip--title');
const tripDescEdit = document.querySelector('.trip--description');
const coverImgEdit = document.querySelector('.changeCoverImg-btn');
const toggleFormBtn = document.querySelectorAll('.toggleForm');
const addDestination = document.querySelector('.newDestination--btn');
const deleteDestinationBtn = document.querySelectorAll('.deleteDestination--btn');
const destinationLocation = document.querySelectorAll('.newDestination--location');
const destinationStartDate = document.querySelectorAll('.destination--startDate');
const destinationEndDate = document.querySelectorAll('.destination--endDate');
const destinationContentTabs = document.querySelectorAll('.content--tabs');
const destinationContentAreas = document.querySelectorAll('.content--areaDisplay');
const destinationNotesEdit = document.querySelectorAll('.destination--notes');
const deleteAccomodationBtn = document.querySelectorAll('.deleteAccom--btn');
const deleteFlightBtn = document.querySelectorAll('.deleteTicket--btn');
const deleteActivityBtn = document.querySelectorAll('.deleteActivity--btn');

// ********** Event Listeners ********** //
// –––––––– TRIP EDITOR –––––––– //
Array.from(toggleFormBtn).forEach((el) => {
  el.addEventListener('click', toggleFormOpenClose);
});
Array.from(deleteDestinationBtn).forEach((el) => {
  el.addEventListener('click', deleteDestination);
});
Array.from(destinationLocation).forEach((el) => {
  el.addEventListener('focusout', editDestName);
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
Array.from(deleteAccomodationBtn).forEach((el) => {
  el.addEventListener('click', deleteAccomodation);
});
Array.from(deleteFlightBtn).forEach((el) => {
  el.addEventListener('click', deleteFlight);
});
Array.from(deleteActivityBtn).forEach((el) => {
  el.addEventListener('click', deleteActivity);
});
Array.from(destinationNotesEdit).forEach((el) => {
  el.addEventListener('focusout', editDestNotes);
});

tripTitleEdit.addEventListener('focusout', editTitle);
tripDescEdit.addEventListener('focusout', editDescription);
coverImgEdit.addEventListener('click', changeCoverImage);
addDestination.addEventListener('click', addNewDestination);
// destinationNotesEdit.addEventListener('focusout', editDestNotes);

// ********** Functions ********** //
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

// –––––––– DESTINATION RELATED FUNCTIONS –––––––– //

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

async function editDestName() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const newDestName = this.innerText;
  console.log(`${tripId}, ${destination}, ${newDestName}`);

  try {
    const response = await fetch('editDestName', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        destinationFromJSFile: destination,
        newDestNameFromJSFile: newDestName,
      }),
    });
    const data = await response.json();
    console.log(data);
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

async function editDestNotes() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const destinationNote = this.textContent.trim();

  try {
    const response = await fetch('editDestNotes', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        destinationFromJSFile: destination,
        destNoteFromJSFile: destinationNote,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteAccomodation() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const accomodation = this.parentNode.dataset.accom;
  console.log(tripId, accomodation, destination);

  try {
    const response = await fetch('deleteAccomodation', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        accomodationFromJSFile: accomodation,
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

async function deleteFlight() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const flightTicket = this.parentNode.dataset.flightcode;
  console.log(tripId, destination, flightTicket);

  try {
    const response = await fetch('deleteFlight', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        flightFromJSFile: flightTicket,
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

async function deleteActivity() {
  const tripId = this.parentNode.dataset.id;
  const destination = this.parentNode.dataset.loc;
  const activityDesc = this.parentNode.dataset.activitydesc;
  console.log(tripId, destination, activityDesc);

  try {
    const response = await fetch('deleteActivity', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        activityFromJSFile: activityDesc,
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

// UI Interactivity Functions

async function toggleContentTab() {
  let selectedTabIdentity = `areaDisplay--${this.classList[1].substring(5)}`;
  let selectedtabSpaces = document.querySelectorAll(`.${selectedTabIdentity}`);

  Array.from(destinationContentTabs).forEach((tab) => {
    tab.classList.remove('active');
  });

  Array.from(destinationContentAreas).forEach((area) => {
    area.classList.remove('active');
  });

  if (!this.classList.contains('active')) {
    this.classList.add('active');

    // console.log(selectedTabIdentity, selectedtabSpaces);

    Array.from(selectedtabSpaces).forEach((elem) => {
      elem.classList.add('active');
    });
  }
}

async function toggleFormOpenClose() {
  // let selectedBtnIdentity = this.classList[1];
  // let selectedForm = document.querySelector(`#${selectedBtnIdentity}Form`);

  // if (selectedForm.classList.contains('hidden')) {
  //   selectedForm.classList.remove('hidden');
  // } else if (!selectedForm.classList.contains('hidden')) {
  //   selectedForm.classList.add('hidden');
  // }

  let selectedBtnIdentity = this.classList[1];
  let selectedForm = document.querySelectorAll(`.${selectedBtnIdentity}Form`);

  Array.from(selectedForm).forEach((elem) => {
    if (elem.classList.contains('hidden')) {
      elem.classList.remove('hidden');
    } else if (!elem.classList.contains('hidden')) {
      elem.classList.add('hidden');
    }
  });
}
