var models  = require('../models/index');
var bCrypt = require('bcrypt-nodejs');
var User = models.User;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      User.sync();
  },

  index(req, res) {
    User.findAll({})
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  register(req, res){
      User.findOrCreate({
            where: { email: req.body.email.toLowerCase()}, // we search for this user
            defaults: req.body // if it doesn't exist, we create it with this additional data
          }).then()
          .spread((user, created) => {
              if(created){
                  return res.json(user);
              }else{
                  return res.json('User Already Exists...');
              }
          });
  },

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
