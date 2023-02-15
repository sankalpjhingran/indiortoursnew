"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        type: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        },
        filename: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        },
        parentobjectid: {
            type: DataTypes.STRING
        },
        parentobjectname: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT('medium')
        }
    });
    return Image;
};