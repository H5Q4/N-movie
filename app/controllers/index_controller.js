var mongoose = require('mongoose');
require('../models/movie');
var Movie = mongoose.model('Movie');

exports.showHomePage = function (req, res) {
  Movie.find({})
    .exec(function (err, movies) {
      if (err) {
        throw err;
      } else {
        res.render('index', {
          movies: movies
        });
      }
    });
};

exports.showSignupPage = function (req, res) {
  res.render('signup');
};

exports.showSigninPage = function (req, res) {
  res.render('signin');
};

exports.showNewMoviePage = function (req, res) {
  res.render('admin', {
    title: 'Movie Add',
    movie: {
      _id: '',
      title: '',
      director: '',
      language: '',
      flash: '',
      year: '',
      summary: ''
    }
  });
};