var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
app.use(cors());
let geoCode = require('./geoCodeRotes.js');
app.use(bodyParser.json());
app.use('/', geoCode);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
