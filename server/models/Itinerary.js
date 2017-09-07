"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Itinerary = sequelize.define("Itinerary", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          associate: function(models) {
            Itinerary.belongsTo(models.Tour);
          }
        }
      }
  );
  return Itinerary;
};
