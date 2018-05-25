"use strict";

var JsonField = require('sequelize-json');
var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourCost = sequelize.define("TourCost", {
        //name: {type: DataTypes.STRING},
        //airfare: {type: DataTypes.STRING},
        //costtype: {type: DataTypes.STRING}, //this is to differentiate between normal cost and AdditionalServiceSupplements
        //additionalservicesupplement: {type: DataTypes.BOOLEAN},

        costcategory: {type: DataTypes.STRING}, // Picklist with values, normal, supplement, addtnl service supplements
        tourtype: {type: DataTypes.STRING}, //Existing, This will be a picklist with values, budget, economy, superior, elegant, luxury
        costitem: {type: DataTypes.STRING}, //This will be individual cost items like per person cost, domestic fare, intl fare etc, will be displayed as picklist on UI
        cost: {type: DataTypes.DECIMAL(4,2)}, //Existing, The cost in currency
        note: {type: DataTypes.TEXT('medium')}, //Existing
        individualcostsjson : {type: DataTypes.JSON},
        /*individualcostsjson :
        {
            type: DataTypes.TEXT('long'),
            get: function () {
                return JSON.parse(this.getDataValue('value'));
            },
            set: function (value) {
                this.setDataValue('value', JSON.stringify(value));
            }
        },
        */
        //groupcostsjson : JsonField(sequelize, 'TourCost', 'groupcostsjson'),
      }
  );

  TourCost.associate = function(models) {
    TourCost.belongsTo(models.Tour, {as: 'tourcost', foreignKey: 'tour_id'});
  };

  return TourCost;
};
