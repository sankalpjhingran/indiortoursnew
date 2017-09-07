'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");
//var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config');
var db        = {};

/*
//Setting up the config
var sequelize = new Sequelize(config.development.url, {
    host: 'localhost',
    port: config.development.port,
    dialect: 'mysql',
    logging: console.log,
});
*/
//var sequelize;
  //Setting up the config
  var sequelize = new Sequelize('postgres://eqyftdnqqogabd:d1f36b24ce55df93fa72221961b1a9f9328600fceaec3b081c223834a6a65b9b@ec2-23-23-222-147.compute-1.amazonaws.com:5432/de5ml9a574vklj', {
    port: pe.PORT,
    dialect: 'postgres',
    dialectOptions: { ssl: true },
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});


//Checking connection status
sequelize.authenticate()
    .then(function () {
        console.log("Connected to MySql!");
    })
    .catch(function (err) {
        console.log("Connection Unsuccessful " + err);
        sequelize.authenticate().then(function(){
          console.log('Attempting again...');
        });
    })
    .done();

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
 });

/*
  setTimeout(function() {
      console.log('In setTimeout===>');
      assignRelationships;
  }, 10000);
*/

/*
var assignRelationships = function(m) {
  console.log('Calling assignRelationships===>');
  m.ParentTour.hasMany(m.Tour);
  m.Tour.belongsTo(m.ParentTour);

  m.Tour.hasMany(m.Itinerary);
  m.Itinerary.belongsTo(m.Tour);

  m.Tour.hasMany(m.TourCost);
  m.TourCost.belongsTo(m.Tour);

  m.MoreInfo.hasMany(m.MoreInfoItem);
  m.MoreInfoItem.belongsTo(m.MoreInfo);

  m.Tour.hasMany(m.AdditionalServiceSupplements);
  m.AdditionalServiceSupplements.belongsTo(m.Tour);

  m.City.hasMany(m.Tour);
  m.Tour.hasMany(m.City);

  m.Hotel.belongsTo(m.City);
  m.HotelOptions.belongsTo(m.Tour);
  m.HotelOptions.belongsTo(m.City);
  m.HotelOptions.belongsTo(m.Hotel);


  m.Tour.hasMany(m.HotelOptions);
  m.Tour.belongsTo(m.MoreInfo);

  m.MoreInfoItem.hasMany(m.MoreInfoItemDetails);
  m.MoreInfoItemDetails.belongsTo(m.MoreInfoItem);

}(module.exports);
*/

// export connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
