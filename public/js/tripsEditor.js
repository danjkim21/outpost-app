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
const destinationLocation = document.querySelectorAll('.newDestination--location');
const destinationStartDate = document.querySelectorAll('.destination--startDate');
const destinationEndDate = document.querySelectorAll('.destination--endDate');
const destinationContentTabs = document.querySelectorAll('.content--tabs');
const destinationContentAreas = document.querySelectorAll('.content--areaDisplay');
const destinationNotesEdit = document.querySelector('.destination--notes');
const deleteAccomodationBtn = document.querySelectorAll('.deleteAccom--btn');

// ********** Event Listeners ********** //
// –––––––– TRIP EDITOR –––––––– //
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

tripTitleEdit.addEventListener('focusout', editTitle);
tripDescEdit.addEventListener('focusout', editDescription);
coverImgEdit.addEventListener('click', changeCoverImage);
addDestination.addEventListener('click', addNewDestination);
destinationNotesEdit.addEventListener('focusout', editDestNotes);

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
  const accomodation = this.parentNode.dataset.accom;
  console.log(tripId, accomodation);

  try {
    const response = await fetch('deleteAccomodation', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        tripIdFromJSFile: tripId,
        accomodationFromJSFile: accomodation,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function toggleContentTab() {
  if (!this.classList.contains('active')) {
    let overviewTab = document.querySelector('.tab--overview');
    let itineraryTab = document.querySelector('.tab--itinerary');
    let travelTab = document.querySelector('.tab--travel');
    let accomTab = document.querySelector('.tab--accomodations');

    let overviewArea = document.querySelector('.areaDisplay--overview');
    let itineraryArea = document.querySelector('.areaDisplay--itinerary');
    let travelArea = document.querySelector('.areaDisplay--travel');
    let accomArea = document.querySelector('.areaDisplay--accomodations');

    Array.from(destinationContentTabs).forEach((tab) => {
      tab.classList.remove('active');
    });

    Array.from(destinationContentAreas).forEach((area) => {
      area.classList.remove('active');
    });

    this.classList.add('active');

    if (overviewTab.classList.contains('active')) {
      overviewArea.classList.add('active');
    } else if (itineraryTab.classList.contains('active')) {
      itineraryArea.classList.add('active');
    } else if (travelTab.classList.contains('active')) {
      travelArea.classList.add('active');
    } else if (accomTab.classList.contains('active')) {
      accomArea.classList.add('active');
    }
  }
}
