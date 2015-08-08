module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  secret: 'nmovie',
  dbUrl: 'mongodb://localhost/n-movie'
};