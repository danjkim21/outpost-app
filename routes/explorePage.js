const express = require('express');
const router = express.Router();
const explorePageController = require('../controllers/explorePage');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, explorePageController.getExplorePage);

module.exports = router;
