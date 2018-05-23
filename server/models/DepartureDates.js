"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var DepartureDates = sequelize.define("DepartureDates", {
        month: {type: DataTypes.STRING},
        year: {type: DataTypes.INTEGER},
        dates: {type: DataTypes.STRING},
        noteone: {type: DataTypes.TEXT('medium')},
        notetwo: {type: DataTypes.TEXT('medium')},

        title: {type: DataTypes.STRING},
        startdate: {type: DataTypes.DATE}, //Start date of tour
        enddate: {type: DataTypes.DATE}, //End Date if its not repeating
        repeatfrequency: {type: DataTypes.ENUM('day', 'week', 'month', 'year')}, //Repeating for days, weeks, months or years
        repeatfor: {type: DataTypes.INTEGER}, //How many times to repeat for each of repeatfrequency
        repeatondayofweek: {type: DataTypes.STRING}, //If repeat frequency is week, which days of the week to repeat for, semi-colon seperated if multiple items are selected
        repeatondayofmonth: {type: DataTypes.INTEGER}, //If repeat frequency is month, which day of the month to repeat
        repeatendsnever: {type: DataTypes.BOOLEAN}, // Always departing tours
        repeatendsondate: {type: DataTypes.DATE}, //There is an end date
        repeatendsafteroccurrences: {type: DataTypes.INTEGER}, // Ends after number of occurrences
      }
  );

  DepartureDates.associate = function(models) {
    DepartureDates.belongsTo(models.Tour, {as: 'departuredates', foreignKey: 'tour_id'});
  }
  return DepartureDates;
};
