var express = require('express');
var path = require('path');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
    // res.render('index', {title:'Express'});
    // console.log(__dirname + '/../public/home.html');
    res.sendFile(path.join(__dirname, '..', '/public/home.html'));

    // This absolute path works
    // res.sendFile('C:/Users/Flowers/git/FriendFinder/app/public/home.html');
    // res.send('Welcome to my site!!!');
});

router.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '/public/survey.html'));;
});

router.get('/api/friends', function(req, res) {
    res.send('Wrong API page...');
});

module.exports = router;