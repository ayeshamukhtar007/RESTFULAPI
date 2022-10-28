var express = require('express');
var router = express.Router();
var Student = require('../models/student');
const multer=require('multer');
const Assignment = require('../models/assignment');
const SubmittedAssign = require('../models/submittedAssign');
const Class = require('../models/class');
const marks = require('../models/marks');
const LectureMaterial = require('../models/LectureMaterial');
/* GET users listing. */


router.get('/Viewclasses', function(req, res, next) {
 Class.find({ }).exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});

router.get('/ViewMaterial', function(req, res, next) {
  LectureMaterial.find().exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
router.get('/Viewresult/:sid', function(req, res, next) {
    marks.find({ Student: req.params.sid }).select('ObtainedMarks').exec(function(error, results) {
        if (error) {
            return next(error);
        }
      
        res.send(results);
    });
  });
  router.get('/classresult/:cid', function(req, res, next) {
    marks.find({ Class: req.params.cid }).select('ObtainedMarks').populate('Student','name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        
        res.send(results);
    });
  });


module.exports = router;
