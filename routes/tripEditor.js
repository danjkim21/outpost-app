const express = require('express');
const router = express.Router();
const tripEditorController = require('../controllers/tripEditor');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Trip Detailing Routes
router.get('/:id', ensureAuth, tripEditorController.getTripEditor);

router.put('/editTitle', tripEditorController.editTitle);

router.put('/editDescription', tripEditorController.editDescription);

router.put('/changeCoverImg', tripEditorController.changeCoverImg);

// Trip Destination Routes
router.put('/addDestination', tripEditorController.addDestination);

router.put('/deleteDestination', tripEditorController.deleteDestination);

router.put('/editDestName', tripEditorController.editDestName);

router.put('/editDestStartDate', tripEditorController.editDestStartDate);

router.put('/editDestEndDate', tripEditorController.editDestEndDate);

router.put('/editDestNotes', tripEditorController.editDestNotes);

// Destination Detailing Routes
router.put('/addAccomodation/:id/:loc', tripEditorController.addAccomodation);

router.put('/deleteAccomodation', tripEditorController.deleteAccomodation);

router.put('/addTicket/:id/:loc', tripEditorController.addTicket);

router.put('/deleteFlight', tripEditorController.deleteFlight);

module.exports = router;
