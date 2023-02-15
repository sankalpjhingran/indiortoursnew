const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const jade = require('pug');
const compression = require('compression');
const prerender = require('prerender-node');


const util = require('util');
const fs = require('fs');
const debug = require('debug')('http'),
  http = require('http'),
  name = 'IndiorTours';

const qs = require('querystring');
const dotenv = require('dotenv');
const redis = require('./config/redis-client');

const models = require('./models/index');
const regusers = require('./routes/regusers');
const contactus = require('./routes/contactus');
const signup = require('./routes/signup');
const auth = require('./routes/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FaceBookStrategy = require('passport-facebook').Strategy;
const application = require('./routes/application');
const logout = require('./routes/logout');
const tours = require('./routes/tours');
const locations = require('./routes/location');
const continents = require('./routes/continent');
const countries = require('./routes/country');
const regions = require('./routes/region');
const hotels = require('./routes/hotel');
const itinerary = require('./routes/itinerary');
const departuredates = require('./routes/departuredates');
const tourcosts = require('./routes/tourcosts');
const images = require('./routes/image');
const notes = require('./routes/tournotes');
const users = require('./routes/user');
const places = require('./routes/place');
const tags = require('./routes/tag');
const parenttours = require('./routes/parenttour');
const bookings = require('./routes/booking');
const search = require('./routes/search');
//load passport strategies
require('./config/passport')(passport, models.User);

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));

// Use pre-render for better SEO performance
app.use(prerender);


//Use Compression for gzip compression, for Production, use nginx gzip compression
app.use(compression());

app.use(cors()) // <--- CORS
debug('Initializing app.js file====>2');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
debug('Initializing app.js file====>3');

SALT_WORK_FACTOR = 12;

redis.on('connect', function() {
  console.log('Redis client connected');
});

redis.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

redis.unref();

//app.use(cookieParser());
app.use(bodyParser.json({
  limit: '50mb'
}));
//app.use(app.bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.disable('etag').disable('x-powered-by');

//For passport
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redis,
    ttl: 86400,
    disableTTL: true
  }),
  secret: process.env.PASSPORT_SECRET_FOR_REDIS,
  saveUninitialized: true,
  resave: true
}));

// Init passport authentication
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('production'));


// Authenticated update paths start
app.use('/api/location/update', ensureAuthenticated, locations);
app.use('/api/booking/update', ensureAuthenticated, bookings);
app.use('/api/continent/update', ensureAuthenticated, continents);
app.use('/api/country/update', ensureAuthenticated, countries);
app.use('/api/region/update', regions);
app.use('/api/itinerary/update', ensureAuthenticated, itinerary);
app.use('/api/itinerary/bulkcreate', ensureAuthenticated, itinerary);
app.use('/api/itinerary/bulkupdate', ensureAuthenticated, itinerary);
app.use('/api/departuredates/update', ensureAuthenticated, departuredates);
app.use('/api/tourcosts/update', ensureAuthenticated, tourcosts);
app.use('/api/tourcosts/bulkcreate', ensureAuthenticated, tourcosts);
app.use('/api/tourcosts/bulkupdate', ensureAuthenticated, tourcosts);

app.use('/api/tours/update', ensureAuthenticated, tours);
app.use('/api/tournotes/update', ensureAuthenticated, notes);
app.use('/api/regusers', ensureAuthenticated, regusers);

// Authenticated update paths end

app.use('/api/image', images);
app.use('/api/image/all', images);
app.use('/api/image/allImages', images);
app.use('/api/image/search', images);
app.use('/api/users', users);


app.use('/api/contactus', contactus);
app.use('/api/signup', signup);
app.use('/api/signin', auth);
app.use('/api/signin/auth/facebook', auth);
app.use('/api/signin/auth/facebook/callback', auth);
app.use('/api/logout', logout);
app.use('/api/isAuthenticated', application);
app.use('/api/tours', tours);
app.use('/api/location', locations);
app.use('/api/location/all', locations);
app.use('/api/location/adminLocations', locations);
app.use('/api/location/getGroupedLocations', locations);
app.use('/api/location/getContinents', locations);


app.use('/api/booking', bookings);
app.use('/api/booking/all', bookings);

app.use('/api/continent', continents);
app.use('/api/continent/all', continents);
app.use('/api/continent/allIndex', continents);
app.use('/api/country', countries);
app.use('/api/country/all', countries);
app.use('/api/country/tours', countries);
app.use('/api/country/toursforregion', countries);
app.use('/api/region', regions);
app.use('/api/region/all', regions);
app.use('/api/hotel', hotels);
app.use('/api/hotel/all', hotels);
app.use('/api/hotel/update', hotels);
app.use('/api/itinerary', itinerary);
app.use('/api/itinerary/all', itinerary);
app.use('/api/departuredates', departuredates);
app.use('/api/departuredates/all', departuredates);
app.use('/api/tourcosts', tourcosts);
app.use('/api/tourcosts/all', tourcosts);
app.use('/api/tours/all', tours);
app.use('/api/tours', ensureAuthenticated, tours);
app.use('/api/tours/find', tours);
app.use('/api/tours/tourwithlocations', tours);
app.use('/api/tours/alltourswithlocations', tours);
app.use('/api/tours/alltourswithitineries', tours);
app.use('/api/tours/alltourswithcosts', tours);
app.use('/api/tours/tourdetailswithrelatedmodels', tours);
app.use('/api/tours/tourdetailswithrelateditineraries', tours);
app.use('/api/tours/tourdetailswithrelatedlocations', tours);
app.use('/api/tours/tourdetailswithrelatedhotels', tours);
app.use('/api/tours/tourdetailswithrelatedcosts', tours);
app.use('/api/tours/tourdetailswithrelateddeparturedates', tours);
app.use('/api/tours/tourdetailswithrelatednotes', tours);
app.use('/api/tours/alltourswithlocationsandhotels', tours);
app.use('/api/tours/searchtourwithlocations', tours);
app.use('/api/tournotes', notes);
app.use('/api/tournotes/all', notes);
app.use('/api/users/verify', users);
app.use('/api/users/newverifylink', users);
app.use('/api/users/forgotpassword', users);
app.use('/api/users/updatepassword', users);
app.use('/api/places', places);
app.use('/api/places/all', places);
app.use('/api/tags/all', tags);
app.use('/api/tags', tags);
app.use('/api/parenttours/all', parenttours);
app.use('/api/parenttours/allTripsByOrder', parenttours);
app.use('/api/parenttours', parenttours);
app.use('/api/parenttours/viewtrip', parenttours);
app.use('/api/parenttours/update', ensureAuthenticated, parenttours);
app.use('/api/search', search);

app.get('/api/conversionrates', function(request, res) {
  res.json(require('./config/conversionrates.json'));
});

app.get('/api/countrycodes', function(request, res) {
  res.json(require('./config/CountryCodes.json'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '/dist')));

// In production, we'll actually serve our angular app from express
if (app.get('env') === 'prod' || app.get('env') === 'dev') {
  app.use(express.static(path.join(__dirname, '/dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

app.get('/api/sitemap', function(request, res) {
  fs = require('fs');
  fs.readFile(path.join(__dirname + '/site-map.xml'), function(err, data) {
    res.set('Content-Type', 'text/xml');
    res.set('vary', 'User-Agent');
    res.set('content-encoding', 'compress');
    res.set('transfer-encoding', 'compress');
    res.send(data.toString());
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err; //{};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// test authentication
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).send({
      success: false,
      message: 'Authentication required'
    });
  } else {
    console.log('Calling next, auth is true===>');
    next();
  }
}

module.exports = app;
