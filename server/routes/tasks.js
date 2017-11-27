var express = require('express');
var router = express.Router();

// var router = require('express').Router();
// does the same thing as the two lines above

var pool = require('../modules/pool');

router.get( '/', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks ORDER BY id;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    }) 
})

module.exports = router;