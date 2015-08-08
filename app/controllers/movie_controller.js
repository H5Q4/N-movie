var mongoose = require('mongoose');
var _ = require('underscore');
require('../models/movie');
var Movie = mongoose.model('Movie');

exports.delete = function(req, res) {
  var id = req.query.id;
  if (id) {
    Movie
      .remove({_id: id})
      .exec(function(err) {
        if (err) {
          console.log(err);
          res.json({
            success: false
          });

        } else {
            res.json({
              success: true
            });
          }
      });
  }
};

exports.update = function(req, res) {
  var id = req.params.id;
  if (id) {
    Movie
      .findOne({ _id: id })
      .exec(function(err, movie) {
        if (err) {
          console.log(err);
        } else {
          res.render('admin', {
            title: 'Update ' + movie.title,
            movie: movie
          });
        }
      });

  }
};

exports.detail = function(req, res) {
  var id = req.params.id;
  Movie
    .findOne({ _id: id })
    .exec(function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.render('detail', {
          title: movie.title + ' Detail',
          movie: movie
        });
      }

    });
};

exports.list = function(req, res) {
  Movie
    .find({})
    .exec(function(err, movies) {
      if (err) {
        console.log(err);
      }

      res.render('list', {
        title: 'Movie List',
        movies: movies
      });
    });
};

exports.save = function(req, res) {
  var movieId = req.body.movie._id;
  var reqMovie = req.body.movie;
  var finalMovie;
  if (movieId) {
    Movie
      .findOne({ _id: movieId })
      .exec(function(err, movie) {
        if (err) {
          console.log(err);
        } else {
          finalMovie = _.extend(movie, reqMovie);
          finalMovie.save(function(err, movie) {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/movie/' + movie._id);
            }
          });
        }
      });
  } else {
    finalMovie = new Movie(reqMovie);
    finalMovie.save(function(err, movie) {
      if (err) {
        console.log(err);
      } else {
          res.redirect('/movie/' + movie._id);
      }
    });
  }
};