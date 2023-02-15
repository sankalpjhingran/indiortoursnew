'use strict';
//Including dependency
const path = require('path');
let fs = require("fs");
const Sequelize = require('sequelize');
const crypto = require('crypto');
const DataTypes = require("sequelize");
const fsPath = require('fs-path');
fs = require('fs');
const config = require('../config/config2.js');
const db = {};

const schedule = require('node-schedule');
const request = require('request');
const parser = require('cron-parser');

const interval = parser.parseExpression('0 0-23 * * *');

const j = schedule.scheduleJob('0 0-23 * * *', function () {
    var rates = fs.readFileSync('./config/conversionrates.json');
    var jsonContent;

    if (rates) {
        jsonContent = JSON.parse(rates);
    }
    var currentdatetime = Math.round((new Date()).getTime() / 1000);
    console.log(currentdatetime);

    var hoursDifference = 0;

    if (jsonContent) {
        console.log(jsonContent.timestamp);
        hoursDifference = (currentdatetime - jsonContent.timestamp) / (60 * 60);
    }

    if (hoursDifference > 5) {
        request('https://openexchangerates.org/api/latest.json?app_id=a124cc01fa2144478fb93a3d07864966', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fsPath.writeFile('./config/conversionrates.json', body, 'utf8', function (err, res) {
                    if (err) console.log('error', err);
                });
            }
        })
    } else {
        console.log('Diff is less than 1===>');
    }
});

request('https://openexchangerates.org/api/currencies.json', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const fs = require('fs');
        fsPath.writeFile('./config/currencies.json', body, 'utf8', function(err, res) {
            if (err) console.log('error', err);
        });

    }
})

request('http://www.geoplugin.net/json.gp', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body)
    }
})


//Setting up the config
console.log('Starting sequelize connection...');
const sequelize = new Sequelize(config.db.DB_NAME, config.db.USERNAME, config.db.PASSWORD, {
    host: 'localhost',
    // port: config.db.port,
    dialect: config.db.dialect,
    logging: console.log,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        timestamps: true
    },
});


//Checking connection status
sequelize.authenticate()
    .then(function() {})
    .catch(function(err) {
        console.log("Connection Unsuccessful " + err);
        sequelize.authenticate().then(function() {
            console.log('Attempting again...');
        });
    });

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// export connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;