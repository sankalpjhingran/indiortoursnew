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
            'ParentTours', // name of Target model
            'category', // name of the key we're adding
            {
                type: Sequelize.ENUM,
                primaryKey: false,
                values: ['Religious Tours', 'Adventure Tours', 'Indior Favorites'],
                defaultValue: 'Indior Favorites',
                allowNull: false
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