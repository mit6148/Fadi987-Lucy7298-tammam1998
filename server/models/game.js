const mongoose = require ('mongoose'); 

const GameModelSchema = mongoose.Schema({
    timestamp : String, 
    score: String,
});

module.exports = mongoose.model('GameModel', GameModelSchema);