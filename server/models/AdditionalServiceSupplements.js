"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const AdditionalServiceSupplements = sequelize.define("AdditionalServiceSupplements", {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        tourtype: {
            type: DataTypes.STRING
        },
        cost: {
            type: DataTypes.STRING
        },
    }, {
        classMethods: {
            associate: function (models) {
                AdditionalServiceSupplements.belongsTo(models.Tour);
            }

        }
    });

    AdditionalServiceSupplements.associate = function(models) {
        AdditionalServiceSupplements.belongsTo(models.Tour);
    };

    return AdditionalServiceSupplements;
};