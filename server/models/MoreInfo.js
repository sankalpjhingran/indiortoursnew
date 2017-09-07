"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var MoreInfo = sequelize.define("MoreInfo", {
        name: {type: DataTypes.STRING, primaryKey: true}
      },
      {
        classMethods:
        {
          /*
          associate: function(models) {
            MoreInfo.hasMany(models.MoreInfoItem);
          }
          */
        }
      }
  );
  return MoreInfo;
};
