'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'Users', // name of Target model
            'partnerId', // name of the key we're adding
            {
                type: Sequelize.UUID
            },
            {
                references: {
                    model: 'Partners', // name of Source model
                    key: 'id',
                    foreignKey: 'partnerId'
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