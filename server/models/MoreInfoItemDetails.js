"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfoItemDetails = sequelize.define("MoreInfoItemDetails", {
        name: {type: DataTypes.STRING},
        
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
      },
      {
        classMethods:
        {
          associate: function(models) {
            MoreInfoItemDetails.belongsTo(models.MoreInfoItem, {foreignKey: 'moreinfoitem_id'});
          }
        }
      }
  );

  MoreInfoItemDetails.associate = function(models) {
    MoreInfoItemDetails.belongsTo(models.MoreInfoItem, {foreignKey: 'moreinfoitem_id'});
  };

  return MoreInfoItemDetails;
};
