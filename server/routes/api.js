// dependencies
const express = require('express');
const connect = require('connect-ensure-login');
var request = require('request');
const router = express.Router();

// api endpoints

router.get('/fetchnews', function(req, res) {
    request('https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=' + process.env.NEWS_API_KEY, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    big_json = JSON.parse(body);

    res.send(big_json);
    });
});


module.exports = router;