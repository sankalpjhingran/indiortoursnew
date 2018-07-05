'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var imageController  = require('../controllers/images');
var authenticated = require('./authenticated');

//Mutler
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file');

/*
* Main Routes start
*/
router.post('/all/', imageController.index);
/*
* Main Routes start
*/

router.post('/', upload, authenticated, imageController.create);
router.get('/', authenticated, imageController.show);
router.post('/all/', authenticated, imageController.index);
router.get('/allImages/', authenticated, imageController.indexAll);
router.delete('/', authenticated, imageController.delete);
router.post('/update/', authenticated, imageController.update);
module.exports = router;
