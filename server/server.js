var express = require('express');
var bodyParser = require('body-parser');

var tasks = require('./routes/tasks');

var app = express();
var port = 5000;

// everything we're dependent on goes at the top

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/tasks', tasks);

app.listen(port, function(){
    console.log('server is listening on port', port);
});