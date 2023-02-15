"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const MoreInfoItem = sequelize.define("MoreInfoItem", {
        name: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                MoreInfoItem.belongsTo(models.MoreInfo, {
                    foreignKey: 'moreinfo_id'
                });
                MoreInfoItem.hasMany(models.MoreInfoItemDetails, {
                    foreignKey: 'moreinfoitem_id'
                });
            }
        }
    });

    MoreInfoItem.associate = function(models) {
        MoreInfoItem.belongsTo(models.MoreInfo, {
            foreignKey: 'moreinfo_id'
        });
        MoreInfoItem.hasMany(models.MoreInfoItemDetails, {
            foreignKey: 'moreinfoitem_id'
        });
    };

    return MoreInfoItem;
};