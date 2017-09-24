var express = require('express');
var router = express.Router();
var fs = require("fs");

var digitalBook = require('../models/digitalBook');








/** setting up storage using multer-gridfs-storage */
var storage = GridFsStorage({
    gfs : gfs,
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]);
    },
    /** with gridfs we can store aditional metadata along wit the file */
    metadata: function (req, file, cb) {
        cb(null, { originalname: file.originalname});
    },
    root: 'digitalneKnjige' //root name for collection to store files into
});

var upload = multer({   // multer settings for single upload
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            res.json({error_code:1, err_desc:err});
            return;
        }
        res.json({error_code:0, err_desc:null});
    });
});

app.get('/getDigitalBook', function (req, res) {

    gfs.collection('objekti.files');  //set collection name to lookup into

    /** provera da li fajl postoji */
    gfs.files.find({'metadata.inventoryNumber' : req.params.filename}).toArray(function (err, files) {
        if(!files || files.length === 0){
            return res.status(400).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        /** create read stream */
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "objekti.chunks"
        });
        /** set the proper content type */
        res.set('Content-Type', files[0].contentType);
        /** return response */
        return readstream.pipe(res);
    });
});

