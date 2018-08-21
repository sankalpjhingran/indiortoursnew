//"elasticsearch:migrate": "node lib/elasticsearch/postgresToElastic.js",

var dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

var config = {
  db: {
     DB_NAME: process.env.DB_NAME,
     USERNAME: process.env.DB_USERNAME,
     PASSWORD: process.env.DB_PASSWORD,
     url: process.env.DB_URL,
     dialect: process.env.DB_DIALECT,
     port: process.env.DB_PORT,
   },
   elasticSearch: {
     url: process.env.ELASTICSEARCH_URL,
     index: process.env.ELASTICSEARCH_INDEX_NAME,
   },
   senderemail:{
     email: process.env.NOREPLY_EMAIL,
     password: process.env.NOREPLY_PASSWORD,
     service: process.env.NOREPLY_SERVICE,
   },
   fb:{
     CLIENT_ID: process.env.FB_CLIENT_ID,
     CLIENT_SECRET: process.env.FB_CLIENT_SECRET
   }
}

module.exports = config;
