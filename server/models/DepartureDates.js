"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var DepartureDates = sequelize.define("DepartureDates", {
        month: {type: DataTypes.STRING},
        year: {type: DataTypes.INTEGER},
        dates: {type: DataTypes.STRING},
        noteone: {type: DataTypes.TEXT('medium')},
        notetwo: {type: DataTypes.TEXT('medium')},
      }
  );

  DepartureDates.associate = function(models) {
    DepartureDates.belongsTo(models.Tour, {as: 'departuredates', foreignKey: 'tour_id'});
  }
  return DepartureDates;
};
