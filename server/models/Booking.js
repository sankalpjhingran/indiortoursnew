"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Booking = sequelize.define("Booking", {
        bookingid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true
        },
        transactionid: {type: DataTypes.STRING},
        transactionstatus: {type: DataTypes.STRING},
        customerdetails : {type: DataTypes.JSON},
        travellers : {type: DataTypes.JSON},
        tourinfo : {type: DataTypes.JSON},
        flightdetails: {type: DataTypes.JSON},
        otherdetails : {type: DataTypes.JSON},
        emergencycontact: {type: DataTypes.JSON}, 
        tour_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'Tours',
            key: 'id'
          }
        }
      });

  /*
  Booking.associate = function(models) {
    Booking.belongsTo(models.Tour, {as: 'booking', foreignKey: 'booking_id'});
  };
  */
  return Booking;
};
