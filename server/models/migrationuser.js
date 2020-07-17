'use strict';
module.exports = (sequelize, DataTypes) => {
  var MigrationUser = sequelize.define('MigrationUser', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    
    /*
    vendor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'Vendor',
        key: 'vendorid'
      }
    }
    */
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MigrationUser;
};
