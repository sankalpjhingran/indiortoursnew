"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Continent = sequelize.define("Continent", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        isactive: {type: DataTypes.BOOLEAN},
        displayorder: {type: DataTypes.INTEGER},
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
        
        /*
        vendor_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Vendors',
            key: 'id'
          }
        }
        */
      }, {
      validate: {
        bothCoordsOrNone() {
          if ((this.latitude === null) !== (this.longitude === null)) {
            throw new Error('Require either both latitude and longitude or neither')
          }
        }
      }
  });

  Continent.associate = function (models) {
    Continent.hasMany(models.Country, {foreignKey: 'continent_id'});
    Continent.hasMany(models.Location, {foreignKey: 'continent_id'});
    //Continent.belongsTo(models.Vendor, {foreignKey: 'vendor_id'});
    Continent.hasMany(models.ContinentTranslation, { as: "continent_translations" });
  };

  return Continent;
};
