"use strict";

require('../models/index');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        phone: DataTypes.STRING,
        isactive: DataTypes.BOOLEAN,
        verifylink: DataTypes.STRING,
        verifylinkcreateddate: DataTypes.DATE,
        islinkverified: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        type: {
            type: DataTypes.ENUM,
            values: ['Admin', 'Direct Customer', 'DMC', 'Tour Operator', 'Travel Agent'],
            defaultValue: 'Direct Customer',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Active', 'Inactive'],
            defaultValue: 'Inactive'
        },
        lastLogin: {
            type: DataTypes.DATE
        },
        facebookId: {
            type: DataTypes.STRING
        },
        googleId: {
            type: DataTypes.STRING
        },
        dateofbirth: {
            type: DataTypes.DATE
        },
        gender: {
            type: DataTypes.STRING
        },
        addressline1: {
            type: DataTypes.STRING
        },
        addressline2: {
            type: DataTypes.STRING
        },
        addresscity: {
            type: DataTypes.STRING
        },
        addresstate: {
            type: DataTypes.STRING
        },
        addresscountry: {
            type: DataTypes.STRING
        },
        addresszippin: {
            type: DataTypes.STRING
        },
    });

    User.associate = function(models) {
        User.belongsTo(models.Partner, {
            foreignKey: 'partnerId'
        });
    };

    User.beforeUpdate(function(user, options) {
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
        user.password = hash;
        user.email = user.email.toLowerCase();
        return user;
    });

    User.beforeCreate(function(user, options) {
        const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
        user.password = hash;
        user.email = user.email.toLowerCase();
        return user;
    });

    return User;
};