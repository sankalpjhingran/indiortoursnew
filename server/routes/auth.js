'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');
var passportFacebook = require('passport-facebook');
var router = express.Router();
var users  = require('../controllers/users');


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
    phone: req.user.phone
  };
  console.log(returnUser);
  res.json(returnUser);
});

//Passport facebook callback
router.get('/auth/fb', passport.authenticate('facebook'));

router.get('/auth/fb/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
