"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define("Place", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        type: {type: DataTypes.STRING},
        charset: 'utf8mb4',
        collate: 'utf8_general_ci',
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

  Place.associate = function(models) {
    Place.belongsTo(models.Location, {as: 'places', foreignKey: 'location_id'});
  };
  return Place;
};
