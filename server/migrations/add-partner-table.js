'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Partners', {
            name: {
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};