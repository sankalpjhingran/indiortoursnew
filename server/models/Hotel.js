"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Hotel = sequelize.define("Hotel", {
        name: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
        location:{type: DataTypes.STRING},//Name of the location from the selected location id
      }
  );

  Hotel.associate = function(models) {
    try{
      Hotel.belongsTo(models.Location, {as: 'locationhotels', foreignKey: 'hotel_id'});
      //Hotel.belongsTo(models.Tour, {as: 'hotel', foreignKey: 'tour_id'});
    }catch(err){
        console.log(err);
    }
  };
  return Hotel;
};
