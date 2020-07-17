'use strict';

var models  = require('../models/index');
var Region = models.Region;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Region.sync();
  },

  index(req, res) {
    Region.findAll({
      attributes: ['id', 'name', 'country', 'country_id', 'description', 'visible', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
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
    Region.findAll({
      where: { id : req.query.regionid},
      include: [{
                  model : models.Location,
                  where: {visible : true}
                }]
      })
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      console.log('Error is returning response===>');
      console.log(error);
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    //console.log('req===>', req.body);
    Region.create(req.body).then(function(CountryInstance){
        res.status(200).json(CountryInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    //console.log('update req===>', req.body);
    let queryVars = req.body;
    Region.update(req.body, {
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
    //console.log(req);
    let queryVars = req.query;
    Region.destroy({
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
