"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Region = sequelize.define("Region", {
        name: {type: DataTypes.STRING},
        country:{type: DataTypes.STRING},
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
        }

        /*
        vendor_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Vendor',
            key: 'vendorid'
          }
        }
        */
  });

  Region.associate = function (models) {
    //Country.belongsTo(models.Continent, {as: 'countryContinents', foreignKey: 'country_id'});
    Region.hasMany(models.Location, {foreignKey: 'region_id'}, { onDelete: 'cascade' });
  };
  return Region;
};
