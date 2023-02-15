'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:

          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
          */

        return [
            queryInterface.addColumn(
                'Bookings', // name of Target model
                'flightdetails', // name of the key we're adding
                {
                    type: Sequelize.JSON,
                }
            ),
            queryInterface.addColumn(
                'Bookings', // name of Target model
                'emergencycontact', // name of the key we're adding
                {
                    type: Sequelize.JSON,
                }
            )
        ]
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