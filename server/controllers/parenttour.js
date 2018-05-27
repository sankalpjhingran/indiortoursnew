'use strict';

var models  = require('../models/index');
var ParentTour = models.ParentTour;
var Tour = models.Tour;

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      ParentTour.sync();
  },

  index(req, res) {
    ParentTour.findAll({
      include: [{  model: Tour, as: 'childTours' }],
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
    ParentTour.findById(req.query.id, {include: [{  model: Tour, as: 'childTours', where: {isactive:true} }]})
    .then(function (author) {
      console.log(author.childTours);
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req.body====>');
    console.log(req.body);
    ParentTour.create(req.body, {include: [{ association : 'childTours' }]})
    .then(function(tourInstance){

      if(req.body.tours && req.body.tours.length){
          let tourids = [];
          req.body.tours.forEach(function(tour){
            tourids.push({id:tour.id});
          });

          console.log('Calling Note.findAll');
          Tour.findAll({
            where: {
              [Op.or]: tourids
            }
          }).then(function(tourInst){
                console.log('Note Instance====>');
                tourInstance.setChildTours(tourInst);
          });
      }else{
        tourInstance.setChildTours([]);
      }
      res.status(200).json(tourInstance);
    })
    .catch(function (error){
      console.log(error);
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    ParentTour.update(req.body, {
      where: {
        id: req.body.id
      },
    })
    .then(function (updatedRecords) {
      ParentTour.findById(req.body.id, {include: [{ association : 'childTours' }]})
      .then(function (updatedTour) {
        console.log('Updated Tour is===> ');

        if(req.body.tours.length){
            let tourids = [];
            req.body.tours.forEach(function(tour){
              tourids.push({id:tour.id});
            });

            console.log('Calling Tour.findAll');
            Tour.findAll({
              where: {
                [Op.or]: tourids
              }
            }).then(function(tourInst){
                  console.log('Tour Instance====>');
                  console.log(tourInst);
                  updatedTour.setChildTours(tourInst);
            });
        }else{
            updatedTour.setChildTours([]);
        }
        res.status(200).json(updatedRecords);
      })
    .catch(function (error){
      console.log(error);
      res.status(500).json(error);
      });
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Delete an existing author by the unique ID using model.destroy()
  delete(req, res) {
    console.log(req);
    let queryVars = req.query;
    ParentTour.destroy({
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
