'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var imageController  = require('../controllers/images');
const sharp = require('sharp')
const fs = require('fs')
const uuidv4 = require('uuid/v4');
const { nextTick } = require('process');

//Mutler
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/temp')
    },
    filename: function (req, file, cb) {
        var filename = uuidv4(); 
        cb(null, filename)
    }
})

var upload = multer({ storage: storage }).array('file', 5);

const uploadImages = (req, res, next) => {
    console.log('Uploading files====> ', req.files);
    upload(req, res, err => {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                console.log('Error: LIMIT_UNEXPECTED_FILE ', err);
            }
        } else if (err) {
            // handle other errors
            console.log('Error: other error ', err);
        } else {
            console.log('Upload successfull....!');
            // Everything is ok.
            next();
        }
    });
};

const convertImagesToWebp = async (req, res, next) => {  
    await Promise.all(
      req.files.map(async file => {
        await sharp(file.path)
          .webp({ quality: 75 })
          .toFile(
            path.resolve('../public/images', file.filename) + '.webp'
        )
        fs.unlinkSync(file.path);
      })
    )
    next();
}

router.post(
    '/',
    uploadImages,
    convertImagesToWebp,
    imageController.create
  );


/*
router.post('/', upload, async (req, res, next) => {
    console.log('File is====> ', req.file);
    const { filename: image } = req.file;

    console.log('output path====> ', path.resolve('../public/images', image) + '.webp');

    await sharp(req.file.path)
     .webp({quality: 75})
     .toFile(
         path.resolve('../public/images', image) + '.webp'
     )
     fs.unlinkSync(req.file.path)
     next();
 }, imageController.create);
*/
//router.get('/', imageController.show);
//router.post('/all/', imageController.index);

/*
* Main Routes start
*/
router.get('/', imageController.show);
router.get('/search', imageController.search);
router.post('/all/', imageController.index);
router.post('/update/', imageController.update);
router.get('/allImages/', imageController.indexAll);
router.delete('/', imageController.delete);
router.post('/update/', imageController.update);

module.exports = router;
