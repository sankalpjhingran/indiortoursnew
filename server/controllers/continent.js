'use strict';

var models  = require('../models/index');
var Continent = models.Continent;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Continent.sync();
  },

  index(req, res) {
    Continent.findAll({
      attributes: ['id', 'name', 'isactive', 'description', 'displayorder', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
      order: [['createdAt', 'DESC']],
      where: {isactive: true},
      order: [['displayorder', 'ASC']]
      })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  indexAll(req, res) {
    Continent.findAll({
      attributes: ['id', 'name', 'isactive', 'description', 'displayorder', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
      order: [['createdAt', 'DESC']],
      })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //Get an author by the unique ID using model.findById()
  show(req, res) {
    console.log('Query is===>');
    console.log(req.query);
    Continent.findById(req.query.id, {
      include: [{
        model: models.Country,
        where: { isvisible : true },
        order: [['name', 'DESC']]
      }]
    })
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      console.log('Error is===>');
      console.log(error);
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req===>', req.body);
    Continent.create(req.body).then(function(ContinentInstance){
        res.status(200).json(ContinentInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Continent.update(req.body, {
      where: {
        id: queryVars.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      console.log(error);
      res.status(500).json(error);
    });
  },

  //Delete an existing author by the unique ID using model.destroy()
  delete(req, res) {
    console.log(req);
    let queryVars = req.query;
    Continent.destroy({
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
