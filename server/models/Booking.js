"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        transactionid: {
            type: DataTypes.STRING
        },
        transactionstatus: {
            type: DataTypes.STRING
        },
        customerdetails: {
            type: DataTypes.JSON
        },
        travellers: {
            type: DataTypes.JSON
        },
        tourinfo: {
            type: DataTypes.JSON
        },
        flightdetails: {
            type: DataTypes.JSON
        },
        otherdetails: {
            type: DataTypes.JSON
        },
        emergencycontact: {
            type: DataTypes.JSON
        },
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


    Booking.associate = function(models) {
        Booking.belongsTo(models.Partner, {
            foreignKey: 'partnerId'
        });
    };
    return Booking;
};