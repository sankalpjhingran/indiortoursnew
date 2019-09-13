'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');
var passportFacebook = require('passport-facebook');
var router = express.Router();
var users = require('../controllers/users');

router.post("/", passport.authenticate('local-signin'), function(req, res) {
  console.log('In auth.js route=====>');
  const returnUser = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    type: req.user.type,
    dateofbirth: req.user.dateofbirth,
    gender: req.user.gender,
    addressline1: req.user.addressline1,
    lastLogin: req.user.lastLogin,
    email: req.user.email,
    phone: req.user.phone,
    addressline1: req.user.addressline1,
    addressline2: req.user.addressline2,
    addresscity: req.user.addresscity,
    addresstate: req.user.addresstate,
    addresscountry: req.user.addresscountry,
    addresszippin: req.user.addresszippin,
  };
  //console.log(returnUser);
  //console.log(req.session);
  //res.json(returnUser);
  return res.redirect('/');
});

// Facebook auth routes
router.get('/auth/facebook', function authenticateFacebook(req, res, next) {
    console.log('Facebook signin route====>');
    console.log(req.query.returnTo);
    req.session.returnTo = '/' + req.query.returnTo;
    next();
  },

passport.authenticate('facebook', { scope: 'email', session: false }));
router.get('/auth/facebook/callback', function(req, res, next) {
  console.log('In facebook signin callback====>');
  console.log(req.session);
  try {
    passport.authenticate('facebook', {},
        (err, user, info) => {
        //console.log(info);
        //console.log(err);
        //console.log('User is===> ', info);

        if(info.msg === 'VerificationPending') {
            return res.redirect('/verify?status=pending');
        } else if(info.msg === 'failed') {
            return res.redirect('/signup?login=failed');
        }

        if (err) {
            return res.redirect('/signup?login=failed&msg='+err);
        } else {
            console.log('Redirecting to home page after login===>');
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return res.redirect('/');
            });
        }
    })(req, res, next);
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;
