// ***** Modules ***** //
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');

// ***** Variables ***** //
const app = express();
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const tripsRoutes = require('./routes/trips');

// ***** .ENV config ***** //
require('dotenv').config({ path: './config/.env' });

// ***** Passport config ***** //
require('./config/passport')(passport);

// *****  MongoDB connection ***** //
connectDB();

// *****  Middleware ***** //
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// ***** Sessions ***** //
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// ***** Passport middleware ***** //
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// ***** Routes/Pathing ***** //
app.use('/', mainRoutes);
app.use('/trips', tripsRoutes);

// ***** Run Server Connection ***** //
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
