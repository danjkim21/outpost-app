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
};
