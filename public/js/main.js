const deleteBtn = document.querySelectorAll('.del');
const tripItem = document.querySelectorAll('span.not');
const tripComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTrip);
});

Array.from(tripItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(tripComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
}
