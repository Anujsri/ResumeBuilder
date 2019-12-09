var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}, 
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	profile_image:{
        type: String,
        default: "https://image.flaticon.com/icons/svg/306/306473.svg" 
    },
	address : {
		city: {
			type: String
		},
		state: {
			type: String
		},
		pincode:{
	        type:Number
		},
		country: {
			type: String
		},
		address: {
			type: String
		}
	},
	profile_overview: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback)=>{
	bcrypt.genSalt(10, (err, salt) =>{
	    bcrypt.hash(newUser.password, salt,(err, hash) =>{
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = (username, callback)=>{
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = (id, callback)=>{
	User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

//database for blogs
 

 