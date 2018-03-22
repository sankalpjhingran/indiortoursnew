module.exports = {
  development: {
    DB_NAME: 'indiortoursclone',
    USERNAME: 'root',
    PASSWORD: 'India@123',
    url: 'mysql://root:India@123@localhost:3306/indiortoursclone',
    dialect: 'mysql',
    port: 3306
  },
    production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
    staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
    test: {
    url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/bookmark_test',
    dialect: 'postgres'
  }
};
