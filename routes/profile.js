var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Experience = require('../models/experience');
var Education = require('../models/education');
var Certificate = require('../models/certificate');
var Award = require('../models/award');
// Get Homepage
router.get('/getprofile', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user.email }, (err, user) => {
        if (err) {
            req.flash('error_msg', 'Some error occured');
            res.render('profile')
        } else {
            res.render('profile', { user });
        }
    })
})

function getExperience(user_id) {
    Experience.findOne({ user_id: user_id }, (err, experience) => {
        if (err) throw err;
        return experience;
    })
}

function getEducation(user_id) {
    Education.findOne({ user_id: user_id }, (err, education) => {
        if (err) throw err;
        return education;
    })
}

function getCertificate(user_id) {
    Certificate.findOne({ user_id: user_id }, (err, certificate) => {
        if (err) throw err;
        return certificate;
    })
}

function getAward(user_id) {
    Award.findOne({ user_id: user_id }, (err, award) => {
        if (err) throw err;
        return award;
    })
}

router.post('/editprofile/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            city = req.body.city;
            state = req.body.state;
            pincode = req.body.pincode;
            country = req.body.country;
            address = req.body.address;
            profile_overview = req.body.profile_overview;
            if (city) user.address.city = city;
            if (state) user.address.state = state;
            if (pincode) user.address.pincode = pincode;
            if (country) user.address.country = country;
            if (address) user.address.address = address;
            if (profile_overview) user.profile_overview = profile_overview;
            user.save((err, user) => {
                if (err) throw err;
                res.redirect('/users/profile');
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }
    })
})

router.post('/experience/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            job_title = req.body.job_title;
            company_name = req.body.company_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;
            projects = req.body.projects;

            var experienceadd = new Experience({
                job_title: job_title,
                company_name: company_name,
                start_date: start_date,
                end_date: end_date,
                location: location,
                description: description,
                projects: projects,
                user_id : user_id
            });
            experienceadd.save((err, experience) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(experience);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/education/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            degree = req.body.degree;
            institute_name = req.body.institute_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;

            var expeducation = new Education({
                degree: degree,
                institute_name : institute_name,
                start_date : start_date,
                end_date : end_date,
                location : location,
                description : description,
                user_id : user_id
            });
            expeducation.save((err, education) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(education);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/certificate/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            certificate_name = req.body.certificate_name;
            institute_name = req.body.institute_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;

            var certificate = new Certificate({
                certificate_name : certificate_name,
                institute_name : institute_name,
                start_date : start_date,
                end_date : end_date,
                location : location,
                description : description,
                user_id : user_id
            });
            certificate.save((err, certificate) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(certificate);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/award/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            award_name = req.body.award_name;
            date = req.body.date;
            institute_name = req.body.institute_name;
            description = req.body.description;

            var award = new Award({
                award_name : award_name,
                date : date,
                institute_name : institute_name,
                description : description,
                user_id : user_id
            });
            award.save((err, award) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(award);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.get('/experience/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    experience = getExperience(user_id);
    res.json(experience);
})

router.get('/award/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    award = getAward(user_id);
    res.json(award)
})

router.get('/certificate/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    certificate = getCertificate(user_id);
    res.json(certificate)
})

router.get('/education/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    education = getEducation(user_id)
    res.json(education);
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