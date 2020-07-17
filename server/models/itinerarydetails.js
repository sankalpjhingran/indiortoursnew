"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ItineraryDetails = sequelize.define("ItineraryDetails", {
        itndetailid: {type: DataTypes.STRING},
        day: {type: DataTypes.STRING},
        daydescription: {type: DataTypes.TEXT('medium')},
        
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
            ItineraryDetails.belongsTo(models.Itinerary, {foreignKey: 'itn_id'});
          }
        }
      }
  );

  ItineraryDetails.associate = function(models) {
    ItineraryDetails.belongsTo(models.Itinerary, {foreignKey: 'itn_id'});
  };

  return ItineraryDetails;
};
