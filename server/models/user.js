const mongoose = require ('mongoose');

const UserModelSchema = mongoose.Schema({
    name: String,
    best_score: String,
});

module.exports = mongoose.model('UserModel', UserModelSchema);