var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'lastName',
    passReqToCallback: true
}, function(req, name, lastName, done) {
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('lastName', 'Invalid last name').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];

        errors.forEach(function(error) {
            messages.push(error.msg);
        });

        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'name': name}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        // if (!user.validPassword(lastName)) {
        //     return done(null, false, {message: 'Wrong lastname.'});
        // }
        return done(null, user);
    });
}));

