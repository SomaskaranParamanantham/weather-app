const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    //    const weatherURL = "http://api.weatherstack.com/current?access_key=4eb6b111352057695b409ad8e87d60f4&query=Colombo";
    const weatherURL = "http://api.weatherstack.com/current?access_key=4eb6b111352057695b409ad8e87d60f4&query="
     +latitude +"," + longitude;

        request({url: weatherURL, json: true}, (error, response) => {
                if(error){
                //console.log("There is an error connecting to the weather service!");
                callback("There is an error connecting to the weather service!", undefined);
            }else if(response.body.error){
                //console.log(" invalid location, please try another search!");
                callback(" invalid location, please try another search!", undefined);
            }
            else{
                const weather = response.body;
                // console.log("Temperature is " + weather.current.temperature + 
                // "degrees, but it feels like " + weather.current.feelslike + " degrees.");
                const report ="Temperature is " + weather.current.temperature + 
                     "degrees, but it feels like " + weather.current.feelslike + " degrees.";
                callback(undefined, report);
            }

        }); 
}

module.exports = forecast;
