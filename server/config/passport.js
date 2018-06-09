//load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , models  = require('../models/index');


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
    models.User.findOne({where: {email: email.toLowerCase()}}).then(function(user) {
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
          console.log(res);
          if (res) {
            console.log('password matched...');
            return cb(null, user);
          } else {
            return cb(null, false);
          }
      });
    });
  }));
}
