const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

// Get the express server
const app = express();

console.log(process.env.PORT);

const port = process.env.PORT || 3000;

// Set the express server to use hbs view engine
app.set("view engine", "hbs");

// Register the views path  and the partials path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("views", viewsPath); 
//Partials
hbs.registerPartials(partialsPath);


// Register the static file path
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
//console.log(publicDirectoryPath);


//console.log(__dirname);
//console.log(__filename);

const author ="Jana";


app.get("/", (req, res) => {
    //res.send("Hello Express!");
    res.render("index", {
       title: "Weather",
        name: author
    });
});



app.get("/about", (req,res) => {
    //res.send("About page");
    res.render("about", {
        title: "About",
        name: author
    });
});

// SSH Secure Shell Private key in my computer
// i send a public key to the machine the i want to communicate

app.get("/help", (req,res) => {
    //res.send("Help page");
    res.render("help", {
        title: "Help",
        name: author
    });
});

app.get("/weather", (req, res) => {
        //console.log(req.query.address);
        if(!req.query.address){
           // console.log("address is not provided");
           return res.send({ 
               error: "You my provide an address."
           });  
           //return; 
        }


        geocode(req.query.address, (error , response) => {
            if(error){
             return   res.send({
                    error: error
                });
            }

            forecast(response.latitude, response.longitude, (error, forecastData) => {
                    if(error){
                        return  res.send({
                            error: error
                        });
                    }

                    res.send({
                        forecast: forecastData,
                        location : response.location,
                        address: req.query.address
                    })
            });
        });


    //res.send("Weather Page");
    // res.send({
    //     forecast: "It's really hot here.",
    //     location: "Colombo"
    // });
});

// app.get("/products", (req,res) => {
//     console.log(req.query);
//     res.send({
//         products: []
//     });
// });

app.get("*", (req, res) => {
    //res.send("404 page not found"); //wildcard
    res.render("404", {
        title: 404,
        error: "404 page not found",
        name: author
    });
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
})