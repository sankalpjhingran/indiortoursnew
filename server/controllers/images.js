'use strict';

var models  = require('../models/index');
var Image = models.Image;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports= {
  //Get a list of all authors using model.findAll()
  sync(){
      Image.sync();
  },

  index(req, res) {
    console.log('images get req====>');
    if(req.body.tourids.length){
        console.log('Part1=====>');
        Image.findAll({
          order: [['createdAt', 'DESC']],
          where: {
            [Op.and]: {
              parentobjectid : {
                  [Op.in]: req.body.tourids
              },
              parentobjectname : req.body.parentobjectname
            }
          }
        })
          .then(function (authors) {
                res.status(200).json(authors);
          })
          .catch(function (error) {
            res.status(500).json(error);
          });
    }else if(req.body.parentobjectname){
      console.log('Part2=====>');
      Image.findAll({
        where: {
            parentobjectname : req.body.parentobjectname
          }
        })
        .then(function (authors) {
              res.status(200).json(authors);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    }
  },

  indexAll(req, res) {
    console.log('images get req====>');
    console.log(req.body);
    Image.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then(function (authors) {
            console.log(authors);
            res.status(200).json(authors);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Get an author by the unique ID using model.findById()
  show(req, res) {
    Image.findById(req.params.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log("Image upload request reached server succesfully...");
    console.log('Creating image record...');
    console.log('req===>', req.body);
    var imageRec = {};
    imageRec.type = req.file.mimetype;
    imageRec.path = req.file.path;
    imageRec.filename = req.file.filename;
    imageRec.size = req.file.size;
    imageRec.parentobjectid = req.body.parentobjectid;
    imageRec.parentobjectname = req.body.parentobjectname;
    imageRec.description = req.body.description;

    Image.create(imageRec).then(function(ImageInstance){

      /* Compress the image and  */
      var compress_images = require('compress-images'), inputPath, outputPath;

      inputPath = '../public/images/' + imageRec.filename;
      outputPath = '../public/compressedimages/';

      compress_images(inputPath, outputPath, {compress_force: false, statistic: true, autoupdate: true}, false,
                                              {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                              {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                              {svg: {engine: 'svgo', command: '--multipass'}},
                                              {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(){
      });
      /* Compression ends */

      res.status(200).json(ImageInstance);
    })
    .catch(function (error){
      res.status(500).json(error);
    })
  },

  //Edit an existing author details using model.update()
  update(req, res) {
    console.log('update req===>', req.body);
    let queryVars = req.body;
    Image.update(req.body, {
      where: {
        id: queryVars.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  //Delete an existing author by the unique ID using model.destroy()
  delete(req, res) {
    console.log('Delete Request is=====>');
    console.log(req.query);
    let queryVars = req.query;
    Image.destroy({
      where: {
        id: queryVars.id
      }
    })
    .then(function (deletedRecords) {
      //if successfull, delete image from the file system tourcosts

      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
