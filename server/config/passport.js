//load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var models  = require('../models/index');
  var config    = require('../config/config2');
  var randomstring = require("randomstring");
  const emailUtils = require('../utils/EmailUtils');

module.exports = function(passport, user) {

//serialize
passport.serializeUser(function(user, done) {
  console.log('in serializeUser...' + user.id);
  done(null, user.id);
});

//Deserialize Sessions
passport.deserializeUser(function(id, done){
  console.log('in deserializeUser...', id);
	models.User.findByPk(id).then(function(user){
    if(user){
        done(null, user.get());
    } else {
      done(null, null);
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
        clientID        : config.fb.clientID,
        clientSecret    : config.fb.clientSecret,
        callbackURL     : config.fb.callbackURL,
        passReqToCallback: true,
        profileFields: ['id', 'name', 'displayName', 'emails']
    },

    // facebook will send back the token and profile
    function(req,token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

          let newUser = new models.User();

          // set all of the facebook information in our user model
          newUser.facebookId    = profile.id; // set the users facebook id
          //newUser.facebook.token = token; // we will save the token that facebook provides to the user
          newUser.lastname = profile.name.familyName;
          newUser.firstname = profile.name.givenName;
          newUser.isactive = false;
          newUser.status = 'Inactive';
          newUser.email = profile.emails[0].value;

          console.log(req.get('host'));

          //register code starts
          models.User.findOrCreate({
                where: {email: profile.emails[0].value}, // we search for this user
                defaults: newUser.dataValues // if it doesn't exist, we create it with this additional data
              }).then()
              .spread((user, created) => {
                  if(created){
                      let subject = 'Welcome To Indior Tours...!';
                      let text = 'Thanks for signing up with us, please click on the link below to activate your account! This link is active for 24 hours.';

                      var randomstr = randomstring.generate();

                      let link = req.protocol + '://' + req.get('host') + '/verify?id=' + user.id + '&link='  + randomstr;
                      let html = text + '<br />' + link;
                      emailUtils.sendNewUserEmail(user.email, subject, text, html);

                      newUser.verifylink = randomstr;
                      newUser.verifylinkcreateddate = Date.now();
                      newUser.id = user.id;
                      newUser.type = 'Direct Customer';

                      models.User.update(newUser.dataValues, {
                        where: {
                          id: user.id
                        }
                      })
                      .then(function (updatedRecord) {
                        //res.status(200).json(updatedRecords);
                        console.log('User created====>');
                        return done(null, false, {msg: 'VerificationPending'});
                      }).error(function(err){
                        return done(updatedRecord.errors, false, {msg: 'failed'});
                      });
                  }else{
                      console.log('User exists...isactive====> ', user.isactive);
                      console.log('User exists...status is====> ', user.status);
                      if(user.isactive && user.status === 'Active') {
                          console.log('User exists...and is active====>');
                          console.log('update the user with facebook id===>');

                          newUser.isactive = true;
                          newUser.status = 'Active';
                          newUser.id = user.id;
                          newUser.type = user.type;
                          models.User.update(newUser.dataValues, {
                            where: {
                              id: user.id
                            }
                          })
                          .then(function (updatedRecord) {
                            return done(null, user, {msg: 'success'});
                          }).error(function(err){
                            return done(updatedRecord.errors, false, {msg: 'failed'});
                          });
                      } else {
                          let subject = 'Welcome To Indior Tours...!';
                          let text = 'Thanks for signing up with us, please click on the link below to activate your account! This link is active for 24 hours.';

                          var randomstr = randomstring.generate();

                          let link = req.protocol + '://' + req.get('host') + '/verify?id=' + user.id + '&link='  + randomstr;
                          let html = text + '<br />' + link;
                          emailUtils.sendNewUserEmail(user.email, subject, text, html);

                          newUser.verifylink = randomstr;
                          newUser.verifylinkcreateddate = Date.now();
                          newUser.id = user.id;

                          models.User.update(newUser.dataValues, {
                            where: {
                              id: user.id
                            }
                          })
                          .then(function (updatedRecord) {
                            //res.status(200).json(updatedRecords);
                            console.log('User created====>');
                            return done(null, false, {msg: 'VerificationPending'});
                          }).error(function(err){
                            return done(updatedRecord.errors, false, {msg: 'failed'});
                          });
                      }
                  }
              });
          //register code ends
        });
    }));
}
