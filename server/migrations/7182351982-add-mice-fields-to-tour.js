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
        'Tours', // name of Target model
        'ismicetour', // name of the key we're adding
        {
          type: Sequelize.BOOLEAN,
        },
        'micecategory',
        {
          type: Sequelize.STRING, 
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
