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
                'Users', // name of Target model
                'gender', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'dateofbirth', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'addressline1', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'addressline2', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'addresscity', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'addresstate', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
            queryInterface.addColumn(
                'Users', // name of Target model
                'addresscountry', // name of the key we're adding
                {
                    type: Sequelize.STRING,
                }
            ),
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