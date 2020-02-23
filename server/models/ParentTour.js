"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var ParentTour = sequelize.define("ParentTour", {
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        order_by: {type: DataTypes.INTEGER},
        isactive: {type: DataTypes.BOOLEAN},
        category: {type: DataTypes.ENUM, values: ['Religious Tours', 'Adventure Tours', 'Indior Favorites'], defaultValue: 'Indior Favorites', allowNull: false}
      }
  );

  ParentTour.associate = function(models) {
  	//ParentTour.hasMany(models.Tour, {as: 'tours', foreignKey: 'parenttour_id'});
  };

  return ParentTour;
};
