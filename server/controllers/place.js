'use strict';

const models = require('../models/index');
const Place = models.Place;

module.exports = {
    //Get a list of all authors using model.findAll()
    sync() {
        Place.sync();
    },

    index(req, res) {
        Place.findAll({
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
        Place.findByPk(req.params.id, {})
            .then(function(author) {
                res.status(200).json(author);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    },

    //Create a new author using model.create()
    create(req, res) {
        console.log('req===>', req.body);
        Place.create(req.body).then(function(PlaceInstance) {
                res.status(200).json(PlaceInstance);
            })
            .catch(function(error) {
                res.status(500).json(error);
            })
    },

    //Edit an existing author details using model.update()
    update(req, res) {
        console.log('update req===>', req.body);
        let queryVars = req.body;
        Place.update(req.body, {
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
        Place.destroy({
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