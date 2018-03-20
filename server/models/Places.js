"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define("Place", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
      }
  );
  Place.associate = function(models) {
    Place.belongsTo(models.Location, {as: 'places', foreignKey: 'location_id'});
  };
  return Place;
};
