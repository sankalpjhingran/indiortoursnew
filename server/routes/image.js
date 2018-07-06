'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var imageController  = require('../controllers/images');

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

router.get('/', imageController.show);
router.post('/all/', imageController.index);

/*
* Main Routes start
*/

router.post('/', upload, imageController.create);
router.get('/', imageController.show);
router.post('/all/', imageController.index);
router.post('/update/', imageController.update);
router.get('/allImages/', imageController.indexAll);
router.delete('/', imageController.delete);
router.post('/update/', imageController.update);

module.exports = router;
