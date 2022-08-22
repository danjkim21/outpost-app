const express = require('express');
const router = express.Router();
const tripEditorController = require('../controllers/tripEditor');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/:id', ensureAuth, tripEditorController.getTripEditor);

module.exports = router;