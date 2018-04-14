'use strict';

var models  = require('../models/index');
var Tag = models.Tag;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Tag.sync();
  },

  index(req, res) {
    console.log('All TagsIndex=====>');
    Tag.findAll({})
      .then(function (authors) {
        console.log('All Tags=====>');
        res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log('All Tags=====>' + error);
        res.status(500).json(error);
      });
  },

  //Get an author by the unique ID using model.findById()
  show(req, res) {
    Tag.findById(req.query.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('In Tag create req===>', req.body);
    Tag.create(req.body).then(function(TagInstance){
        res.status(200).json(TagInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Tag.update(req.body, {
      where: {
        id: queryVars.id
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
    console.log(req);
    let queryVars = req.query;
    Tag.destroy({
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
