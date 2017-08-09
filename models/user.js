var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({

    name: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: {type: String, required: true},
    parent: {type: String, required: true},
    document: {type: String, required: true},
    documentID: {type: Number, required: true},
    userID: {type: Number, required: true},
    membership: {
        joinDate: {type: String, required: true},
        expireDate: {type: String, required: true},
        joinType: {type: String, required: true},
        price: {type: Number, required: true}
    }

});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);