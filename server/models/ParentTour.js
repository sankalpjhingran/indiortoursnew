"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ParentTour = sequelize.define("ParentTour", {
        name: {type: DataTypes.STRING}
      },
      {
        classMethods:
        {
          associate: function(models) {
            ParentTour.hasMany(models.Tour, {foreignKey: 'parenttour_id'});
          }
        }
      }
  );

  ParentTour.associate = function(models) {
    ParentTour.hasMany(models.Tour, {foreignKey: 'parenttour_id'});
  };
  
  return ParentTour;
};
