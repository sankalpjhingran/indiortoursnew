'use strict';

var models  = require('../models/index');
var TourCost = models.TourCost;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      TourCost.sync();
  },

  index(req, res) {
    TourCost.findAll({
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
    TourCost.findByPk(req.params.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },


  //Bulk Create a new author using model.create()
  bulkCreate(req, res) {
    console.log('req===>', req.body);
    TourCost.bulkCreate(req.body, { updateOnDuplicate: true } ).then(function(costINstance){
        res.status(200).json(costINstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Bulk Create a new author using model.create()
  bulkUpdate(req, res) {
    TourCost.bulkCreate(req.body, { updateOnDuplicate: true }).then(function(costINstance){
        console.log(costINstance);
        res.status(200).json(costINstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req===>', req.body);
    TourCost.create(req.body).then(function(TourCostInstance){
        res.status(200).json(TourCostInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    TourCost.update(req.body, {
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
    TourCost.destroy({
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
