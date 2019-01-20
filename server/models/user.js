const mongoose = require ('mongoose');

const UserModelSchema = mongoose.Schema({
    name: String,
    googleid: String,
    best_score: String,
});

module.exports = mongoose.model('UserModel', UserModelSchema);