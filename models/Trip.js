const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  trip: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  displayImg: {
    type: String,
    default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1721&q=80',
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
  sharedUsers: {
    type: Array,

  },
  destinations: {
    type: Array,
  },
});

module.exports = mongoose.model('Trip', TripSchema);
