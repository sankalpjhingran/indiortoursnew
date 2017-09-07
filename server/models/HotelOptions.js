"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var HotelOptions = sequelize.define("HotelOptions", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            //HotelOptions.belongsTo(models.Tour);
            //HotelOptions.belongsTo(models.City);
            //HotelOptions.belongsTo(models.Hotel);
          }
          */
        }
      }
  );
  return HotelOptions;
};
