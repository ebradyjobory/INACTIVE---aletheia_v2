var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('appdb');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('mentor');
});



module.exports = router;
