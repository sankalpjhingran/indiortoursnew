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
                                  'Images',
                                  'description',
                                  {
                                      type: Sequelize.TEXT('medium')
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
