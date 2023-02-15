"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define("Place", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT('medium')
        },
        type: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true,
            defaultValue: null,
            validate: {
                min: -180,
                max: 180
            }
        },
        elevation: {
            type: DataTypes.INTEGER
        }
    }, {
        charset: 'utf8mb4'
    }, {
        validate: {
            bothCoordsOrNone() {
                if ((this.latitude === null) !== (this.longitude === null)) {
                    throw new Error('Require either both latitude and longitude or neither')
                }
            }
        }
    });

    Place.associate = function(models) {
        Place.belongsTo(models.Location, {
            as: 'places',
            foreignKey: 'location_id'
        });
    };
    return Place;
};