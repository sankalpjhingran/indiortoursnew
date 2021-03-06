'use strict';

var models  = require('../models/index');
var Image = models.Image;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const path = require('path');

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
          attributes: ['filename', 'parentobjectname', 'parentobjectid'],
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
    Image.findByPk(req.params.id, {})
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  search(req, res) {
    Image.findAll({
        where: {
          filename: {
              [Op.like]: '%' + req.query.searchterm + '%'
          }
        },
        order: [['createdAt', 'DESC']]
      }
    )
      .then(function (authors) {
            res.status(200).json(authors);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
  },

  //Create a new author using model.create()
  create(req, res) {
    console.log("Image upload request reached server succesfully...");
    console.log('Creating image record...');
    console.log('req===>', req.body);
    console.log('req.files===>', req.files);

    var imageRecs = [];

    req.files.forEach(function(file){
      console.log('Processeeing file====> ', path.resolve('../public/images', file.filename + '.webp'));
      let imageRec = {};
      imageRec.type = file.mimetype;
      imageRec.path = file.destination + '/' + file.filename + '.webp';
      imageRec.filename = file.filename + '.webp';
      imageRec.size = file.size;
      imageRec.parentobjectid = req.body.parentobjectid;
      imageRec.parentobjectname = req.body.parentobjectname;
      //imageRec.description = req.body.description; 
      imageRecs.push(imageRec); 
    });

    console.log('imageRecs======> ', imageRecs);

    Image.bulkCreate(imageRecs).then(function(imagesCreated){
      console.log('imagesCreated====>', imagesCreated);
      res.status(200).json(imagesCreated);
    })
    .catch(function (error){
      console.log('Error====> ', error);
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

    Image.findByPk(queryVars.id, {}).then((result) => {
        console.log('Result of find call is====>');
        return Image.destroy(
          {
            where: { id: queryVars.id }
          }).then((u) => {
            //Delete file from filesystem
            var jsonPath = path.join(__dirname, '..', result.path);
            fs.unlink(jsonPath, (err) => {
              console.log('File deleted===>');
              if (err) {
                console.error(err)
                return
              }
              //file removed
            })

            return res.status(200).json(result)
          })
    }).catch(function (error){
      res.status(500).json(error);
    });
  }
};
