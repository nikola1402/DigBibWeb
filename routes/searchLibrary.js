var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/searchLibrary', function(req, res, next) {
    res.render('searchLibrary', { title: 'Express' });
});

module.exports = router;
