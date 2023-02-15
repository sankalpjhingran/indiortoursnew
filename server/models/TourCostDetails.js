"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const TourCostDetails = sequelize.define("TourCostDetails", {
        name: {
            type: DataTypes.STRING
        }
    });

    TourCostDetails.associate = function(models) {
        //TourCostDetails.belongsTo(models.TourCost, {foreignKey: 'tourcost_id'});
    };

    return TourCostDetails;
};