"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define("Country", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
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

  Country.associate = function (models) {
    //Country.belongsTo(models.Continent, {as: 'countryContinents', foreignKey: 'country_id'});
    Country.hasMany(models.Location, {foreignKey: 'country_id'});
  };
  return Country;
};
