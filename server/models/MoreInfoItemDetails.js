"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const MoreInfoItemDetails = sequelize.define("MoreInfoItemDetails", {
        name: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                MoreInfoItemDetails.belongsTo(models.MoreInfoItem, {
                    foreignKey: 'moreinfoitem_id'
                });
            }
        }
    });

    MoreInfoItemDetails.associate = function(models) {
        MoreInfoItemDetails.belongsTo(models.MoreInfoItem, {
            foreignKey: 'moreinfoitem_id'
        });
    };

    return MoreInfoItemDetails;
};