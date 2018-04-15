"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define("Location", {
        city: {type: DataTypes.STRING},
        state: {type: DataTypes.STRING},
        country:{type: DataTypes.STRING},
        continent:{type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
      }
  );

  Location.associate = function (models) {
    Location.hasMany(models.Hotel, {as: 'locationhotels', foreignKey: 'location_id'});
    Location.hasMany(models.Place, {as: 'places', foreignKey: 'location_id'});
  };

  return Location;
};
