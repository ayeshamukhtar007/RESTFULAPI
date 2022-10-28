var express = require('express');
const Teacher = require('../models/teacher');
const LM=require('../models/LectureMaterial');
var router = express.Router();
const multer=require('multer');
const Assignment = require('../models/assignment');
const quiz = require('../models/quiz');
const SubmittedAssign = require('../models/submittedAssign');
const SubmittedQuiz = require('../models/submittedQuiz');
const marks = require('../models/marks');

/* GET users listing. */
const assignment= multer({
  limits:{
    fileSize:22000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.endsWith('.doc'))
    return cb(new Error('.doc format is required'))
    cb(undefined,true);
  }
})
const LectureMaterial= multer({
  limits:{
    fileSize:22000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.endsWith('.pptx'))
    return cb(new Error('.ppt format is required'))
    cb(undefined,true);
  }
})
 // View Lecture Material
router.get('/viewMaterial/:tid/:cid', function(req, res, next) {
  LM.find({ Class: req.params.cid} && { Teacher: req.params.tid} ).exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
router.get('/viewAttemptQuiz/:qid', function(req, res, next) {
  quiz.find({ Quiz: req.params.qid} ).populate('Student','name').select('Answer').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
 // Respond with valid data
router.get('/ViewAttAssig/:aid', function(req, res, next) {
  Assignment.find({ _id: req.params.aid}).exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
 // upload Lecture Material
router.post('/UploadMaterial/:tid/:cid',LectureMaterial.single('lecturematerial'), function(req, res, next) {
   
      
        const lm = new LM({
            Class: req.params.cid,
            Teacher: req.params.tid,
            File: req.file.buffer,
        })
         
          try {
            const savedAssignment = lm.save();
            res.status(201).json({message:"lecture uploaded"});
          } catch (err) {
            console.log(err)
            res.status(500).json("upload fail");
          }
   
  
})

router.post('/uploadAssign/:tid/:cid',assignment.single('assignment'), function(req, res, next) {

    
      const assignment = new Assignment({
          class: req.params.cid,
          teacher: req.params.tid,
          file: req.file.buffer,
      })
       
        try {
          const savedAssignment = assignment.save();
          res.status(201).json({message:"assignment uploaded"});
        } catch (err) {
          console.log(err)
          res.status(500).json("user fail");
        }
 })
router.post('/uploadQuiz/:cid/:tid', function(req, res, next) {
  const quizcontent = new quiz({
    teacher: req.params.tid,
    class:req.params.cid,
    questions:req.body.questions,
    
})
 
  try {
    const savedAssignment = quizcontent.save();
    res.status(201).json({message:"quiz uploaded"});
  } catch (err) {
    console.log(err)
    res.status(500).json("quiz fail");
  }
});
router.post('/AddMarks/:sid/:cid', function(req, res, next) {
  const addmarks = new marks({
    Student: req.params.sid,
    Class:req.params.cid,
    Type:req.body.Type,
    Name:req.body.Name,
    TotalMarks:req.body.TotalMarks,
    ObtainedMarks:req.body.ObtainedMarks,
})
 
  try {
    addmarks.save();
    res.status(201).json({message:"marks uploaded"});
  } catch (err) {
    console.log(err)
    res.status(500).json("user fail");
  }
});
router.put('/updateMarks/:sid', function(req, res, next) {
 
  marks.findOneAndUpdate({ Student: req.params.sid }, {

    "ObtainedMarks": req.body.ObtainedMarks

},
function(error, results) {
if (error) {
    return next(error);
}
// Respond with valid data
res.json(results);
});
})
router.delete('/DeleteMarks/:aid/:cid', function(req, res, next) {
  marks.deleteOne({Student: req.params.sid} && {Class: req.params.cid}, function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});

router.delete('DeleteMaterial/:id', function(req, res, next) {
  LM.deleteOne({ _id: req.params.id }, function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
module.exports = router;
