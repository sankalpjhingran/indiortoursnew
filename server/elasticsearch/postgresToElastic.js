/*
var  indexSettings =  require('./config.js').indexSettings;

var deleteIndex = require('./elasticWrapper.js');
var createIndex = require('./elasticWrapper.js');
var postBulkData = require('./elasticWrapper.js');

var wrapper = require('./elasticWrapper.js');

var models = require('../models/index');
var index = require('../config/config2.js');

const { Instance, InstanceAlias } = models;
const BATCH_SIZE = 20000;

console.log('Initializing postgresToElastic===>');
/**
 * Post to ElasticSearch with delay
 * @param  {Object} body body object
 * @param  {Integer} time delay time
 
function postWithDelay(body, time) {
  console.log('Calling postWithDelay====>');
  setTimeout(() => {
    postBulkData(body)
      .then(() => {
        console.log('Successfully migrated ' + body.length / 2 + ' records');
      })
      .catch((err) => {
        console.log(err);
      });
  }, time);
}

/**
 * Get Instance data from database and post to ElasticSearch
 
function postInstances() {
  console.log('Calling postInstances====>');
  let body = [];
  models.Tour.findAll({})
    .then((instances) => {
      instances.forEach((instance) => {
        body.push({
          index: {
            _index: index.elasticSearch.index, _type: 'tour', _id: instance.id,
          },
        });
        body.push(instance.toElasticSchema());
      });

      wrapper.postBulkData(body)
        .then((res) => {
          console.log('Successfully migrated ' + body.length / 2 + ' records');
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

/**
 * Retrieve a batch of InstanceAliases and schedules the posting to ElasticSearch
 *
 */
 /*
function postInstanceAliasBatch(offset, limit, count) {
  console.log(`Scheduling batch ${count + 1}`);
  InstanceAlias.findAll({ offset, limit })
    .then(instanceAliasBatch => {
      if (instanceAliasBatch.length === 0) {
        console.log('No more batches...');
        return;
      }

      const body = [];
      instanceAliasBatch.forEach(alias => {
        body.push({ index: {
            _index: index.elasticSearch.index, _type: 'instanceAlias', _id: alias.key,
          }, });
        body.push(alias.toElasticSchema());
      });

      postWithDelay(body, 10000 * count);

      postInstanceAliasBatch(offset + limit, limit, count + 1);
    });

}
*/

/**
 * Get InstanceAliases data from database and post to ElasticSearch in batches recursively
 */
 /*
function postInstanceAliases() {
  postInstanceAliasBatch(0, BATCH_SIZE, 0);
}
*/

/**
 * Setup index if not present otherwise remove old and setup again
 
function setupIndex() {
  console.log('Settingup index===>');
  return wrapper.deleteIndex(index.elasticSearch.index)
    .then(() => wrapper.createIndex(index.elasticSearch.index, indexSettings))
    .catch(() => wrapper.createIndex(index.elasticSearch.index, indexSettings));
}

// Setup index then migrate data to ElasticSearch from Database
setupIndex()
  .then(() => {
    postInstances();
    //postInstanceAliases();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
  */
