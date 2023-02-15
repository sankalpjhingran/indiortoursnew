"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Notes = sequelize.define("Notes", {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        }, // values will be Includes, Excludes, Visa, Important Note, More Info
        description: {
            type: DataTypes.TEXT('medium')
        }
    });
    return Notes;
};