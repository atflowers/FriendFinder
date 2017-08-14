var express = require('express');
var path = require('path');
const fs = require('fs');
// var bodyParser = require('body-parser');
var router = express.Router();
var friendArray = require("../data/friends");
// router.use(bodyParser.urlencoded({ extended: true }));

// GET home page.
router.get('/api/friends', function(req, res) {
    // console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', '/data/friends.js'));
    // res.sendFile(path.join(__dirname, '..', '/data/friends.js'));
    // res.json(path.join(__dirname, '..', '/data/friends.js'));
});

router.post('/api/friends', function (req, res) {
    // console.log(req.body);
    // console.log(req.route);
    // console.log(this);
    
    var isDuplicate = false;
    friendArray.forEach(function(item, index){
        if (item.name === req.body.name) {
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        res.send('duplicate');
    } else {
        var bestScore = 50;
        var bestMatch;
        friendArray.forEach(function(item, index){
            var numArr = 0;
            item.scores.forEach(function(itm, ind){
                // console.log(req.body.scores[ind]);
                numArr += Math.abs(itm - req.body.scores[ind]);
            });
            // console.log(index + ': ' + numArr);
            console.log(item.name + " has a match score of " + numArr);
            if (numArr < bestScore) {
                bestScore = numArr;
                bestMatch = index;
            }
        });
        console.log('The best match is ' + friendArray[bestMatch].name + ' with a score of ' + bestScore + '.');
        friendArray.push(req.body);

        // Return the friend with the best match
        res.json(friendArray[bestMatch]);

        // res.end(JSON.stringify(req.body));
        // res.sendFile(path.join(__dirname, '..', '/data/friends.js'));
        // if (req.body) {
        //     roster.push(req.body);
        //     res.send('Student added joe!');
        // } else {
        //     res.send('You are wrong! Enter data, foo. Issue to the max.');
        // }

        var newFriends = "var friendArray = " + JSON.stringify(friendArray) + "; module.exports = friendArray;";
        // console.log(newFriends);
        fs.writeFile(path.join(__dirname, '..', '/data/friends.js'), newFriends, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        }); 
    }
});

module.exports = router;