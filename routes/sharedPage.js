const express = require('express');
const router = express.Router();
const sharedPageController = require('../controllers/sharedPage');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, sharedPageController.getSharedPage);

module.exports = router;
