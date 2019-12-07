var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Certificate = require('../models/certificate');

// Add Certificate
router.post('/certificate/:id', ensureAuthenticated, (req, res) => {
	let message;
    user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            certificate_obj = req.body;
            certificate_obj['user_id'] = result;
            var certificatedAdd = new Certificate(certificate_obj);
            return certificatedAdd.save().then((certificate) => {
                return certificate;
            });
        })
        .then(function(certificate) {
            message = "Certificate is Added to your profile";
            res.status(201).send({ message: message, data: certificate });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

router.put('/certificate/:id', ensureAuthenticated, (req, res) => {

	let message;
    var certificate_id = req.params.id;
    let newvalues = {$set: req.body};
    Certificate.findByIdAndUpdate(certificate_id,newvalues, { new: true })
        .then((certificate) => {
            return certificate;
        })
        .then(function(certificate) {
            message = "Certificate is changed";
            res.status(200).send({ message: message, data: certificate });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

router.get('/certificate/:id', ensureAuthenticated, (req, res) => {

	var user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            return Certificate.find({user_id: user_id}).exec()
            then((certificate) => {
                return certificate;
            });
        })
        .then(function(certificate) {
            message = "OK";
            res.status(200).send({ message: message, data: certificate });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        });
})


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;