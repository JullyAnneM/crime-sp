let express = require('express');
let router = express.Router();
let _ = require('lodash');
const request = require('request');

/* PostgreSQL and PostGIS module and connection setup */
const { Client, Query } = require('pg')

// Setup connection
var username = "marcello" // sandbox username
var password = "ab3389" // read only privileges on our table
var host = "35.227.111.153:5432"
var database = "gisdata" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection
var client = new Client(conString);
client.connect(); 
            

router.post('/getLatLong', function (req, res) {

     var encodedAddress = encodeURIComponent(req.body.adress);
    request({
        url: 'http://www.mapquestapi.com/geocoding/v1/address?key=zYYyNbvhsYGiE009abCUxyuNGAHjBCEC&location=' + encodedAddress,
        json: true,
    }, (error, response, body) => {
        if(body){
            if(_.get(body, "results[0].locations[0]", null)){
                var latitude = _.get(body, "results[0].locations[0].displayLatLng.lat", "Latitude não encontrado");
                var longitude = _.get(body, "results[0].locations[0].displayLatLng.lng", "Longitude não encontrado");
                console.log(latitude, longitude);
                var sql = "SELECT risco FROM teste3pol WHERE ST_Contains(teste3pol.geom, ST_SetSRID(ST_Point("+longitude.toString()+","+latitude.toString()+"), 4326));";   
                var query = client.query(new Query(sql));
                console.log(sql)
                var risk = [];
                query.on("row", function (row, result) {
                    risk.push(row);
                });
                query.on("end", () => {
                    json = {
                        lat: latitude,
                        long: longitude,
                        risk: risk
                    }
                    console.log(risk)
                    res.send(json);
                })
                
            }
            else{
              res.send({error:"Erro: Nenhum resultado obtido"})
            }
        } 
    });
});


module.exports = router;