'use strict';

const models = require('../models/index');
const Image = models.Image;
const Location = models.Location;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    //Get a list of all authors using model.findAll()
    sync() {
        Location.sync();
    },

    getGroupedLocations(req, res) {
        const type = req.query.type;
        const name = req.query.name;
        Location.findAll({
                where: {
                    type: name
                },
                attributes: [
                    [models.sequelize.fn('DISTINCT', models.sequelize.col(type)), type],
                ]
            })
            .then(function(authors) {
                res.status(200).json(authors);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    getContinents(req, res) {
        Location.findAll({
                attributes: [
                    [models.sequelize.fn('DISTINCT', models.sequelize.col('continent')), 'continent'],
                ]
            })
            .then(function(authors) {
                res.status(200).json(authors);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    index(req, res) {
        Location.findAll({
                //include: [{ association : 'places' }],
                attributes: ['id', 'city', 'state', 'visible', 'region', 'country', 'country_id', 'description', 'continent', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    visible: true
                }
            })
            .then(function(authors) {
                res.status(200).json(authors);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    indexAll(req, res) {
        Location.findAll({
                //include: [{ association : 'places' }],
                attributes: ['id', 'city', 'state', 'visible', 'region', 'country', 'country_id', 'continent', 'latitude', 'longitude', 'createdAt', 'updatedAt', 'elevation'],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(function(authors) {
                res.status(200).json(authors);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    //Get an author by the unique ID using model.findById()
    show(req, res) {
        Location.findByPk(req.query.id, {
                include: [{
                    association: 'siteTour',
                    include: [{
                        association: 'siteLocation',
                        attributes: ['id', 'city', 'state', 'country', 'country_id', 'continent', 'latitude', 'longitude', 'elevation']
                    }],
                }]
            })
            .then(function(author) {
                const parentIds = [];
                author.siteTour.forEach(function(tour) {
                    parentIds.push(tour.id);
                });
                Image.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        where: {
                            [Op.and]: {
                                parentobjectid: {
                                    [Op.in]: parentIds
                                },
                                parentobjectname: 'tour'
                            }
                        }
                    })
                    .then(function(imageRes) {
                        const tourImageMap = new Map();
                        imageRes.forEach(function(image) {
                            let lstImages = [];
                            lstImages.push(image.dataValues);
                            if (tourImageMap.has(image.parentobjectid)) {
                                let list = tourImageMap.get(image.parentobjectid);
                                lstImages = list.concat(lstImages);
                                tourImageMap.set(image.parentobjectid, lstImages);
                            } else {
                                tourImageMap.set(image.parentobjectid, lstImages);
                            }
                        });

                        author.siteTour.forEach(function(tourNew) {
                            tourNew.dataValues.images = [];
                            tourNew.dataValues.images.push(tourImageMap.get(JSON.stringify(tourNew.id)));
                        })
                        res.status(200).json(author);
                    })
                    .catch(function(error) {
                        console.log(error);
                        res.status(500).json(error);
                    });
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },

    //Create a new author using model.create()
    create(req, res) {
        Location.create(req.body).then(function(LocationInstance) {
                res.status(200).json(LocationInstance);
            })
            .catch(function(error) {
                res.status(500).json(error);
            })
    },

    //Edit an existing author details using model.update()
    update(req, res) {
        let queryVars = req.body;
        Location.update(req.body, {
                where: {
                    id: queryVars.id
                }
            })
            .then(function(updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    //Delete an existing author by the unique ID using model.destroy()
    delete(req, res) {
        console.log(req);
        let queryVars = req.query;
        Location.destroy({
                where: {
                    id: queryVars.id
                }
            })
            .then(function(deletedRecords) {
                res.status(200).json(deletedRecords);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    }
};