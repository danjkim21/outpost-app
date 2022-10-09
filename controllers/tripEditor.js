const Trip = require('../models/Trip');
const User = require('../models/User');

module.exports = {
  // Trip Detailing Controls
  getTripEditor: async (req, res) => {
    try {
      let tripId = req.params.id;
      limitNumber = 1;
      let tripById = await Trip.find({ _id: tripId }).limit(limitNumber);
      let allUsers = await User.find({}, { userName: 1 });

      res.render('tripEditor.ejs', { trip: tripById, user: req.user, users: allUsers });
      console.log(tripById);
    } catch (err) {
      console.error(err);
    }
  },
  editTitle: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          trip: req.body.updatedTitle,
        }
      );
      console.log(`Updated Title: ${req.body.tripIdFromJSFile}`);
      res.json('Updated Title');
    } catch (err) {
      console.log(err);
    }
  },
  editDescription: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          description: req.body.updatedDesc,
        }
      );
      console.log(`Updated Description: ${req.body.tripIdFromJSFile}`);
      res.json('Updated Description');
    } catch (err) {
      console.log(err);
    }
  },
  changeCoverImg: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { displayImg: req.body.coverImgFromJSFile },
        }
      );
      console.log(`Changed Cover Image`);
      res.json('Changed Cover Image');
    } catch (err) {
      console.log(err);
    }
  },
  addUser: async (req, res) => {
    try {
      let usersMatched = await User.find(
        { userName: req.body.userNameShared },
        { userName: 1 }
      );
      let idMatched = usersMatched[0]._id.toString();
      await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            sharedUsers: {
              [idMatched]: req.body.userNameShared,
            },
          },
        }
      );
      console.log(idMatched);
      console.log(`User: ${req.body.userNameShared} has been added!`);
      res.redirect(`/tripEditor/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.json('No user found');
      // res.redirect(`/tripEditor/${req.params.id}`);
    }
  },

  // Trip Destination Controls
  addDestination: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $push: {
            destinations: {
              location: req.body.newDestination,
              notes: '',
              startDate: '',
              endDate: '',
            },
          },
        },
        { upsert: true }
      );
      console.log(`Added Destination: ${req.body.tripIdFromJSFile}`);
      res.json('Added Destination');
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  },
  deleteDestination: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $pull: {
            destinations: { location: req.body.destinationFromJSFile },
          },
        }
      );
      console.log(
        `Deleted: ${req.body.destinationFromJSFile} from ${req.body.tripIdFromJSFile}`
      );
      res.json(`Deleted: ${req.body.destinationFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
  editDestName: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: {
            'destinations.$[destination].location': req.body.newDestNameFromJSFile,
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited Destination Location`);
      res.json('Edited Destination Location');
    } catch (err) {
      console.log(err);
    }
  },
  editDestStartDate: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { 'destinations.$[destination].startDate': req.body.startDateFromJSFile },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited Start Date`);
      res.json('Edited Start Date');
    } catch (err) {
      console.log(err);
    }
  },
  editDestEndDate: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { 'destinations.$[destination].endDate': req.body.endDateFromJSFile },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited End Date`);
      res.json('Edited End Date');
    } catch (err) {
      console.log(err);
    }
  },
  editDestNotes: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.body.tripIdFromJSFile,
        },
        {
          $set: { 'destinations.$[destination].notes': req.body.destNoteFromJSFile },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );
      console.log(`Edited Destination Location`);
      res.json('Edited Destination Location');
    } catch (err) {
      console.log(err);
    }
  },

  // Destination Detailing Controls
  addAccomodation: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            'destinations.$[destination].accomodations': {
              accomType: req.body.accomodationType,
              accomAddress: req.body.accomodationAddress,
              accomConfirmation: req.body.accomodationConfirmation,
              accomStartDate: req.body.accomodationStartDate,
              accomEndDate: req.body.accomodationEndDate,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.params.loc,
            },
          ],
        }
      );

      console.log(`Accomodation: ${req.body.accomodationType} has been added!`);
      res.redirect(`/tripEditor/${req.params.id}#${req.params.loc}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteAccomodation: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $pull: {
            'destinations.$[destination].accomodations': {
              accomAddress: req.body.accomodationFromJSFile,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );

      console.log(
        `Deleted: ${req.body.accomodationFromJSFile} from ${req.body.tripIdFromJSFile}`
      );
      res.json(`Deleted: ${req.body.accomodationFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
  addTicket: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            'destinations.$[destination].tickets': {
              departDateTime: req.body.departDateTime,
              departLoc: req.body.departLoc,
              arriveDateTime: req.body.arriveDateTime,
              arriveLoc: req.body.arriveLoc,
              flightConfirmation: req.body.flightConfirmation,
              flightAirline: req.body.flightAirline,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.params.loc,
            },
          ],
        }
      );

      console.log(`Ticket: ${req.body.flightConfirmation} has been added!`);
      res.redirect(`/tripEditor/${req.params.id}#${req.params.loc}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteFlight: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $pull: {
            'destinations.$[destination].tickets': {
              flightConfirmation: req.body.flightFromJSFile,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );

      console.log(
        `Deleted: ${req.body.flightFromJSFile} from ${req.body.tripIdFromJSFile}`
      );
      res.json(`Deleted: ${req.body.flightFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
  addActivity: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            'destinations.$[destination].itinerary': {
              activityDescrip: req.body.activityDescrip,
              activityLocation: req.body.activityLocation,
              activityType: req.body.activityType,
              startDateTime: req.body.startDateTime,
              endDateTime: req.body.endDateTime,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.params.loc,
            },
          ],
        }
      );

      console.log(`Activity: ${req.body.activityDescrip} has been added!`);
      res.redirect(`/tripEditor/${req.params.id}#${req.params.loc}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteActivity: async (req, res) => {
    try {
      await Trip.findOneAndUpdate(
        { _id: req.body.tripIdFromJSFile },
        {
          $pull: {
            'destinations.$[destination].itinerary': {
              activityDescrip: req.body.activityFromJSFile,
            },
          },
        },
        {
          arrayFilters: [
            {
              'destination.location': req.body.destinationFromJSFile,
            },
          ],
        }
      );

      console.log(
        `Deleted: ${req.body.activityFromJSFile} from ${req.body.tripIdFromJSFile}`
      );
      res.json(`Deleted: ${req.body.activityFromJSFile}`);
    } catch (err) {
      console.log(err);
    }
  },
};
