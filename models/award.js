var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
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
    user_id: {
        type: String
    }
});

var Award = module.exports = mongoose.model('Award', AwardSchema);
module.exports.addAward = (newAward, callback) => {
    newAward.save(callback);
}