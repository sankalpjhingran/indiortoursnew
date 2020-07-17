"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfo = sequelize.define("MoreInfo", {
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
            MoreInfo.hasMany(models.MoreInfoItem, {foreignKey: 'moreinfo_id'});
          }
        }
      }
  );

  MoreInfo.associate = function(models) {
    MoreInfo.hasMany(models.MoreInfoItem, {foreignKey: 'moreinfo_id'});
  };

  return MoreInfo;
};
