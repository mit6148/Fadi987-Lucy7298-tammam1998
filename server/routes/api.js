// dependencies
const express = require('express');
const connect = require('connect-ensure-login');
var request = require('request');


// models
const GameSchema = require("../models/game"); 
const User = require('../models/user');

const router = express.Router();

// api endpoints

router.get('/fetchnews', function(req, res) {
    request('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    big_json = JSON.parse(body);

    res.send(big_json);
    });
});


module.exports = router;
router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});



router.put('/user', function(req, res) {
            User.findOneAndUpdate({_id: req.user._id}, {$push: {'all_games': {'score': req.body.score, 'time_stamp': req.body.timestamp}}}, {new: true}, function(err, user) {
                if (!err) {
                    console.log('success');
                    if (req.body.score > user.best_score || !user.best_score){
                        user.update({$set: {'best_score': req.body.score}}, function(err, user) {
                            if (!err) {
                                console.log('success again!'); 
                            } else {
                                console.log('oh no crycrycry'); 
                                console.log(err);
                            }
                        })
                    }
                } else {
                    console.log('something went wrong');
                    console.log(err); 
                }
            });
        })

router.get('/user', function(req, res) { 
            User.find({_id: req.query._id}, function(err, user) {
                if (!err) {
                    res.send(user);
                } else {
                    res.write("fail");
                }
            });
        }); 

router.get('/all', function(req, res) {
    User.find({}, function(err, users) {
        res.send(users); 
    }); 
}); 


router.get('/high_scores', function(req, res) {
    User.aggregate([{ $sort : { best_score : -1 } }, {$limit: 10}], function(err, sorted) {
        if (err) {
            console.log(err); 
        } else {
            console.log("success");
            res.send(sorted); 
        }
    })
}); 


module.exports = router;
