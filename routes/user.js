var express = require('express');
var router = express.Router();
//var csrf = require('csurf');
var passport = require('passport');
var BookHistory = require('../models/bookHistory');

//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile', {user: req.user});
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.post('/findBooksHistory', isLoggedIn, function (req, res, next) {

    var UID = req.body.UID;
    console.log('KORISNIK: '+UID);

    BookHistory.find({'userID': UID})
        .then(function (booksHistory) {
        console.log('ISTORIJA ZADUZENJA: '+ booksHistory);
        res.render('user/booksHistory', {booksHistory: booksHistory});
    });
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/login', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/login'
        // , {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0}
        );
});

router.post('/login', passport.authenticate('local.login', {
    failureRedirect: 'user/login',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('user/profile');
    }
});





module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}