var mongoose = require('mongoose');

// User Schema
var EducationSchema = mongoose.Schema({
    institute_name: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    degree: {
        type: String,
        unique: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    user_id : {
    	type : String
    }
});

var Education = module.exports = mongoose.model('Education', EducationSchema);
module.exports.addEducation = (newEducation, callback) => {
    newEducation.save(callback);
}