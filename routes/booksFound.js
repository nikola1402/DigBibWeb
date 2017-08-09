var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/booksFound', function(req, res, next) {
    res.render('booksFound', { title: 'Express' });
});

module.exports = router;
