"use strict";

var sequelize  = require('../models/index');


module.exports = (sequelize, DataTypes) => {
  var Vendor = sequelize.define("Vendor", {
        name: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        email : {type: DataTypes.STRING},
        mailingstreet : {type: DataTypes.STRING},
        mailingcity : {type: DataTypes.STRING},
        mailingcountry: {type: DataTypes.STRING},
        mailingzip : {type: DataTypes.STRING},
        verified: {type: DataTypes.BOOLEAN, defaultValue: false}
      });

      Vendor.associate = function(models){
        //Vendor.hasMany(models.Tour, {as: 'tours'});
      }
      return Vendor;
};
