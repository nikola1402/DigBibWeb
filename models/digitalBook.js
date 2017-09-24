var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    metadata: {
        inventoryNumber: {type: String, required: true},
        title: {type: String, required: true},
        creator: {type: String, required: true},
        subject: {type: String, required: true},
        description: {type: String, required: true},
        publisher: {type: String, required: true},
        date: {type: Number, required: true},
        format: {type: String, required: true},
        identifier: {type: String, required: true},
        source: {type: String, required: true},
        language: {type: String, required: true}
    },
    filename: {type: String, required: true},
    aliases: {type: String, required: false},
    chunkSize: {type: Number, required: true},
    uploadDate: {type: Date, required: false},
    length: {type: Number, required: true},
    contentType: {type: String, required: false},
    md5: {type: String, required: true}

}, {collection: 'objekti.files'});

module.exports = mongoose.model('DigitalBook', schema);