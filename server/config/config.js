module.exports = {
  development: {
    DB_NAME: 'indiortours',
    USERNAME: 'root',
    PASSWORD: 'india@123',
    url: 'mysql://root:india@123@localhost:3306/indiortours',
    dialect: 'mysql',
    port: 3306
  },
    production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
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
