/*
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esClient = undefined;

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _config = require('../config/config2.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var esClient = exports.esClient = new _elasticsearch2.default.Client({
  host: _config2.default.elasticSearch.url,
  log: 'error'
});
*/