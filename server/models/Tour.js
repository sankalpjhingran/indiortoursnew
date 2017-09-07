"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Tour = sequelize.define("Tour", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          associate: function(models) {
            Tour.hasMany(models.Itinerary);
            //Tour.belongsTo(models.ParentTour);
            Tour.hasMany(models.TourCost);
            Tour.hasMany(models.AdditionalServiceSupplements);
            //Tour.hasMany(models.City);
            //Tour.belongsToMany(models.City, {through: 'Tour_City', foreignKey: 'Tour_name'});
            //Tour.hasMany(models.HotelOptions);
            //Tour.belongsTo(models.MoreInfo);

            Tour.belongsToMany(models.City, {
              as: 'tours',
              through: 'TourCities',
              foreignKey: 'tourid',
            });

          }
        }
      }
  );
  return Tour;
};
