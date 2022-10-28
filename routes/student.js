var express = require('express');
var router = express.Router();
var Student = require('../models/student');
const multer=require('multer');
const Assignment = require('../models/assignment');
const SubmittedAssign = require('../models/submittedAssign');
const SubmittedQuiz = require('../models/submittedQuiz');
const marks = require('../models/marks');

const quiz = require('../models/quiz');
/* GET users listing. */
const assignmentS= multer({
  limits:{
    fileSize:22000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.endsWith('.docx'))
    return cb(new Error('.doc format is required'))
    cb(undefined,true);
  }
})
router.put('/attemptquiz/:qid/:sid', function(req, res, next) {
  quiz.findOneAndUpdate({ _id: req.params.qid }, {
    "$push": {
        "submittedquizs": {
            "sid": req.params.sid,
            "answer": req.body.answer,
        }
    }
    }, { new: true, upsert: false },
    function(error, results) {
    if (error) {
        return next(error);
    }
    res.json(results);
    });

})
router.put('/uploadassignment/:aid/:sid',assignmentS.single('assignment'), function(req, res, next) {
  Assignment.findOneAndUpdate({ _id: req.params.aid }, {
    "$push": {
        "submittedAssignments": {
            "sid": req.params.sid,
            "file": req.file.buffer,
        }
    }
}, { new: true, upsert: false },
function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
});
})


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/ViewMarks/:sid', function(req, res, next) {
 marks.find({ Student: req.params.sid}).populate('Student','name').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});

router.get('/ViewAsignment/:cid', function(req, res, next) {
  Assignment.find({ class: req.params.cid}).select('file').populate('class','name').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});

router.get('/Viewquiz/:cid', function(req, res, next) {
  quiz.find({ class: req.params.cid }).select('questions').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      // res.set('Content-Type','text/plain')
      res.send(results);
  });
});
router.get('/Viewresult/:sid', function(req, res, next) {
  marks.find({ Student: req.params.sid }).select('ObtainedMarks').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      // res.set('Content-Type','text/plain')
      res.send(results);
  });
});
module.exports = router;
