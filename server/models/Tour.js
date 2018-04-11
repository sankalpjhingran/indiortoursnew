"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Tour = sequelize.define("Tour", {
        name: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING}, //Need to create a hook for populating this
        description: {type: DataTypes.TEXT('medium')},
        tourtype: {type: DataTypes.ENUM, values: ['Group', 'Individual', 'Regular'], defaultValue: 'Regular', allowNull: false},
        days: {type: DataTypes.INTEGER},
        nights: {type: DataTypes.INTEGER},
        price: {type: DataTypes.DECIMAL},
      }
  );

  Tour.associate = function(models){
      Tour.hasMany(models.Itinerary, {as: 'itinerary', foreignKey: 'tour_id'}, { onDelete: 'cascade' });
      Tour.belongsTo(models.ParentTour, {as: 'tours', foreignKey: 'parenttour_id'});
      Tour.hasMany(models.TourCost, {as: 'tourcost', foreignKey: 'tour_id'}, { onDelete: 'cascade' });
      //Tour.hasMany(models.AdditionalServiceSupplements, {foreignKey: 'tour_id'});
      //Tour.belongsTo(models.MoreInfo, {foreignKey: 'tour_id'});
      //Tour.hasMany(models.Location, {as: 'location', foreignKey: 'tour_id'});
      //Tour.hasMany(models.TourCostDetails, {as: 'tourcostdetails', foreignKey: 'tour_id'});
      Tour.hasMany(models.Hotel, {as: 'hotel', foreignKey: 'tour_id'}, { onDelete: 'cascade' });
      Tour.hasMany(models.DepartureDates, {as: 'departuredates', foreignKey: 'tour_id'}, { onDelete: 'cascade' });
      //Tour.hasMany(models.TourNotes, {as: 'tournotes', foreignKey: 'tour_id'});
      //Tour.hasMany(models.TourLocations, {as: 'tourlocations', foreignKey: 'tour_id'});
      //Tour.belongsToMany(models.TourLocations, { through: models.TourLocations });
      //Tour.belongsToMany(Parent, {through: 'TourLocations', foreignKey: 'location_id'});
  }

  Tour.hook('beforeCreate', function(tour, options){
      tour.slug = 'Test-slug-value';
      return tour;
  });

  console.log(Tour);
  return Tour;
};
