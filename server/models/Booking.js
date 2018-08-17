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
        otherdetails : {type: DataTypes.JSON},
      });
  return Booking;
};
