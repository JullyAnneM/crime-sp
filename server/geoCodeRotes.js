let express = require('express');
let router = express.Router();
let _ = require('lodash');
const request = require('request');



router.post('/getLatLong', function (req, res) {
    var encodedAddress = encodeURIComponent(req.body.adress);
    request({
        url: 'http://www.mapquestapi.com/geocoding/v1/address?key=zYYyNbvhsYGiE009abCUxyuNGAHjBCEC&location=' + encodedAddress,
        json: true,
    }, (error, response, body) => {
        if(body){
            if(_.get(body, "results[0].locations[0]", null)){
                json = {
                    lat: _.get(body, "results[0].locations[0].displayLatLng.lat", "Latitude não encontrado"),
                    long: _.get(body, "results[0].locations[0].displayLatLng.lng", "Longitude não encontrado"),
                }
                res.send(json);
            }
            else{
              res.send({error:"Erro: Nenhum resultado obtido"})
            }
        } 
    });
});

module.exports = router;