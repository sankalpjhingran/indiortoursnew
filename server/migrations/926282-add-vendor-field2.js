'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
      return Promise.all( [
        queryInterface.addColumn(
          'Bookings', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Continents', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Countries', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'DepartureDates', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Hotels', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Images', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Itineraries', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'ItineraryDetails', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Leads', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Notes', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'ParentTours', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Places', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Regions', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Tags', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TagAssignments', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'Tours', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TourCosts', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TourGroups', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TourHotels', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TourLocations', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'TourNotes', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),
        queryInterface.addColumn(
          'AdditionalServiceSupplements', // name of Target model
          'vendorid', // name of the key we're adding
          {
            type: Sequelize.STRING,
          }
        ),

      ])
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
