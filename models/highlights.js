var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
// Award Schema
var HighlightsSchema = mongoose.Schema({
    highlightName: [String],
    user_id : {
        type : String
    }    
});

var Highlights = module.exports = mongoose.model('Highlights', HighlightsSchema);
