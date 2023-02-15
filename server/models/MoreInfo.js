"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const MoreInfo = sequelize.define("MoreInfo", {
        name: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                MoreInfo.hasMany(models.MoreInfoItem, {
                    foreignKey: 'moreinfo_id'
                });
            }
        }
    });

    MoreInfo.associate = function(models) {
        MoreInfo.hasMany(models.MoreInfoItem, {
            foreignKey: 'moreinfo_id'
        });
    };

    return MoreInfo;
};