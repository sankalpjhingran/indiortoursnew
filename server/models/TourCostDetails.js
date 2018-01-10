"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCostDetails = sequelize.define("TourCostDetails", {
        name: {type: DataTypes.STRING}
      },
      {
        classMethods:
        {
          associate: function(models) {
            TourCostDetails.belongsTo(models.Tour, {foreignKey: 'tour_id'});
          }
        }
      }
  );

  TourCostDetails.associate = function(models) {
    TourCostDetails.belongsTo(models.Tour, {foreignKey: 'tour_id'});
  };
  
  return TourCostDetails;
};
