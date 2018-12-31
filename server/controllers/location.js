'use strict';

var models  = require('../models/index');
var Location = models.Location;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Location.sync();
  },

  getGroupedLocations(req, res) {
    var type = req.query.type;
    var name = req.query.name;
    console.log('type====' + type);
    console.log('name====' + name);
    Location.findAll({
      where: {type : name},
      attributes: [
        [models.sequelize.fn('DISTINCT', models.sequelize.col(type)) , type],
      ]
      })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  getContinents(req, res) {
    Location.findAll({
      attributes: [
        [models.sequelize.fn('DISTINCT', models.sequelize.col('continent')) , 'continent'],
      ]
      })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  index(req, res) {
    Location.findAll({
      include: [{ association : 'places' }],
      attributes: ['id', 'city', 'state', 'visible', 'country', 'description', 'continent', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
      order: [['createdAt', 'DESC']],
      where: {visible: true}
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
    Location.findById(req.query.id, {})
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
    Location.create(req.body).then(function(LocationInstance){
        res.status(200).json(LocationInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Location.update(req.body, {
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
    Location.destroy({
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
