"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TagAssignment = sequelize.define("TagAssignment", {
      }
  );

  TagAssignment.associate = function (models) {
    models.Tag.belongsToMany(models.Tour, { through: TagAssignment, as: 'tagTour'});
    models.Tour.belongsToMany(models.Tag, { through: TagAssignment, as: 'tourTags'});
  };

  return TagAssignment;
};
