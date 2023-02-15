"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const TourGroup = sequelize.define("TourGroup", {});

    TourGroup.associate = function(models) {
        models.Tour.belongsToMany(models.ParentTour, {
            through: TourGroup,
            as: 'tourGroup'
        });
        models.ParentTour.belongsToMany(models.Tour, {
            through: TourGroup,
            as: 'childTours'
        }, {
            onDelete: 'cascade'
        });
    };
    return TourGroup;
};