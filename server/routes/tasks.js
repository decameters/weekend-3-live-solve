var express = require('express');
var router = express.Router();

// var router = require('express').Router();
// does the same thing as the two lines above

var pool = require('../modules/pool');

router.get( '/', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        // just parameter names, what matters is the order
        // the first is always the error
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasks ORDER BY is_completed, id;', function(errorMakingQuery, result){
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

router.post('/', function(req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO tasks (name)
            VALUES ($1);`, [req.body.name], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

router.put('/complete/:id', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE tasks SET is_completed=TRUE WHERE id=$1`, [req.params.id], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    })
})

router.delete('/remove/:id', function (req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM tasks WHERE id=$1`, [req.params.id], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    }) 
})

module.exports = router;