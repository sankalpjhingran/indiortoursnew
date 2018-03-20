module.exports = {
  up: (queryInterface, Sequelize) => {
    // Order belongsTo Customer
    return queryInterface.addColumn(
      'Locations', // name of Source model
      'location_id', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Places', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Places', // name of Target model
          'place_id', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Locations', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Order hasMany Product
        return queryInterface.addColumn(
          'Products', // name of Target model
          'OrderId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Orders', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'CustomerId' // key we want to remove
    )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Orders', // name of the Target model
          'PaymentId' // key we want to remove
        );
      })
      .then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          'Products', // name of the Target model
          'OrderId' // key we want to remove
        );
      });
  }
};
