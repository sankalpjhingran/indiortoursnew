"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Continent = sequelize.define("Continent", {
        name: {type: DataTypes.STRING, primaryKey: true}
      }
  );
  return Continent;
};
