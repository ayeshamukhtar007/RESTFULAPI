var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LMSchema = new Schema({
   
    Class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    Teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    },
    
  File:{ 
    type: Buffer,
    required:true
  }      
  
});

module.exports = mongoose.model('LM', LMSchema);