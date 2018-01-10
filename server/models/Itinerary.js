"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Itinerary = sequelize.define("Itinerary", {
        itnid: {type: DataTypes.STRING},
        day: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
      }
  );

  Itinerary.associate = function(models) {
    Itinerary.belongsTo(models.Tour, {as: 'itinerary', foreignKey: 'tour_id'});
    Itinerary.hasMany(models.ItineraryDetails, {foreignKey: 'itn_id'});
  };

  return Itinerary;
};
