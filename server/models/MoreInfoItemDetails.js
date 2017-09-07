"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfoItemDetails = sequelize.define("MoreInfoItemDetails", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            //MoreInfoItemDetails.belongsTo(models.MoreInfoItem);
          }
          */
        }
      }
  );
  return MoreInfoItemDetails;
};
