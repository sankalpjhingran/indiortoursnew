'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");
//var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.js');
var db        = {};


//Setting up the config
console.log('Starting sequelize connection...');
var pe = process.env || process.NODE_ENV;
console.log('Printing pe');
console.log(pe);
if(pe.RDS_DB_NAME){
  var sequelize = new Sequelize(pe.RDS_DB_NAME, pe.RDS_USERNAME, pe.RDS_PASSWORD, {
      dialect: 'mysql',
      logging: console.log,
      host     : pe.RDS_HOSTNAME,
      port     : pe.RDS_PORT,
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        },
        timestamps: true
      },
  });
}else{
  var sequelize = new Sequelize(config.development.DB_NAME, config.development.USERNAME, config.development.PASSWORD, {
      host: 'localhost',
      port: config.development.port,
      dialect: 'mysql',
      logging: console.log,
      define: {
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        },
        timestamps: true
      },
  });
}

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

  console.log(db);

  Object.keys(db).forEach(function(modelName) {
    console.log('dbmodelname====>');
    console.log(db[modelName].associate);
    if (db[modelName].associate) {
      console.log('Creating association for:' +  modelName);
      db[modelName].associate(db);
    }
 });

// export connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
