'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:

          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
          */
        return queryInterface.changeColumn(
            'TourCosts', // name of Target model
            'cost', // name of the key we're adding
            {
                type: Sequelize.DECIMAL(4, 2),
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