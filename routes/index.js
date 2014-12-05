var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Students = mongoose.model('Student');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Linkedin for Mentor' });
});

router.get('/students', function(req, res, next) {
  Student.find(function(err, students){
    if(err){ return next(err); }
    res.json(students);
  });
});

router.post('/students', function(req, res, next) {
  var student = new student(req.body);

  student.save(function(err, student){
    if(err){ return next(err); }

    res.json(student);
  });
});

module.exports = router;
