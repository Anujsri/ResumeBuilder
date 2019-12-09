var mongoose = require('mongoose');

// User Schema
var CertificateSchema = mongoose.Schema({
    certificate_name: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    institute_name: {
        type: String
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

var Certificate = module.exports = mongoose.model('Certificate', CertificateSchema);
module.exports.addCertificate = (newCertificate, callback) => {
    newCertificate.save(callback);
}