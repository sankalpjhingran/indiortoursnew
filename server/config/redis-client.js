// redis-client.js
const redis = require('redis');
const client = redis.createClient({ ttl: 600 });
module.exports = client;
