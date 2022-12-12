const express = require('express');
const passport = require('passport');
const controller = require('../controllers/access.controller');
const User = require('../modules/user.module');
const router = express.Router();

router.get('/logout', function(req, res) {
    req.logOut(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    });
});

router.route('/login')
    .get((req, res) => {
        res.render('login', {error: false, message: ''});
    })
    
    .post((req, res) => {
        req.logIn(new User({
            username: req.body.username,
            password: req.body.password
        }), function(err) {
            if (err) {
                res.render('error', {status: err.code || err.statusCode || 500, error: err});
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect(`../scum/${req.body.username}`);
                });
            }
        });
    });

router.route('/signup')
    .get((req, res) => {
        res.render('signup');
    })

    .post((req, res) => {
        User.register(new User({
            username: req.body.username,
            email: req.body.email,
        }), req.body.password, function(err, user) {
            if (err) {
                res.render('error', {status: err.code || err.statusCode || 500, error: err});
            } else {
                req.logIn(user, function(err) {
                    if (err) {res.render('error', {status: err.code || err.statusCode || 500, error: err})}
                    res.redirect(`../scum/${req.body.username}`);
                });
            }
        });
    });

module.exports = router;