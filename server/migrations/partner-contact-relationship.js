'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Partners', // name of Target model
            'partnerContact', // name of the key we're adding
            {
                type: Sequelize.INTEGER(11),
            },
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Users', // name of Source model
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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