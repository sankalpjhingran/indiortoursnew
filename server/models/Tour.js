"use strict";

var sequelize  = require('../models/index');
var elasticSearchWrapper = require('../elasticsearch/elasticWrapper.js');
var es = require('../elasticsearch/connect.js');
var client = es.esClient;

module.exports = (sequelize, DataTypes) => {
  var Tour = sequelize.define("Tour", {
        name: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING}, //Need to create a hook for populating this
        description: {type: DataTypes.TEXT('medium')},
        tourtype: {type: DataTypes.ENUM, values: ['Group', 'Individual', 'Regular'], defaultValue: 'Regular', allowNull: false},
        days: {type: DataTypes.INTEGER},
        nights: {type: DataTypes.INTEGER},
        price: {type: DataTypes.DECIMAL},
        offerprice: {type: DataTypes.DECIMAL},
        ismicetour: {type: DataTypes.BOOLEAN},
        micecategory: {type: DataTypes.STRING},
        isactive: {type: DataTypes.BOOLEAN},
        showonhomepage: {type: DataTypes.BOOLEAN},
        order: {type: DataTypes.INTEGER},
        popularitinerary: {type: DataTypes.BOOLEAN},
        videolink1: {type: DataTypes.STRING},
        videolink2: {type: DataTypes.STRING},
        videolink3: {type: DataTypes.STRING},
      }
  );

  Tour.individualHooks = true;

  Tour.associate = function(models){
      Tour.hasMany(models.Itinerary, {as: 'itinerary', foreignKey: 'tour_id'}, { onDelete: 'cascade' });
      Tour.hasMany(models.Booking, {as: 'booking', foreignKey: 'tour_id'});
      //Tour.belongsTo(models.ParentTour, {as: 'tours', foreignKey: 'parenttour_id'});
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

  Tour.beforeCreate(function(tour, options){
      tour.slug = 'Test-slug-value';
  });

  Tour.afterCreate(function(tour, options){
      elasticSearchWrapper.postData('indior', 'tour', tour.id, tour.toElasticSchema());
  });

  Tour.afterUpdate(function(tour, options){
      console.log('Executing afterUpdate hook====>');
      elasticSearchWrapper.deleteData('indior', 'tour', tour.id);
      elasticSearchWrapper.postData('indior', 'tour', tour.id, tour.toElasticSchema());

      /*
      client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 3000,
      }, function (error) {
        if (error) {
          console.log(error);
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log('All is well');

        }
      });
      */

  });

  Tour.afterDestroy(function(tour, options){
      options.individualHooks = true;
      console.log('Executing afterDestroy hook====>');
      elasticSearchWrapper.deleteData('indior', 'tour', tour.id);
  });

  Tour.prototype.toElasticSchema = function () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: 'tour',
      price: this.price,
      offerprice: this.offerprice,
      days: this.days
    };
  };

  return Tour;
};
