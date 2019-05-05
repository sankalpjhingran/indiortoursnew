'use strict';

var models  = require('../models/index');
var Country = models.Country;
var TourLocation = models.TourLocation;
var Tour = models.Tour;
var Location = models.Location;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Country.sync();
  },

  index(req, res) {
    Country.findAll({
      attributes: ['id', 'name', 'continent', 'description', 'latitude', 'isvisible', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
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
    console.log('Calling show of country');
    console.log(req.query);
    Country.findById(req.query.id, {
      include: [
                { model : models.Region,
                  where: {
                            visible : true
                         }
                },
                { model : models.Location,
                    where: {
                              visible : true
                           }
                }
               ]
    })
    .then(function (author) {
      console.log(author);
      res.status(200).json(author);
    })
    .catch(function (error){
      console.log(error);
      res.status(500).json(error);
    });
  },


  //Get tours for a country
  getToursForCountry(req, res){
    var popularToursMap = require('hashmap');
    let queryVars = req.query;

    Location.findAll({
      where: { country_id : queryVars.id, visible: true },
      attributes: [ 'city', 'id' ],
      include: [{
                  association : 'siteTour',
                  where: {popularitinerary : true, isactive : true},
                  order: [
                            Sequelize.fn('isnull', Sequelize.col('order')),
                            ['order', 'ASC']
                          ],
                  include : [
                    { association : 'tourGroup'},
                    { association : 'siteLocation', attributes: ['id', 'city', 'state', 'country', 'continent', 'latitude', 'longitude', 'elevation'] }
                  ]
                }]
      })
      .then(function (authors) {
        var tours = [];
        authors.forEach(function(item){
          tours.push(item.siteTour);
        })
        console.log(tours);
        tours = tours.filter((li, idx, self) => self.map(itm => itm.id).indexOf(li.id) === idx)
        console.log(tours);
        res.status(200).json(tours);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getToursForCountry2(req, res){
    var popularToursMap = require('hashmap');
    let queryVars = req.query;

    Location.findAll({
      where: { country_id : queryVars.id, region_id: queryVars.regionid, visible: true },
      attributes: [ 'city', 'id' ],
      include: [{
                  association : 'siteTour',
                  include: [{ association : 'siteLocation', attributes: ['id', 'city', 'state', 'country', 'continent', 'latitude', 'longitude', 'elevation'] }],
                  where: {isactive : true},
                  order: [
                            Sequelize.fn('isnull', Sequelize.col('order')),
                            ['order', 'ASC']
                          ]
                }]
      })
      .then(function (authors) {
        var tours = [];
        authors.forEach(function(item){
          tours.push(item.siteTour);
        })
        tours = tours.filter((li, idx, self) => self.map(itm => itm.id).indexOf(li.id) === idx)
        console.log(tours);
        res.status(200).json(tours);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req===>', req.body);
    Country.create(req.body).then(function(CountryInstance){
        res.status(200).json(CountryInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Country.update(req.body, {
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
    Country.destroy({
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
