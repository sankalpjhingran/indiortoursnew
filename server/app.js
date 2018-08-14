var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jade = require('pug');
var helmet = require('helmet');
var compression = require('compression');
var braintree = require('braintree');
var util = require('util');
var fs = require('fs');
var debug = require('debug')('http')
  , http = require('http')
  , name = 'IndiorTours';

var redis = require('redis');

var models = require('./models/index');
var regusers = require('./routes/regusers');
var contactus = require('./routes/contactus');
var signup = require('./routes/signup');
var auth = require('./routes/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var application = require('./routes/application');
var logout = require('./routes/logout');
var tours = require('./routes/tours');
var locations = require('./routes/location');
var hotels = require('./routes/hotel');
var itinerary = require('./routes/itinerary');
var departuredates = require('./routes/departuredates');
var tourcosts = require('./routes/tourcosts');
var images = require('./routes/image');
var notes = require('./routes/tournotes');
var users = require('./routes/user');
var places = require('./routes/place');
var tags = require('./routes/tag');
var parenttours = require('./routes/parenttour');
var search = require('./routes/search');

//load passport strategies
require('./config/passport')(passport, models.User);

var app = express();

//Use Helmet for security
app.use(helmet());

//Use Compression for gzip compression, for Production, use nginx gzip compression
app.use(compression());

app.use(cors()) // <--- CORS
debug('Initializing app.js file====>2');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
debug('Initializing app.js file====>3');

SALT_WORK_FACTOR = 12;

var client = redis.createClient(); // this creates a new client
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.unref();

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

/*
app.use(session({
    store: new RedisStore({ client : client }),
    secret: 'indiornoida201301',
    saveUninitialized: true,
    resave: true
}));
*/

// For Passport
app.use(require('express-session')({ // session secret
    secret: 'indiornoida201301',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('production'));
app.use(bodyParser.json({limit: '50mb'}));
//app.use(app.bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



app.use('/api/image', images);
app.use('/api/image/all', images);
app.use('/api/image/allImages', images);

//app.use('/*', index); //<-- COMMENT THIS
//app.use('/api/login', login);
app.use('/api/regusers', regusers);
app.use('/api/contactus', contactus);
app.use('/api/signup', signup);
app.use('/api/signin', auth);
app.use('/api/logout', logout);
app.use('/api/isAuthenticated', application);
app.use('/api/tours', tours);
app.use('/api/location', locations);
app.use('/api/location/all', locations);
app.use('/api/location/update', locations);
app.use('/api/hotel', hotels);
app.use('/api/hotel/all', hotels);
app.use('/api/hotel/update', hotels);
app.use('/api/itinerary', itinerary);
app.use('/api/itinerary/all', itinerary);
app.use('/api/itinerary/update', itinerary);
app.use('/api/itinerary/bulkcreate', itinerary);
app.use('/api/itinerary/bulkupdate', itinerary);
app.use('/api/departuredates', departuredates);
app.use('/api/departuredates/all', departuredates);
app.use('/api/departuredates/update', departuredates);
app.use('/api/tourcosts', tourcosts);
app.use('/api/tourcosts/all', tourcosts);
app.use('/api/tourcosts/update', tourcosts);
app.use('/api/tours/all', tours);
app.use('/api/tours', tours);
app.use('/api/tours/find', tours);
app.use('/api/tours/update', tours);
app.use('/api/tours/tourwithlocations', tours);
app.use('/api/tours/alltourswithlocations', tours);
app.use('/api/tours/getAllToursWithItineraries', tours);
app.use('/api/tours/tourdetailswithrelatedmodels', tours);
app.use('/api/tours/alltourswithlocationsandhotels', tours);
app.use('/api/tours/searchtourwithlocations', tours);
app.use('/api/tournotes', notes);
app.use('/api/tournotes/all', notes);
app.use('/api/tournotes/update', notes);
app.use('/api/users', users);
app.use('/api/users/verify', users);
app.use('/api/users/newverifylink', users);
app.use('/api/users/forgotpassword', users);
app.use('/api/users/updatepassword', users);
app.use('/api/places', places);
app.use('/api/places/all', places);
app.use('/api/tags/all', tags);
app.use('/api/tags', tags);
app.use('/api/parenttours/all', parenttours);
app.use('/api/parenttours', parenttours);
app.use('/api/parenttours/update', parenttours);
app.use('/api/parenttours/viewtrip', parenttours);

app.use('/api/search', search);

app.get('/api/conversionrates', function (request, res) {
  res.json(require('./config/conversionrates.json'));
});

app.get('/api/countrycodes', function (request, res) {
  res.json(require('./config/CountryCodes.json'));
});

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'pj2zmzfr2w2khb8m',
  publicKey: 'xvy7mghymx3gz2ff',
  privateKey: 'e5bc0c9d920ff04e513e7cac1b6f86c8'
});

var jsonParser = bodyParser.json();
/**
 * Enable CORS (http://enable-cors.org/server_expressjs.html)
 * to allow different clients to request data from your server
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Route that returns a token to be used on the client side to tokenize payment details
 */
app.post('/api/v1/token', function (request, response) {
  gateway.clientToken.generate({}, function (err, res) {
    if (err) throw err;
    response.json({
      "client_token": res.clientToken
    });
  });
});

/**
 * Route to process a sale transaction
 */
app.post('/api/v1/process', jsonParser, function (request, response) {
  var transaction = request.body;
  console.log(transaction);
  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.nonce,
    billing : {
        streetAddress: '40 Poncetta Dr'
    }
  }, function (err, result) {
    if (err) throw err;
    console.log(util.inspect(result));
    response.json(result);
  });
});

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
module.exports = app;
