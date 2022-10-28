var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var marksSchema = new Schema({
   
    Type: {
        type: String,
        required:true
    },
    Name: {
        type: String,
        required:true
    },
    Class:{
      type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    Student: {
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    
  TotalMarks:{ 
    type: Number,
    required:true
  }      
   , 
  ObtainedMarks:{ 
    type: Number,
    required:true
  }      
    
});

module.exports = mongoose.model('Marks', marksSchema);