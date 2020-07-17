"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define("Image", {
        type: {type: DataTypes.STRING},
        path:{type: DataTypes.STRING},
        filename:{type: DataTypes.STRING},
        size:{type: DataTypes.STRING},
        parentobjectid:{type: DataTypes.STRING},
        parentobjectname:{type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')}
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
  return Image;
};
