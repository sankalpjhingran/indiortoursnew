"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Partner = sequelize.define("Partner", {
        companyName: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        mailingstreet: {
            type: DataTypes.STRING
        },
        mailingcity: {
            type: DataTypes.STRING
        },
        mailingcountry: {
            type: DataTypes.STRING
        },
        mailingzip: {
            type: DataTypes.STRING
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });

    Partner.associate = models => {
        Partner.hasMany(models.User, {
            foreignKey: "partnerId"
        });

        Partner.belongsTo(models.User, {
            foreignKey: "partnerContact"
        });
    };
    return Partner;
};