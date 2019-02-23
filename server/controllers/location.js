'use strict';

var models  = require('../models/index');
var Image = models.Image;
var Location = models.Location;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
      //include: [{ association : 'places' }],
      attributes: ['id', 'city', 'state', 'visible', 'region', 'country', 'description', 'continent', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
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

  indexAll(req, res) {
    Location.findAll({
      //include: [{ association : 'places' }],
      attributes: ['id', 'city', 'state', 'visible', 'region', 'country', 'description', 'continent', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
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
    Location.findById(req.query.id, {
      include: [{ association : 'siteTour' }]
    })
    .then(function (author) {
      var parentIds = [];

      author.siteTour.forEach(function(tour){
        parentIds.push(tour.id);
      });
      Image.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          [Op.and]: {
            parentobjectid : {
                [Op.in]: parentIds
            },
            parentobjectname : 'tour'
          }
        }
      })
      .then(function (imageRes) {
        var tourImageMap = new Map();
        imageRes.forEach(function(image){
          var lstImages = [];
          lstImages.push(image.dataValues);
          if(tourImageMap.has(image.parentobjectid)) {
              var list = tourImageMap.get(image.parentobjectid);
              var lstImages = list.concat( lstImages );
              tourImageMap.set(image.parentobjectid, lstImages);
          }else {
              tourImageMap.set(image.parentobjectid, lstImages);
          }
        });
        console.log(tourImageMap);

        author.siteTour.forEach(function(tourNew){
          console.log(tourNew.name);
          tourNew.dataValues.images = [];
          tourNew.dataValues.images.push(tourImageMap.get(JSON.stringify(tourNew.id)));
        })
        console.log('Authors are====>');
        console.log(author);
        res.status(200).json(author);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
    })
    .catch(function (error){
      console.log(error);
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
