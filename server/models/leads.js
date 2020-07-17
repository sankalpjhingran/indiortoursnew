"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Lead = sequelize.define("Lead", {
        title: {type: DataTypes.ENUM, values: ['Mr', 'Miss', 'Ms', 'Mrs'], allowNull: false},
        email: {type: DataTypes.STRING, validate: {isEmail: true}, allowNull: false},
        phone: {type: DataTypes.STRING, allowNul: false},
        name: {type: DataTypes.STRING},
        plannedarrival: {type: DataTypes.DATE},
        numdays: {type: DataTypes.INTEGER},
        numpeople: {type: DataTypes.INTEGER},
        preferredhoteltype: {type: DataTypes.ENUM, values: ['Budget', 'Economy', 'Elegant', 'Deluxe', 'Luxury']},
        message: {type: DataTypes.TEXT('medium')},
        attachment: {type: DataTypes.BLOB},
        relatedtotype: {type: DataTypes.STRING},
        relatedtoid: {type: DataTypes.STRING},
        
        /*
        vendor_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Vendor',
            key: 'vendorid'
          }
        }
        */
      }
  );
  return Lead;
};
