'use strict';

var models  = require('../models/index');
var bcrypt = require('bcrypt-nodejs');
var User = models.User;
var randomstring = require("randomstring");
const emailUtils = require('../utils/EmailUtils');

var users = {
  //Get a list of all authors using model.findAll()
  sync(){
      User.sync();
  },

  index(req, res) {
    User.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  verifylink(req, res) {
    User.find({
        where: {id : req.body.id, verifylink: req.body.verifylink}
    })
      .then(function (user) {
        if(user) {
          var hours = Math.abs(user.verifylinkcreateddate - Date.now()) / 36e5;

          if( hours < 24 ) {
            req.body.isactive = true;
            req.body.status = 'Active';
            User.update(req.body, {
              where: {
                id: user.id
              }
            })
            .then(function (updatedRecords) {
              res.status(200).json({name: user.firstname, result: 'success'});
            })
          } else {
            res.status(200).json({error: "Link expired"});
          }
        } else {
            res.status(200).json({error: "User does not exist"});
        }
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  forgotpassword(req, res){
      console.log('Forgot password req=====>');
      console.log(req.body);
      User.find({
            where: { email: req.body.email.toLowerCase()}, // we search for this user
          }).then(function (user) {
              if(user.email.toLowerCase() === req.body.email.toLowerCase()){
                  let subject = 'IndiorTours: Reset password...';
                  let text = 'Click on the link below to reset your password! This link is active for 24 hours.';
                  var randomstr = randomstring.generate();
                  let link = req.protocol + '://' + req.get('host') + '/resetpassword?id=' + user.id + '&link='  + randomstr;
                  let html = text + '<br />' + link;
                  emailUtils.sendNewUserEmail(user.email, subject, text, html);

                  req.body.verifylink = randomstr;
                  req.body.verifylinkcreateddate = Date.now();
                  User.update(req.body, {
                    where: {
                      id: user.id
                    }
                  })
                  .then(function (updatedRecords) {
                    res.status(200).json(true);
                  })
              }else{
                  return res.json('User does not exists...');
              }
          });
  },

  newverifylink(req, res){
      User.find({
            where: { email: req.body.email.toLowerCase()}, // we search for this user
          }).then(function (user) {
              if(user.email.toLowerCase() === req.body.email.toLowerCase()){
                  let subject = 'Welcome To Indior Tours...!';
                  let text = 'Thanks for signing up with us, please click on the link below to activate your account! This link is active for 24 hours.';
                  var randomstr = randomstring.generate();
                  let link = req.protocol + '://' + req.get('host') + '/verify?id=' + user.id + '&link='  + randomstr;
                  let html = text + '<br />' + link;
                  emailUtils.sendNewUserEmail(user.email, subject, text, html);

                  req.body.verifylink = randomstr;
                  req.body.verifylinkcreateddate = Date.now();
                  User.update(req.body, {
                    where: {
                      id: user.id
                    }
                  })
                  .then(function (updatedRecords) {
                    res.status(200).json(true);
                  })
              }else{
                  return res.json('User does not exists...');
              }
          });
  },

  register(req, res){
      User.findOrCreate({
            where: { email: req.body.email.toLowerCase()}, // we search for this user
            defaults: req.body // if it doesn't exist, we create it with this additional data
          }).then()
          .spread((user, created) => {
              if(created){
                  let subject = 'Welcome To Indior Tours...!';
                  let text = 'Thanks for signing up with us, please click on the link below to activate your account! This link is active for 24 hours.';
                  //let link =
                  var randomstr = randomstring.generate();
                  let link = req.protocol + '://' + req.get('host') + '/verify?id=' + user.id + '&link='  + randomstr;
                  let html = text + '<br />' + link;
                  emailUtils.sendNewUserEmail(user.email, subject, text, html);

                  req.body.verifylink = randomstr;
                  req.body.verifylinkcreateddate = Date.now();
                  req.body.password = user.password;
                  User.update(req.body, {
                    where: {
                      id: user.id
                    }
                  })
                  .then(function (updatedRecords) {
                    res.status(200).json(updatedRecords);
                  })
              }else{
                  return res.json('User Already Exists...');
              }
          });
  },

  /*
  sendNewUserEmail(user){
    console.log('Calling sendNewUserEmail======>');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'sankalp.jhingran@gmail.com',
          pass: 'Goldenhouse#56',
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'sankalp.jhingran@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  },
  */

  //Get an author by the unique ID using model.findById()
  show(req, res) {
    if(req.isAuthenticated()){
      User.findOne(req.body.email, {})
      .then(function (user) {
        res.status(200).json(user);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
    }else{
        res.status(403).json('User not logged in.');
    }
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('In create method...');
    User.create(req.body)
      .then(function (newAuthor) {
        res.status(200).json(newAuthor);
      })
      .catch(function (error){
        console.log(error);
        res.status(500).json(error);
      });
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  updatepassword(req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
    req.body.password = hash;
    User.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(true);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Delete an existing author by the unique ID using model.destroy()
  delete(req, res) {
    let queryVars = req.query;
    User.destroy({
      where: {
        id: queryVars.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
module.exports = users;
