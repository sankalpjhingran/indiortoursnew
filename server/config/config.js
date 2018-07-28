const env = process.env.NODE_ENV; // 'dev' or 'test'
//"elasticsearch:migrate": "node lib/elasticsearch/postgresToElastic.js",
console.log('NODE_ENV====>');
console.log(env);

const dev = {
 db: {
   DB_NAME: 'indiortours',
   USERNAME: 'root',
   PASSWORD: 'india@123',
   url: 'mysql://root:india@123@localhost:3306/indiortours',
   dialect: 'mysql',
   port: 3306
 },
 elasticSearch: {
   url: process.env.ELASTICSEARCH_URL || '127.0.0.1:9200',
   index: process.env.ELASTICSEARCH_INDEX_NAME || 'indior',
 },
 senderemail:{
   email: 'sankalp.jhingran@gmail.com',
   password: 'Goldenhouse#56',
   service: 'Gmail'
 }
};

const prod = {
 db: {
   DB_NAME: 'indiortoursclone',
   USERNAME: 'root',
   PASSWORD: 'India@123',
   url: 'mysql://root:India@123@localhost:3306/indiortoursclone',
   dialect: 'mysql',
   port: 3306
 },
 elasticSearch: {
   url: process.env.ELASTICSEARCH_URL || '127.0.0.1:9200',
   index: process.env.ELASTICSEARCH_INDEX_NAME || 'indior',
 },
 senderemail:{
   email: 'sankalp.jhingran@gmail.com',
   password: 'Goldenhouse#56',
   service: 'Gmail'
 }
};

const config = {
 dev,
 prod
};

module.exports = config[env];
