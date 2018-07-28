
'use strict';
var path = require('path');
var express = require('express');
var router = express.Router();
var elasticSearchWrapper = require('../elasticsearch/elasticWrapper.js');

/**
 * Route for GET /search
 *
 * Required body
 * [Key]
 *
 * @return {Array}         Search Result Array
 */

router.get('/', function(req, res){
  console.log(req.query.key.toLowerCase());
  const searchKey = req.query.key.toLowerCase();

  elasticSearchWrapper.searchData(searchKey)
  .then((data) => {
    console.log('Search result from elasticsearch====>');
    console.log(data);
    res.json(data);
    //return data;
  })
  .catch((err) => {
    res.status(501)
      .send('Elastic Search is not configured');
  });
});

module.exports = router;
