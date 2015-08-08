var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};

exports.signup = function (req, res) {
  var reqUser = req.body.user;
  User.findOne({username: reqUser.username}, function (err, user) {
    if (err) { throw err; }
    if (user) {
      return res.json({
        err: 'A user with that username already exists'
      });
    }
    var user = new User(reqUser);
    user.save(function (err, user) {
      if (err) { throw err; }
      if (user) {
        res.redirect('/');
      }
    });
  });

};

exports.signin = function (req, res) {
  var reqUser = req.body.user;
  var username = reqUser.username;
  var password = reqUser.password;
  User.findOne({username: username}, function (err, user) {
    if (err) { console.log(err); }
    if (!user) { return res.redirect('/signup'); }
    var validPassword = user.comparePassword(password);
    if (!validPassword) {
      res.send({
        success: false,
        message: 'Wrong password!'
      });
    } else {
      req.session.user = user;
      return res.redirect('/');
    }
  });
};