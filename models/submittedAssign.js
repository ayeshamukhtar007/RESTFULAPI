var mongoose = require('mongoose');

var schema = mongoose.Schema;

var submittedAssignSchema = new schema({
    Assignment: {
        type: mongoose.Types.ObjectId,
        ref: 'Assignment'
    },
    Student:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    File:{
        type:Buffer
    }

});
module.exports = mongoose.model('SubmittedAssign', submittedAssignSchema);