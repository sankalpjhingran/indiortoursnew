'use strict';
module.exports = (sequelize, DataTypes) => {
    const MigrationUser = sequelize.define('MigrationUser', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return MigrationUser;
};