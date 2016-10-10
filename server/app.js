var PORT = 80;

var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.json());

var map = {}; // should use redis.

String.prototype.contains = function(substring) {
    return this.indexOf(substring) > -1;
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*
    Adds a new shortlink. The post body should
    be in the format:

    {
        "short": "someshortlink",
        "long": "theredirecturl"
    }
*/
app.post('/add', function(req, res) {
    console.log('/add');
    console.log(req.body);

    if (req.body.hasOwnProperty('long') && req.body.hasOwnProperty('short')) {
        var link = req.body.long;
        map[req.body.short] = link;
        console.log('shortlink added');
        res.send('shortlink added');
    } else {
        console.log('invalid format');
        res.send('invalid format');
    }

});

/*
    Redirects a given shortlink to its
    appropriate url.
*/
app.get('/:shortlink', function(req, res) {
    console.log('/:shortlink');
    console.log(req.params);

    if (map.hasOwnProperty(req.params.shortlink)) {
        res.redirect(map[req.params.shortlink]);
        console.log('redirected successfully');
    } else {
        console.log('shortlink not found');
        res.sendStatus(404);
    }

});

console.log('minilink started on port ' + PORT)
app.listen(PORT);
