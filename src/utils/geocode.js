const request = require("postman-request");


const geocode = (address, callback) => {
    // const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/Colombo.json?access_token=pk.eyJ1Ijoic29tYXNrYXJhbiIsImEiOiJja3Q2cjE4bjMwbDBxMnBuOXJncjFybHhhIn0.k2sWjeqiTRhaU404JTtNLw&limit=1";
    const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1Ijoic29tYXNrYXJhbiIsImEiOiJja3Q2cjE4bjMwbDBxMnBuOXJncjFybHhhIn0.k2sWjeqiTRhaU404JTtNLw&limit=1";
            request ({url: geoURL, json:true}, (error, response) => {
                if(error){
                    callback("There is an error connecting to the geolocation service!", undefined);
                    //console.log("There is an error connecting to the geolocation service!");
                }else if(response.body.features.length ===0){
                    callback("Location not found, please try another search!", undefined);
                    //console.log("Location not found, please try another search!");
                }
                else{
                    
                   const data = {
                        latitude: response.body.features[0].center[1],
                        longitude : response.body.features[0].center[0],
                        location : response.body.features[0].place_name
                    }
                    callback(undefined, data);

                    // const latitude = response.body.features[0].center[1];
                    // const longitude =  response.body.features[0].center[1];
                    // const location = response.body.features[0].place_name;


                    // console.log(latitude);
                    // console.log(longitude);
                    // console.log(location);
                }
});

}

module.exports = geocode;