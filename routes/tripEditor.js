const express = require('express');
const router = express.Router();
const tripEditorController = require('../controllers/tripEditor');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/:id', ensureAuth, tripEditorController.getTripEditor);

router.put('/editTitle', tripEditorController.editTitle);

router.put('/editDescription', tripEditorController.editDescription);

module.exports = router;