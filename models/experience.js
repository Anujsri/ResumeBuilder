var mongoose = require('mongoose');
// User Schema
var ExperienceSchema = mongoose.Schema({
    job_title: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    company_name: {
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
    },
    projects: [{
        project_name: {
            type: String
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        skills: {
            type: String
        }
        ,
        app_link: {
            type: String
        },
        description: {
            type: String
        }
    }]

});

var Experience = module.exports = mongoose.model('Experience', ExperienceSchema);
module.exports.addExperience = (newExperience, callback) => {
    newExperience.save(callback);
}