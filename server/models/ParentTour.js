"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ParentTour = sequelize.define("ParentTour", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            ParentTour.hasMany(models.Tour);
          }
          */
        }
      }
  );
  return ParentTour;
};
