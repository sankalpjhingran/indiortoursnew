"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var City = sequelize.define("City", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          associate: function(models) {
            City.belongsToMany(models.Tour, {
              as: 'cities',
              through: 'TourCities',
              foreignKey: 'cityid',
            });
          }
        }
      }
  );
  return City;
};
