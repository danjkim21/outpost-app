const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  trip: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  destinations: {
    type: Array,
  },
});

module.exports = mongoose.model('Trip', TripSchema);
