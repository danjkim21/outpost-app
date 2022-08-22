const Trip = require('../models/Trip');

module.exports = {
  getTripEditor: async (req, res) => {
    try {
      let tripId = req.params.id;
      limitNumber = 1;
      let tripById = await Trip.find({ _id: tripId }).limit(limitNumber);
      res.render('tripEditor.ejs', { trip: tripById, user: req.user });
      console.log(tripById)
    } catch (err) {
      console.error(err);
    }
  },
};
