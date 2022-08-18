const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, tripsController.getTrips);

router.post('/createTrip', tripsController.createTrip);

router.put('/markComplete', tripsController.markComplete);

router.put('/markIncomplete', tripsController.markIncomplete);

router.delete('/deleteTrip', tripsController.deleteTrip);

module.exports = router;
