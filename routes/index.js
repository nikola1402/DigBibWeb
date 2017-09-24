var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var conn = mongoose.connection;
var path = require('path');
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var Book = require('../models/book');
var DigitalBook = require('../models/digitalBook');
var Proba = require('../models/proba');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
});

router.get('/booksFound', function(req, res, next) {
    res.render('booksFound', { title: 'Express' });
});

router.get('/digitalLibrary', function(req, res, next) {
    res.render('digitalLibrary/digitalIndex', { title: 'Express' });
});

router.get('/digitalBooksFound', function (req, res, next) {
    res.render('digitalLibrary/digitalBooksFound', {digitalBooks: 'digitalBooks'});
});

router.post('/reserveBook', function (req, res, next) {

    var query = {'inventoryData.inventarniBroj': req.body.invBroj};
    var UID = req.user.userID;
    Book.updateOne(query, { $push: {'reservations': UID}}, {safe: true, new: true}, function(err, raw) {
        if (err) {
            console.log('GRESKA '+ err);
        }
        console.log('The raw response from Mongo was ', raw);
    });


    console.log('InvNumber: ' +req.body.invBroj);

    return res.status(400).json({
        knjiga: req.body.invBroj,
        user: req.user.userID

    });




});

router.get('/searchLibrary', function(req, res, next) {
    res.render('library/searchLibrary', { title: 'Express'});
});

router.get('/booksFound', function (req, res, next) {
    res.render('library/booksFound', {books: 'books', user: req.user});

});

router.post('/findBooks', function (req, res, next) {

    var type = req.body.typeQuery;

    if (type == 'naslov'){
        Book.find({'processed.stvarniNaslovOdgovornost.a': {$regex: req.body.bookQuery, $options: 'i'}})
            .then(function (books) {
                console.log('KNJIGE NADJENE: '+books);
                //console.log('TIP: ' +type);

                res.render('library/booksFound', {books: books});
            });
    } else if (type == 'autor'){
        Book.find({'processed.stvarniNaslovOdgovornost.f': {$regex: req.body.bookQuery, $options: 'i'}})
            .then(function (books) {
                console.log('KNJIGE NADJENE: '+books);
                //console.log('TIP: ' +type);

                res.render('library/booksFound', {books: books});
            });
    } else if (type == 'godina') {
        Book.find({'processed.izdavanje.d': req.body.bookQuery})
            .then(function (books) {
                console.log('KNJIGE NADJENE: '+books);
                //console.log('TIP: ' +type);

                res.render('library/booksFound', {books: books});
            });
    }

});


router.get('/digitalBooksFound', function (req, res, next) {
    res.render('digitalLibrary/digitalBooksFound', {digitalBooks: 'digitalBooks'});
});

router.post('/findDigitalBooks', function (req, res, next) {
    var type = req.body.typeQuery;
    console.log('TIP: ' +type);
    if (type == 'naslov'){
        DigitalBook.find({'metadata.title': {$regex: req.body.digitalBookQuery, $options: 'i'}})
            .then(function (digitalBooks) {
                console.log('KNJIGE NADJENE: '+digitalBooks);
                //console.log('TIP: ' +type);

                res.render('digitalLibrary/digitalBooksFound', {digitalBooks: digitalBooks});
            });
    } else if (type == 'autor'){
        DigitalBook.find({'metadata.creator': {$regex: req.body.digitalBookQuery, $options: 'i'}})
            .then(function (digitalBooks) {
                console.log('KNJIGE NADJENE: '+digitalBooks);
                //console.log('TIP: ' +type);

                res.render('digitalLibrary/digitalBooksFound', {digitalBooks: digitalBooks});
            });
    } else if (type == 'godina') {
        DigitalBook.find({'metadata.date': req.body.digitalBookQuery})
            .then(function (digitalBooks) {
                console.log('KNJIGE NADJENE: '+digitalBooks);
                //console.log('TIP: ' +type);

                res.render('digitalLibrary/digitalBooksFound', {digitalBooks: digitalBooks});
            });
    }
});
//

router.post('/getDigitalBook', function (req, res) {
        console.log('-Connection open-');
        var gfs = Grid(conn, mongoose.mongo);
        var oid = mongoose.Types.ObjectId(req.body.button);

        gfs.collection('objekti');  // Zadaje naziv kolekcije

        gfs.files.find({'_id': oid}).toArray(function (err, files) {
            if (!files || files.length === 0) {
                return res.status(400).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            /** Pravi readstream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename
            });
            /** Ucitava readstream na stranicu */
            readstream.pipe(res);
        });
    });

module.exports = router;


