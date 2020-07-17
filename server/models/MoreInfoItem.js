"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfoItem = sequelize.define("MoreInfoItem", {
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
            MoreInfoItem.belongsTo(models.MoreInfo, {foreignKey: 'moreinfo_id'});
            MoreInfoItem.hasMany(models.MoreInfoItemDetails, {foreignKey: 'moreinfoitem_id'});
          }
        }
      }
  );

  MoreInfoItem.associate = function(models) {
    MoreInfoItem.belongsTo(models.MoreInfo, {foreignKey: 'moreinfo_id'});
    MoreInfoItem.hasMany(models.MoreInfoItemDetails, {foreignKey: 'moreinfoitem_id'});
  };

  return MoreInfoItem;
};
