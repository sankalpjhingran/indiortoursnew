"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCost = sequelize.define("TourCost", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          associate: function(models) {
            TourCost.belongsTo(models.Tour);
          }
        }
      }
  );
  return TourCost;
};
