'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchData = searchData;
exports.deleteIndex = deleteIndex;
exports.createIndex = createIndex;
exports.postData = postData;
exports.postBulkData = postBulkData;
exports.deleteData = deleteData;

var _connect = require('./connect.js');

var _config = require('./config.js');

var _config2 = require('../config/config2.js');

var _config3 = _interopRequireDefault(_config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Search data from ElasticSearch based on query
 * @param  {String} query query string
 * @return {Array}        Search result Array
 */
function searchData(query) {
  var queryObj = JSON.stringify(_config.search).replace(/{query}/g, query);

  return _connect.esClient.search({
    index: _config3.default.elasticSearch.index,
    type: 'tour',
    body: {
      query: {
        multi_match: {
          "query": query,
          "fields": [ "name", "description" ]
        }
      },
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);

    var results = [];

    resp.hits.hits.forEach(function(result){
          results.push(result._source);
    });

    return results;
  }).catch(function (err) {
    console.log(err);
    throw new Error(err);
  });
}

/**
 * Delete index by given name of index
 * @param  {String} name name of index
 * @return {Promise}     Promise for delete index
 */
function deleteIndex(name) {
  console.log('Calling deleteIndex===>');
  return _connect.esClient.indices.delete({ index: name });
}

/**
 * Create index by given name of index
 * @param  {String} name name of index
 * @param {Object} settings Settings for index
 * @return {Promise}     Promise for create index
 */
function createIndex(name, settings) {
  return _connect.esClient.indices.create({
    index: name,
    body: settings
  });
}

/**
 * Post data based on given index, type and id
 * @param  {String} index index name
 * @param  {String} type  type name
 * @param  {String} id    id for data
 * @param  {Object} body  body of data
 * @return {Promise}      Promise of post data
 */
function postData(index, type, id, body) {
  return _connect.esClient.index({
    index: index,
    id: id,
    type: type,
    body: body
  });
}

/**
 * Post bulk data to ElasticSearch
 * @param  {Object} body Body object
 * @return {Promise}     Promise of post bulk
 */
function postBulkData(body) {
  return _connect.esClient.bulk({ body: body });
}

/**
 * Delete data based on index, type and id
 * @param  {String} index index name
 * @param  {String} type  type name
 * @param  {String} id    id of data
 * @return {Promise}      Promise of delete data
 */
function deleteData(index, type, id) {
  return _connect.esClient.delete({
    index: index,
    type: type,
    id: id
  });
}
