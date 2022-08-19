const Trip = require('../models/Trip');

module.exports = {
  getTrips: async (req, res) => {
    console.log(req.user);
    try {
      const tripItems = await Trip.find({ userId: req.user.id });
      const itemsLeft = await Trip.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render('trips.ejs', { trips: tripItems, left: itemsLeft, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTrip: async (req, res) => {
    try {
      await Trip.create({
        trip: req.body.tripItem,
        completed: false,
        userId: req.user.id,
      });
      console.log('Trip has been added!');
      res.redirect('/trips');
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log(`Marked Complete: ${req.body.tripIdFromJSFile}`);
      res.json('Marked Complete');
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log(`Marked Incomplete: ${req.body.tripIdFromJSFile}`);
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deleteTrip: async (req, res) => {
    console.log(req.body.tripIdFromJSFile);
    try {
      await Trip.findOneAndDelete({ _id: req.body.tripIdFromJSFile });
      console.log(`Deleted: ${req.body.tripIdFromJSFile}`);
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
