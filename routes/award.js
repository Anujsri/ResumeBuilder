var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Award = require('../models/award');

router.post('/award/:id', ensureAuthenticated, (req, res) => {
    let message;
    user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            award_obj = req.body;
            award_obj['user_id'] = result;
            var awardAdd = new Award(award_obj);
            return awardAdd.save().then((award) => {
                return award;
            });
        })
        .then(function(award) {
            message = "Award is Added to your profile";
            res.status(201).send({ message: message, data: award });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

router.put('/award/:id', ensureAuthenticated, (req, res) => {
    let message;
    var award_id = req.params.id;
    let newvalues = {$set: req.body};
    Award.findByIdAndUpdate(award_id,newvalues, { new: true })
        .then((award) => {
            return award;
        })
        .then(function(award) {
            message = "Award is changed";
            res.status(200).send({ message: message, data: award });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

router.get('/award/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            return Award.find({user_id: user_id}).exec()
            then((award) => {
                return award;
            });
        })
        .then(function(award) {
            message = "Award is Added to your profile";
            res.status(200).send({ message: message, data: award });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;