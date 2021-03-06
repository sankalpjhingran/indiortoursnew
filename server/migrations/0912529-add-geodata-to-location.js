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
        'Locations', // name of Target model
        'latitude', // name of the key we're adding
        {
          type: Sequelize.DECIMAL(10, 8),
          allowNull: true,
          defaultValue: null
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
