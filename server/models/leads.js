"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Lead = sequelize.define("Lead", {
        title: {type: DataTypes.ENUM, values: ['Mr', 'Miss', 'Ms', 'Mrs'], allowNull: false},
        email: {type: DataTypes.STRING, validate: {isEmail: true}, allowNull: false},
        phone: {type: DataTypes.STRING, allowNul: false},
        name: {type: DataTypes.STRING},
        plannedarrival: {type: DataTypes.DATE},
        numdays: {type: DataTypes.INTEGER},
        numpeople: {type: DataTypes.INTEGER},
        preferredhoteltype: {type: DataTypes.ENUM, values: ['High End Hotels', 'Luxury And Palaces', 'Medium Budget', 'Low Budget']},
        message: {type: DataTypes.TEXT('medium')},
        attachment: {type: DataTypes.BLOB}
      }
  );
  return Lead;
};
