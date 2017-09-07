"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define("Country", {
        name: {type: DataTypes.STRING, primaryKey: true}
      }
  );
  return Country;
};
