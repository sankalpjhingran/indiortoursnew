"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfoItem = sequelize.define("MoreInfoItem", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            //MoreInfoItem.belongsTo(models.MoreInfo);
            //MoreInfoItem.hasMany(models.MoreInfoItemDetails);
          }
          */
        }
      }
  );
  return MoreInfoItem;
};
