var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quizSchema = new Schema({
   
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher'
    },
    questions: {
        type: [{
            _id:Number,
            content:String
        }]
        
    }
    ,submittedquizs:{
        type: [{
            sid: {
                type: mongoose.Types.ObjectId,
                ref: 'Student'
            },
            answer:{
                type:String
            }
        }]
    } 
    
});

module.exports = mongoose.model('Quiz', quizSchema);