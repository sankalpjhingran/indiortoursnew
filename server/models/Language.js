"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Language = sequelize.define("Language", {
        name: {type: DataTypes.STRING},
        isocode: {type: DataTypes.STRING}
      }
  )
  return Language;
};
