'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");
var fsPath = require('fs-path');
var fs = require('fs');
//var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config2.js');
var db        = {};


var schedule = require('node-schedule');
var request = require('request');
var parser = require('cron-parser');

var interval = parser.parseExpression('0 0-23 * * *');
console.log('Next Fetch: ', interval.next().toString());

var j = schedule.scheduleJob('0 0-23 * * *', function(){
  var rates = fs.readFileSync('./config/conversionrates.json');
  var jsonContent;

  if(rates) {
      console.log('Rates are valid====>');
      jsonContent = JSON.parse(rates);
  }
  var currentdatetime = Math.round((new Date()).getTime() / 1000);
  console.log(currentdatetime);

  var hoursDifference = 0;

  if(jsonContent) {
    console.log(jsonContent.timestamp);
    console.log('JSON content is valid====>');
    hoursDifference = (currentdatetime - jsonContent.timestamp)/(60*60);
  }
  console.log('Time diff in hours====> ' + hoursDifference);

  if(hoursDifference > 5) {
    console.log('Diff is greater than 1...overwriting conversion rates===>');
    request('https://openexchangerates.org/api/latest.json?app_id=a124cc01fa2144478fb93a3d07864966', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fsPath.writeFile('./config/conversionrates.json', body, 'utf8');
         }
    })
  } else {
    console.log('Diff is less than 1===>');
  }
});

request('https://openexchangerates.org/api/currencies.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var fs = require('fs');
        fsPath.writeFile('./config/currencies.json', body, 'utf8');
     }
})

request('http://www.geoplugin.net/json.gp', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
     }
})

//Setting up the config
console.log('Starting sequelize connection...');

console.log(config);

var sequelize = new Sequelize(config.db.DB_NAME, config.db.USERNAME, config.db.PASSWORD, {
    host: 'localhost',
    port: config.db.port,
    dialect: config.db.dialect,
    logging: console.log,
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
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

  console.log(db);

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
 });

// export connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
