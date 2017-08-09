var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/digitalLibrary', function(req, res, next) {
    res.render('digitalLibrary', { title: 'Express' });
});

module.exports = router;
