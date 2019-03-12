'use strict';

var models  = require('../models/index');
var Tour = models.Tour;
var Location = models.Location;
var Notes = models.Notes;
var Hotel = models.Hotel;
var TourHotel = models.TourHotel;
var TourLocation = models.TourLocation;
var Tag = models.Tag;
var redisClient = require('../config/redis-client');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Tour.sync();
  },

  index(req, res) {
    console.log('Calling index method...');
    Tour.findAll({
      order: [
              ['createdAt', 'DESC'],
      ]
    })
      .then(function (authors) {
        res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getToursForRegion(req, res){
        let queryVars = req.query;
        Tour.findAll({
          where: {id : queryVars.id},
          include: [
            { association : 'siteLocation', attributes: ['id', 'city', 'state', 'country', 'continent', 'latitude', 'longitude', 'elevation'] }
          ]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getTourWithLocations(req, res){
        let queryVars = req.query;
        Tour.findAll({
          where: {id : queryVars.id},
          include: [{ association : 'siteLocation' }]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getAllToursWithItineraries(req, res){
        Tour.findAll({
          order: [
                  ['createdAt', 'DESC'],
          ],
          include: [{ association : 'itinerary'}]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getAllToursWithCosts(req, res){
        Tour.findAll({
          order: [
                  ['createdAt', 'DESC'],
          ],
          include: [{ association : 'tourcost'}]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getTourWithRelatedModels(req, res){
        let queryVars = req.query;

        redisClient.get('getTourWithRelatedModels:' + queryVars.id, function(error, tours) {
            if (error) {throw error;}
            if(tours) {
              console.log('Available in cache so not querying again');
              res.status(200).json(tours);
            } else {
              Tour.findAll({
                where   : {id : queryVars.id},
                include : [{ association : 'siteLocation' }, { association : 'accomodationHotel'}, { association : 'tourcost' }, { association : 'itinerary' }, { association : 'tourNote' }, {association: 'departuredates'}]
              })
              .then(function (authors) {
                console.log('Not available in cache so will set in cache first');
                redisClient.set('getTourWithRelatedModels:' + queryVars.id, JSON.stringify(authors), 'EX', 10*60, function (error) {
                  if (error) {throw error;}
                });
                res.status(200).json(authors);
              })
              .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
              })
            }
        });
  },

  getAllToursWithLocations(req, res){
          redisClient.get('getAllToursWithLocations:', function(error, tours) {
              if (error) {throw error;}

              if(tours) {
                console.log('Available in cache so not querying again');
                res.status(200).json(tours);
              } else {
                Tour.findAll({
                  where: {showonhomepage: true, isactive : true},
                  order: [
                    Sequelize.fn('isnull', Sequelize.col('order')),
                    ['order', 'ASC']
                ],
                  attributes: ['id', 'order', 'name', 'slug', 'tourtype', 'days', 'nights', 'price', 'createdAt', 'updatedAt', 'offerprice', 'ismicetour', 'micecategory', 'isactive', 'showonhomepage'],
                  include: [{ association : 'siteLocation', attributes: ['id', 'city', 'state', 'country', 'continent', 'latitude', 'longitude', 'elevation'] }]
                })
                .then(function (authors) {
                  console.log('Not available in cache so will set in cache first');
                  redisClient.set('getAllToursWithLocations:', JSON.stringify(authors), 'EX', 10*60, function (error) {
                    if (error) {throw error;}
                  });
                  res.status(200).json(JSON.stringify(authors));
                })
                .catch(function (error) {
                  console.log(error);
                  res.status(500).json(error);
                })
              }
          });
  },

  searchAllToursWithLocations(req, res){
        let queryVars = req.query;
        console.log('Request Query Vars====> ');
        console.log(queryVars);
        Tour.findAll({
          where: { [Op.or]: {id: queryVars.id, name: queryVars.name}},
          include: [{ association : 'siteLocation', where: { [Op.or]: { city : queryVars.location, city: {[Op.ne]:null} }}}]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getAllToursWithLocationsAndHotels(req, res){
        let queryVars = req.query;
        console.log(queryVars);
        Tour.findAll({
            include: [{ association : 'siteLocation' }, {association: 'accomodationHotel'}, {association: 'tourNote'}],
            order: [['createdAt', 'DESC']]
          })
          .then(function (authors) {
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  showByName(req, res) {
    console.log('Calling index method...');
    let queryVars = req.query;
    //console.log(Op);
    Tour.findAll({ where: {
                          name : queryVars.name
                        }
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
    Tour.findById(req.query.tourid, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log('req.body====>');
    Tour.create(
      req.body,
      {
        include: [{ association : 'siteLocation' }, { association : 'accomodationHotel' }, {association: 'tourNote'}, {association: 'tourTags'} ],
        individualHooks: true
      }
    )
    .then(function(tourInstance){

      if(req.body.notes && req.body.notes.length){
          let noteids = [];
          req.body.notes.forEach(function(note){
            noteids.push({id:note.id});
          });

          console.log('Calling Note.findAll');
          Notes.findAll({
            where: {
              [Op.or]: noteids
            }
          }).then(function(noteInst){
                console.log('Note Instance====>');
                tourInstance.setTourNote(noteInst);
          });
      }else{
        tourInstance.setTourNote([]);
      }

      if(req.body.locations && req.body.locations.length){
          console.log(req.body.locations);
          let locationids = [];
          req.body.locations.forEach(function(location){
            locationids.push({id:location.id});
          });

          Location.findAll({
            where: {
              [Op.or]: locationids
            }
          }).then(function(locationInst){
                console.log('Location Instance====>');
                tourInstance.setSiteLocation(locationInst);
          });
      }else{
          tourInstance.setSiteLocation([]);
      }

      if(req.body.hotels && req.body.hotels.length){
          let hotelIds = [];
          req.body.hotels.forEach(function(hotel){
            hotelIds.push({id:hotel.id});
          });

          Hotel.findAll({
            where: {
              [Op.or]: hotelIds
            }
          }).then(function(hotels){
                tourInstance.setAccomodationHotel(hotels);
          });
      }else{
          tourInstance.setAccomodationHotel([]);
      }

      if(req.body.tags && req.body.tags.length){
          let tagIds = [];
          let newTags = [];

          req.body.tags.forEach(function(tag){
              if(tag.id){
                  tagIds.push({id:tag.id});
              }else {
                  newTags.push({name:tag});
              }
          });

          Tag.bulkCreate(newTags).then(function(TagInstances){
              TagInstances.forEach(function(TagInstance){
                  tagIds.push({id:TagInstance.id});
              });

              Tag.findAll({
                where: {
                  [Op.or]: tagIds
                }
              }).then(function(tags){
                    tourInstance.setTourTags(tags);
              });
          })
          .catch(function (error){
            res.status(500).json(error);
          })
      }else {
          tourInstance.setTourTags([]);
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
    Tour.update(req.body, {
      where: {
        id: req.body.id
      },
      individualHooks: true
    })
    .then(function (updatedRecords) {
      Tour.findById(req.body.id, {include: [{ association : 'siteLocation' }, { association : 'accomodationHotel' }, {association: 'tourNote'}, {association: 'tourTags'}]})
      .then(function (updatedTour) {
        console.log('Updated Tour is===> ');

        if(req.body.notes.length){
            let noteids = [];
            req.body.notes.forEach(function(note){
              noteids.push({id:note.id});
            });

            console.log('Calling Note.findAll');
            Notes.findAll({
              where: {
                [Op.or]: noteids
              }
            }).then(function(noteInst){
                  console.log('Note Instance====>');
                  updatedTour.setTourNote(noteInst);
            });
        }else{
            updatedTour.setTourNote([]);
        }

        if(req.body.locations.length){
            let locationids = [];
            req.body.locations.forEach(function(location){
              locationids.push({id:location.id});
            });

            Location.findAll({
              where: {
                [Op.or]: locationids
              }
            }).then(function(locationInst){
                  updatedTour.setSiteLocation(locationInst);
            });
        }else{
            updatedTour.setSiteLocation([]);
        }


        if(req.body.hotels.length){
            let hotelIds = [];
            req.body.hotels.forEach(function(hotel){
              hotelIds.push({id:hotel.id});
            });

            Hotel.findAll({
              where: {
                [Op.or]: hotelIds
              }
            }).then(function(hotels){
                  updatedTour.setAccomodationHotel(hotels);
            });
        }else{
            updatedTour.setAccomodationHotel([]);
        }

        if(req.body.tags && req.body.tags.length){
            let tagIds = [];
            let newTags = [];

            req.body.tags.forEach(function(tag){
                if(tag.id){
                    tagIds.push({id:tag.id});
                }else {
                    newTags.push({name:tag});
                }
            });

            Tag.bulkCreate(newTags).then(function(TagInstances){
                TagInstances.forEach(function(TagInstance){
                    tagIds.push({id:TagInstance.id});
                });

                Tag.findAll({
                  where: {
                    [Op.or]: tagIds
                  }
                }).then(function(tags){
                      updatedTour.setTourTags(tags);
                });
            })
            .catch(function (error){
              res.status(500).json(error);
            })
        }else {
            updatedTour.setTourTags([]);
        }

      });

      res.status(200).json(updatedRecords);

    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Delete an existing author by the unique ID using model.destroy()
  delete(req, res) {
    let queryVars = req.query;
    Tour.destroy({
      where: {
        id: queryVars.id
      },
      individualHooks: true
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
