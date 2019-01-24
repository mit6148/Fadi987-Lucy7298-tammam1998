const mongoose = require ('mongoose');


const UserModelSchema = mongoose.Schema({
    name: String,
    googleid: String,
    best_score: Number,
    all_games: [{'score': Number, 'time_stamp': String}], 
});

module.exports = mongoose.model('UserModel', UserModelSchema);