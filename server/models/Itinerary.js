"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define("Itinerary", {
        itnid: {
            type: DataTypes.STRING
        },
        day: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT('medium')
        },
    });

    Itinerary.associate = function(models) {
        Itinerary.belongsTo(models.Tour, {
            as: 'itinerary',
            foreignKey: 'tour_id'
        });
    };

    return Itinerary;
};