'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/images');
const sharp = require('sharp')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const { nextTick } = require('process');

//Mutler
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/temp"));
    },
    filename: function (req, file, cb) {
        var filename = uuidv4();
        cb(null, filename)
    }
});

const upload = multer({storage: storage}).array('file', 5);

const uploadImages = (req, res, next) => {
    console.log(path.resolve(__dirname, "../../public/temp"));
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
    console.log(req.files);
    await Promise.all(
      req.files.map(async file => {
        await sharp(file.path)
          .webp({ quality: 75 })
          .toFile(
            path.resolve(__dirname, "../../public/images", file.filename) + '.webp'
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

//router.get('/', imageController.show);
//router.post('/all/', imageController.index);

/*
* Main Routes start
*/
router.get('/', imageController.show);
router.get('/search', imageController.search);
router.post('/all/', imageController.index);
router.patch('/update/', imageController.update);
router.get('/allImages/', imageController.indexAll);
router.delete('/', imageController.delete);
router.post('/update/', imageController.update);

module.exports = router;
