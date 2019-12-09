var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Experience = require('../models/experience');
var Education = require('../models/education');
var Certificate = require('../models/certificate');
var Award = require('../models/award');
var multer = require('multer');
var Highlights = require('../models/highlights');
var puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const moment = require('moment');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});


var upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).any();
// Add Product
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error : Image Only');
    }
}

const compile = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'views', `${templateName}.hbs`);
    console.log("yha to aya filePath: " + filePath)
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

hbs.registerHelper('dateFormat', (value, format) => {
    return moment(value).format(format);
})

var htmlToPdf = async function(data) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("yha to aya : ")
    const content = await compile('profile', data)

    await page.emulateMedia('screen');
    await page.pdf({
        path: 'resume.pdf',
        format: 'A4',
        printBackground: true
    });

    await browser.close();
}

router.get('/getprofile', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user.email })
        .then((user) => {
            var result = {};
            result['user'] = user;
            return result;
        })
        .then((result) => {
            return Certificate.find({ user_id: req.user.id }).exec()
                .then((certificate) => {
                    result['certificate'] = certificate;
                    return result;
                });
        })
        .then((result) => {
            return Award.find({ user_id: req.user.id }).exec()
                .then((award) => {
                    result['award'] = award;
                    return result;
                });
        })
        .then((result) => {
            return Education.find({ user_id: req.user.id }).exec()
                .then((education) => {
                    result['education'] = education;
                    return result;
                });
        })
        .then((result) => {
            return Experience.find({ user_id: req.user.id }).exec()
                .then((experience) => {
                    result['experience'] = experience;
                    return result;
                });
        })
        .then((result) => {
            return Highlights.findOne({ user_id: req.user.id }).exec()
                .then((highlight) => {
                    result['highlight'] = highlight;
                    return result;
                });
        })
        .then(function(result) {
            // htmlToPdf(result)
            result['notSharable'] = true;
            res.render('profile', result);
        })
        .catch((e) => {
            console.log(e)
        })
});



router.get('/getprofile/:username', (req, res) => {
    username = req.params.username;
    let notSharable;
    if (req.isAuthenticated()) {
        notSharable = true;
    } else {
        notSharable = false;
    }
    User.findOne({username : username})
        .then((user) => {
            var result = {};
            result['user'] = user;
            return result;
        })
        .then((result) => {
            return Certificate.find({ user_id: result['user']._id }).exec()
                .then((certificate) => {
                    result['certificate'] = certificate;
                    return result;
                });
        })
        .then((result) => {
            return Award.find({ user_id: result['user']._id }).exec()
                .then((award) => {
                    result['award'] = award;
                    return result;
                });
        })
        .then((result) => {
            return Education.find({ user_id: result['user']._id }).exec()
                .then((education) => {
                    result['education'] = education;
                    return result;
                });
        })
        .then((result) => {
            return Experience.find({ user_id: result['user']._id }).exec()
                .then((experience) => {
                    result['experience'] = experience;
                    return result;
                });
        })
        .then((result) => {
            return Highlights.findOne({ user_id: result['user']._id }).exec()
                .then((highlight) => {
                    result['highlight'] = highlight;
                    return result;
                });
        })
        .then(function(result) {
            result['notSharable'] = notSharable;
            // htmlToPdf(result)
            res.render('profile', result);
        })
        .catch((e) => {
            console.log(e)
        })
});

router.post('/addimage/:id', ensureAuthenticated, upload, (req, res) => {
    try {
        user_id = req.params.id;
        let message;
        User.findById(user_id, (err, user) => {
            if (err) {
                message = "Some erro occured";
                res.status(404).send({ message: message, data: {} });
            } else if (user) {
                var profile_image = req.files[0].filename;
                user.profile_image = profile_image;
                user.save((err, user) => {
                    if (err) {
                        message = "Only Image are allowed";
                        res.status(400).send({ message: message, data: {} });
                    }
                    message = "Your profile is updated";
                    res.status(201).send({ message: message, data: user });
                });
            } else {
                message = "User not found with id";
                res.status(404).send({ message: message, data: {} });
            }
        })
    } catch (e) {
        console.log(e);
    }

})

router.post('/editprofile/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    let message;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
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
                if (err) {
                    message = "Duplicate Entry found";
                    res.status(422).send({ message: message, data: {} });
                }
                message = "Your profile is updated";
                res.status(201).send({ message: message, data: user });
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    })
})

router.post('/highlights/:id', ensureAuthenticated, (req, res) => {
    let user_id = req.params.id;
    highlightNames = req.body.highlightName;
    Highlights.findOne({ user_id: user_id })
        .then((highlight) => {
            if (highlight) {
                let list = [];
                list = highlight.highlightName;
                list = highlightNames;
                highlight.highlightName = list;
                return highlight.save().then((highlight) => {
                    return highlight;
                });
            }else{
                var addHeighlight = new Highlights({ highlightName : highlightNames , user_id : user_id});
                addHeighlight.save()
                .then((highlight)=>{
                    return highlight;
                })
            }
        })
        .then(function(highlight) {
            message = "Highlight is Added to your profile";
            res.status(201).send({ message: message, data: highlight });
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
        req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;