'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:

          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
          */
        return queryInterface.addColumn(
            'DepartureDates', // name of Target model
            'repeatfrequency', // name of the key we're adding
            {
                type: Sequelize.ENUM('Day', 'Week', 'Month', 'Year'),
            }
        );

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