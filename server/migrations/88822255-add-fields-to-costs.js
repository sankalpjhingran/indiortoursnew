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
          'TourCosts', // name of Target model
          'startdate', // name of the key we're adding
          {
            type: Sequelize.DATE,
          }
        ),
        queryInterface.addColumn(
          'TourCosts', // name of Target model
          'enddate', // name of the key we're adding
          {
            type: Sequelize.DATE,
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
