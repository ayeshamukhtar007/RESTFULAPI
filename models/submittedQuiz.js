var mongoose = require('mongoose');

var schema = mongoose.Schema;

var submittedQuizSchema = new schema({
    Quiz: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz'
    },
    Student:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    Answer:{
        type: [{
            _id:Number,
            content:String
        }]
    }

});
module.exports = mongoose.model('SubmittedQuiz', submittedQuizSchema);