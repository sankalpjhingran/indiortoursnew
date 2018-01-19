var models  = require('../models/index');
var Tour = models.Tour;
var Location = models.Location;
var Notes = models.Notes;
var Hotel = models.Hotel;
var TourHotel = models.TourHotel;
var TourLocation = models.TourLocation;


var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Tour.sync();
  },

  index(req, res) {
    console.log('Calling index method...');
    Tour.findAll()
      .then(function (authors) {
        console.log(authors);
        res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getTourWithLocations(req, res){
        queryVars = req.query;
        Tour.findAll({
          where: {id : queryVars.id},
          include: [{ association : 'siteLocation' }]
          })
          .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getTourWithRelatedModels(req, res){
        queryVars = req.query;
        Tour.findAll({
          where: {id : queryVars.id},
            include: [{ association : 'siteLocation' }, { association : 'accomodationHotel'}, { association : 'tourcost' }, { association : 'itinerary' }, { association : 'tourNote' }, {association: 'departuredates'}]
          })
          .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getAllToursWithLocations(req, res){
        queryVars = req.query;
        Tour.findAll({
          include: [{ association : 'siteLocation'}]
          })
          .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  searchAllToursWithLocations(req, res){
        queryVars = req.query;
        console.log('Request Query Vars====> ');
        console.log(queryVars);
        Tour.findAll({
          where: { [Op.or]: {id: queryVars.id, name: queryVars.name}},
          include: [{ association : 'siteLocation', where: { [Op.or]: { city : queryVars.location, city: {[Op.ne]:null} }}}]
          })
          .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  getAllToursWithLocationsAndHotels(req, res){
        queryVars = req.query;
        Tour.findAll({
          include: [{ association : 'siteLocation' }, {association: 'accomodationHotel'}, {association: 'tourNote'}]
          })
          .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          });
  },

  showByName(req, res) {
    console.log('Calling index method...');
    queryVars = req.query;
    //console.log(Op);
    Tour.findAll({ where: {
                          name : queryVars.name
                        }
                      })
      .then(function (authors) {
        console.log(authors);
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
    console.log(req.body);
    Tour.create(req.body, {include: [{ association : 'siteLocation' }, { association : 'accomodationHotel' }, {association: 'tourNote'}]})
    .then(function(tourInstance){

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
                console.log(noteInst);
                tourInstance.setTourNote(noteInst);
          });
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
                console.log('Location Instance====>');
                console.log(locationInst);
                tourInstance.setSiteLocation(locationInst);
          });
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
                tourInstance.setAccomodationHotel(hotels);
          });
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
    })
    .then(function (updatedRecords) {
      Tour.findById(req.body.id, {include: [{ association : 'siteLocation' }, { association : 'accomodationHotel' }, {association: 'tourNote'}]})
      .then(function (updatedTour) {
        console.log('Updated Tour is===> ');
        console.log(updatedTour);

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
                  console.log(noteInst);
                  updatedTour.setTourNote(noteInst);
            });
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
    console.log(req);
    queryVars = req.query;
    Tour.destroy({
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
