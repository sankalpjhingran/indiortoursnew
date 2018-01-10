"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define("Location", {
        city: {type: DataTypes.STRING},
        country:{type: DataTypes.STRING},
        continent:{type: DataTypes.STRING},
        subcontinent:{type: DataTypes.STRING},
        description: {type: DataTypes.TEXT('medium')},
      },
      {
        classMethods:
        {
          associate: function(models) {
            //console.log('Creating association...location.js');
            //Location.belongsTo(models.Tour, {as: 'location', foreignKey: 'tour_id'});
          }
        }
      }
  );

  Location.associate = function (models) {
    //Location.belongsTo(models.Tour, {as: 'location', foreignKey: 'tour_id'});
    //Location.belongsTo(models.TourLocations, {as: 'locationtours', foreignKey: 'location_id'});
    //Location.hasMany(models.TourLocations, {as: 'locationtours', foreignKey: 'location_id'});
    //Location.belongsToMany(models.TourLocations, { through: models.TourLocations });
    //Location.belongsToMany(Parent, {through: 'TourLocations', foreignKey: 'location_id'});
    Location.hasMany(models.Hotel, {as: 'locationhotels', foreignKey: 'location_id'});
  };

  return Location;
};
