"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourLocation = sequelize.define("TourLocation", {
      }
  );

  TourLocation.associate = function(models) {
    models.Location.belongsToMany(models.Tour, { through: TourLocation, as: 'siteTour'});
    models.Tour.belongsToMany(models.Location, { through: TourLocation, as: 'siteLocation'}, { onDelete: 'cascade' });
  };

  return TourLocation;
};
