"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Notes = sequelize.define("Notes", {
        name: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING}, // values will be Includes, Excludes, Visa, Important Note, More Info
        description: {type: DataTypes.TEXT('medium')},
      }
  );
  return Notes;
};
