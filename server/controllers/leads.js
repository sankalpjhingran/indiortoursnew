'use strict';

var models  = require('../models/index');
var Lead = models.Lead;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Lead.sync();
  },

  index(req, res) {
    Lead.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an author by the unique ID using model.findById()
  show(req, res) {
    Lead.findByPk(req.params.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    Lead.create(req.body)
      .then(function (newAuthor) {
        res.status(200).json(newAuthor);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    Lead.update(req.body, {
      where: {
        id: req.params.id
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
    Lead.destroy({
      where: {
        id: req.params.id
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
