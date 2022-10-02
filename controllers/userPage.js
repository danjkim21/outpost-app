const User = require('../models/User');

module.exports = {
  getUserPage: async (req, res) => {
    console.log(req.user);
    try {
      res.render('userPage.ejs', { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  updateUserName: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          userName: req.body.newUserName,
        }
      );
      console.log(`Updated username to: ${req.body.newUserName}`);
      res.redirect('/userPage');
    } catch (err) {
      console.log(err);
    }
  },
};
