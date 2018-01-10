"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCost = sequelize.define("TourCost", {
        name: {type: DataTypes.STRING},
        tourtype: {type: DataTypes.STRING},
        cost: {type: DataTypes.STRING},
        airfare: {type: DataTypes.STRING},
        costtype: {type: DataTypes.STRING}, //this is to differentiate between normal cost and AdditionalServiceSupplements
        note: {type: DataTypes.TEXT('medium')},
        additionalservicesupplement: {type: DataTypes.BOOLEAN}
      }
  );

  TourCost.associate = function(models) {
    TourCost.belongsTo(models.Tour, {as: 'tourcost', foreignKey: 'tour_id'});
  };

  return TourCost;
};
