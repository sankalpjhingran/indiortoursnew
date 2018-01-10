"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourNote = sequelize.define("TourNote", {
      }
  );

  TourNote.associate = function(models) {
    models.Notes.belongsToMany(models.Tour, { through: TourNote, as: 'notesTour'});
    models.Tour.belongsToMany(models.Notes, { through: TourNote, as: 'tourNote'}, { onDelete: 'cascade' });
  };
  return TourNote;
};
