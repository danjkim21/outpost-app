const express = require('express');
const router = express.Router();
const userPageController = require('../controllers/userPage');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, userPageController.getUserPage);

router.put('/updateUserName/:userId', userPageController.updateUserName);

module.exports = router;
