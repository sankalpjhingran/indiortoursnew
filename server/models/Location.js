"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define("Location", {
        city: {type: DataTypes.STRING},
        state: {type: DataTypes.STRING},
        country:{type: DataTypes.STRING},
        continent:{type: DataTypes.STRING},
        region:{type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        visible: {type: DataTypes.BOOLEAN, default: false},
        country_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Countries',
            key: 'id'
          }
        },
        region_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Regions',
            key: 'id'
          }
        },
        continent_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Continents',
            key: 'id'
          }
        },
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
    //Location.belongsTo(models.Country, {as: 'locationcountries', foreignKey: 'country_id'});
    //Location.belongsTo(models.Continent, {as: 'locationcontinent', foreignKey: 'continent_id'});
  };

  return Location;
};
