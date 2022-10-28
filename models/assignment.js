var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assignmentSchema = new Schema({
    
   
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    },
    file:{
        type:Buffer
    },
   
    submittedAssignments:{
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'Student'
            },
            file:{
                type:Buffer
            }
        }]
    }
      
      
    
});

module.exports = mongoose.model('Assignment', assignmentSchema);