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
    DB_NAME: 'indiortours',
    USERNAME: 'root',
    PASSWORD: 'india@123',
    url: 'mysql://root:India@123@localhost:3306/indiortours',
    dialect: 'mysql',
    port: 3306
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  test: {
    url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/bookmark_test',
    dialect: 'postgres'
  },
  senderemail:{
    email: 'sankalp.jhingran@gmail.com',
    password: 'Goldenhouse#56',
    service: 'Gmail'
  }
};
