var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    userID: {type: Number, required: true},
    zaduzenja: {
        bookName: {type: String, required: true},
        bookAuthor: {type: String, required: true},
        invNumber: {type: String, required: true},
        bookTaken: {type: String, required: true}
    }

}, {collection: 'istorijaZaduzenja'});

module.exports = mongoose.model('BookHistory', schema);

