"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const TourNote = sequelize.define("TourNote", {});

    TourNote.associate = function(models) {
        models.Notes.belongsToMany(models.Tour, {
            through: TourNote,
            as: 'notesTour'
        });
        models.Tour.belongsToMany(models.Notes, {
            through: TourNote,
            as: 'tourNote'
        }, {
            onDelete: 'cascade'
        });
    };
    return TourNote;
};