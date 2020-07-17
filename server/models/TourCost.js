"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCost = sequelize.define("TourCost", {
        costcategory: {type: DataTypes.STRING}, // Picklist with values, normal, supplement, addtnl service supplements
        costitem: {type: DataTypes.STRING}, //This will be individual cost items like per person cost, domestic fare, intl fare etc, will be displayed as picklist on UI
        cost: {type: DataTypes.DECIMAL(4,2)}, //Existing, The cost in currency
        note: {type: DataTypes.TEXT('medium')}, //Existing

        tourtype: {type: DataTypes.STRING}, //Existing, This will be a picklist with values, budget, economy, superior, elegant, luxury
        startdate: {type: DataTypes.DATE},
        enddate: {type: DataTypes.DATE},
        individualcostsjson : {type: DataTypes.JSON},
        
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

  TourCost.associate = function(models) {
    TourCost.belongsTo(models.Tour, {as: 'tourcost', foreignKey: 'tour_id'});
  };

  return TourCost;
};
