"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var AdditionalServiceSupplements = sequelize.define("AdditionalServiceSupplements", {
        name: {type: DataTypes.STRING, primaryKey: true},
        tourtype: {type: DataTypes.STRING},
        cost: {type: DataTypes.STRING},
        
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
      },
      {
        classMethods:
        {
          associate: function(models) {
            AdditionalServiceSupplements.belongsTo(models.Tour);
          }

        }
      }
  );

  AdditionalServiceSupplements.associate = function(models) {
    AdditionalServiceSupplements.belongsTo(models.Tour);
  };

  return AdditionalServiceSupplements;
};
