var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Award Schema
var AwardSchema = mongoose.Schema({
    award_name: {
        type: String,
        unique: true
    },
    date: {
        type: Date
    },
    institute_name: {
        type: String
    },
    description: {
        type: String
    },
    user_id : {
    	type : String
    }
});

AwardSchema.plugin(uniqueValidator);
var Award = module.exports = mongoose.model('Award', AwardSchema);
module.exports.addAward = (newAward, callback) => {
    newAward.save(callback);
}