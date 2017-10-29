var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    korisnickaZaduzenja: {type: String, required: true},

    reservations: {
        user: {type: Number, required: false}
    }

}, {collection: 'proba'});

module.exports = mongoose.model('Proba', schema);

