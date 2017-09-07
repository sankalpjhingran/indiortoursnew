"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Hotel = sequelize.define("Hotel", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            //Hotel.belongsTo(models.City);
          }
          */
        }
      }
  );
  return Hotel;
};
