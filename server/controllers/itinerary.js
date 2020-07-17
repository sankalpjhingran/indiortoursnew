'use strict';

var models  = require('../models/index');
var Itinerary = models.Itinerary;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Itinerary.sync();
  },

  index(req, res) {
    Itinerary.findAll({
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
    Itinerary.findByPk(req.params.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req===>', req.body);
    Itinerary.create(req.body).then(function(ItineraryInstance){
        res.status(200).json(ItineraryInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Bulk Create a new author using model.create()
  bulkCreate(req, res) {
    console.log('req===>', req.body);
    Itinerary.bulkCreate(req.body, { updateOnDuplicate: true } ).then(function(ItineraryInstances){
        res.status(200).json(ItineraryInstances);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Bulk Create a new author using model.create()
  bulkUpdate(req, res) {
    Itinerary.bulkCreate(req.body, { updateOnDuplicate: true }).then(function(ItineraryInstances){
        console.log(ItineraryInstances);
        res.status(200).json(ItineraryInstances);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Itinerary.update(req.body, {
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
    let queryVars = req.query;

    console.log(req.query);
    var itnIds = [];

    Itinerary.findAll( { where: { tour_id : queryVars.id } })
      .then(function (authors) {

        authors.forEach(function(itn){
            itnIds.push(itn.id);
        })

        Itinerary.destroy(
          { where: { id: itnIds }}
        )
        .then(function (deletedRecords) {
          res.status(200).json(deletedRecords);
        })
        .catch(function (error){
          res.status(500).json(error);
        });
      })


  }
};
