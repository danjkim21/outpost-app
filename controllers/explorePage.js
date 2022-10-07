const Trip = require('../models/Trip');
const User = require('../models/User');

module.exports = {
  getExplorePage: async (req, res) => {
    console.log(req.user);
    try {
      const allTripsItems = await Trip.find();

      res.render('explorePage.ejs', { allTrips: allTripsItems, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
