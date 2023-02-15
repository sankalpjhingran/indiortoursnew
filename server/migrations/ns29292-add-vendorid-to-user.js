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
            'Users', // name of Target model
            'vendor_id', // name of the key we're adding
            {
                type: Sequelize.INTEGER(11),
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