const Trip = require('../models/Trip');

module.exports = {
  getTripEditor: async (req, res) => {
    try {
      let tripId = req.params.id;
      limitNumber = 1;
      let tripById = await Trip.find({ _id: tripId }).limit(limitNumber);

      res.render('tripEditor.ejs', { trip: tripById, user: req.user });
      console.log(tripById);
    } catch (err) {
      console.error(err);
    }
  },
  editTitle: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          trip: req.body.updatedTitle,
        }
      );
      console.log(`Updated Title: ${req.body.tripIdFromJSFile}`);
      res.json('Updated Title');
    } catch (err) {
      console.log(err);
    }
  },
  editDescription: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          description: req.body.updatedDesc,
        }
      );
      console.log(`Updated Description: ${req.body.tripIdFromJSFile}`);
      res.json('Updated Description');
    } catch (err) {
      console.log(err);
    }
  },
  changeCoverImg: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { displayImg: req.body.coverImgFromJSFile },
        }
      );
      console.log(`Changed Cover Image`);
      res.json('Changed Cover Image');
    } catch (err) {
      console.log(err);
    }
  },
  addDestination: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $push: {
            destinations: {
              location: req.body.newDestination,
              notes: '',
              startDate: '',
              endDate: '',
            },
          },
        },
        { upsert: true }
      );
      console.log(`Added Destination: ${req.body.tripIdFromJSFile}`);
      res.json('Added Destination');
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  },
  deleteDestination: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $pull: {
            destinations: { location: req.body.destinationFromJSFile },
          },
        }
      );
      console.log(
        `Deleted: ${req.body.destinationFromJSFile} from ${req.body.tripIdFromJSFile}`
      );
      res.json(`Deleted: ${req.body.destinationFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
  editDestStartDate: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { 'destinations.$[destination].startDate': req.body.startDateFromJSFile },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited Start Date`);
      res.json('Edited Start Date');
    } catch (err) {
      console.log(err);
    }
  },
  editDestEndDate: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { 'destinations.$[destination].endDate': req.body.endDateFromJSFile },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited End Date`);
      res.json('Edited End Date');
    } catch (err) {
      console.log(err);
    }
  },
};
