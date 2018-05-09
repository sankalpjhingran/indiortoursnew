"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define("Location", {
        city: {type: DataTypes.STRING},
        state: {type: DataTypes.STRING},
        country:{type: DataTypes.STRING},
        continent:{type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        latitude: {
          type: DataTypes.DECIMAL(10, 8),
          allowNull: true,
          defaultValue: null,
          validate: { min: -90, max: 90 }
        },
        longitude: {
          type: DataTypes.DECIMAL(11, 8),
          allowNull: true,
          defaultValue: null,
          validate: { min: -180, max: 180 }
        },
        elevation: {type: DataTypes.INTEGER},
      }, {
      validate: {
        bothCoordsOrNone() {
          if ((this.latitude === null) !== (this.longitude === null)) {
            throw new Error('Require either both latitude and longitude or neither')
          }
        }
      }
  });

  Location.associate = function (models) {
    Location.hasMany(models.Hotel, {as: 'locationhotels', foreignKey: 'location_id'});
    Location.hasMany(models.Place, {as: 'places', foreignKey: 'location_id'});
  };

  return Location;
};
