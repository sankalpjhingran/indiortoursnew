'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Countries', // name of Source model
      'continent_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'Continents', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Countries', // name of Source model
      'continent_id' // key we want to remove
    );
  }
};
