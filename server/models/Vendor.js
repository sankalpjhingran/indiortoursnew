"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Vendor = sequelize.define("Vendor", {
        vendorid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true
        },
        name: {type: DataTypes.STRING},
        phone: {type: DataTypes.STRING},
        email : {type: DataTypes.STRING},
        mailingstreet : {type: DataTypes.STRING},
        mailingcity : {type: DataTypes.STRING},
        mailingcountry: {type: DataTypes.STRING},
        mailingzip : {type: DataTypes.STRING}
      });
  return Vendor;
};
