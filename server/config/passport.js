//load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy = require('passport-local').Strategy;
  var models  = require('../models/index');
  var config    = require('../config/config2');

module.exports = function(passport, user) {

//serialize
passport.serializeUser(function(user, done) {
  console.log('in serializeUser...' + user.email);
  done(null, user.email);
});


//Deserialize Sessions
passport.deserializeUser(function(user, done){
  console.log('in deserializeUser...');
  console.log(user);
	models.User.findOne({where: {email: user}}).then(function(user){
    if(user){
        done(null, user.get());
    }
	}).error(function(err){
		done(user.errors, null);
	});
});


// For Authentication Purposes
passport.use('local-signin', new LocalStrategy(
  {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },

  function(req, email, password, cb) {
    console.log('Finding user......');
    console.log(email);
    models.User.findOne({where: {email: email.toLowerCase(), isactive:true, status:'Active'}}).then(function(user) {
      if (!user) {
              console.log('User does not exist');
              return cb(null, false, {
              message: 'Email does not exist'
            });
      }
      console.log('User exists...validating password...');
      passwd = user ? user.password : '';

      console.log(password);
      console.log(passwd);

      bCrypt.compare(password, passwd, function(err, res) {
          if (res) {
            console.log('password matched...');
            //update user's last login time

            user.lastLogin = new Date(Date.now()).toLocaleString();
            console.log(email.toLowerCase());
            console.log(user.lastLogin);

            models.User.update({lastLogin : new Date(Date.now()).toLocaleString()},
              {
                where: {
                  email: email.toLowerCase(), isactive:true, status:'Active'
                }
              }).then(function(user) {
                console.log(user);
            });
            return cb(null, user);
          } else {
            return cb(null, false);
          }
      });
    });
  }));

  // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : config.fb.CLIENT_ID,
        clientSecret    : config.fb.CLIENT_SECRET,
        callbackURL     : '/signup'

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));



}
