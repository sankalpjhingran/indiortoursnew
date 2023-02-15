'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'Partners', // name of Target model
            'partnerContact', // name of the key we're adding
            {
                type: Sequelize.INTEGER(11),
                foreignKey: 'partnerContact'
            },
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Users', // name of Source model
                    key: 'id',
                    foreignKey: 'partnerContact'
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