"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const ItineraryDetails = sequelize.define("ItineraryDetails", {
        itndetailid: {
            type: DataTypes.STRING
        },
        day: {
            type: DataTypes.STRING
        },
        daydescription: {
            type: DataTypes.TEXT('medium')
        }
    });

    ItineraryDetails.associate = function(models) {
        ItineraryDetails.belongsTo(models.Itinerary, {
            foreignKey: 'itn_id'
        });
    };

    return ItineraryDetails;
};