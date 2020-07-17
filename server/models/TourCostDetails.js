"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCostDetails = sequelize.define("TourCostDetails", {
        name: {type: DataTypes.STRING},
        
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

  TourCostDetails.associate = function(models) {
    //TourCostDetails.belongsTo(models.TourCost, {foreignKey: 'tourcost_id'});
  };

  return TourCostDetails;
};
