var indexController = require('../controllers/index_controller');
var movieController = require('../controllers/movie_controller');
var userController = require('../controllers/user_controller');

module.exports = function (app) {

  app.use(function (req, res, next) {
    app.locals.user = req.session.user;
    next();
  });

  app.get('/', indexController.showHomePage);
  app.get('/signup', indexController.showSignupPage);
  app.get('/signin', indexController.showSigninPage);
  app.get('/admin/movie/new', indexController.showNewMoviePage);

  app.post('/user/signup', userController.signup);
  app.post('/user/signin', userController.signin);
  app.get('/user/logout', userController.logout);

  app.get('/movie/:id', movieController.detail);
  app.post('/admin/movie/new', movieController.save);
  app.get('/admin/movie/list', movieController.list);
  app.delete('/admin/movie/list', movieController.delete);
  app.get('/admin/movie/update/:id', movieController.update);

};