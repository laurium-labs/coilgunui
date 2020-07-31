const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var request = require('request');
var cors = require('cors')

app.use(cors())

app.use('/', function (req, res) {
    var url = "http://34.237.210.243" + req.url;
    req.pipe(request({ qs: req.query, uri: url })).pipe(res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))