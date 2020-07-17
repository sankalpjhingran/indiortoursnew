"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ContinentTranslation = sequelize.define("ContinentTranslation", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')}
      }
  )

  ContinentTranslation.associate = function (models) {
    ContinentTranslation.belongsTo(models.Continent, {foreignKey: 'ContinentId', as: "continent"});
    ContinentTranslation.belongsTo(models.Language, {as: 'language'});
  };
  return ContinentTranslation;
};
