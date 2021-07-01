var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/registro', function(req, res, next) {
  res.render('register-user', { title: 'Express' });
});
router.get('/registro/restaurante', function(req, res, next) {
  res.render('register-restaurant', { title: 'Express' });
});

module.exports = router;
