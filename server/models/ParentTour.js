"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ParentTour = sequelize.define("ParentTour", {
        name: {type: DataTypes.STRING}
      }
  );

  ParentTour.associate = function(models) {
    ParentTour.hasMany(models.Tour, {as: 'tours', foreignKey: 'parenttour_id'});
  };

  return ParentTour;
};
