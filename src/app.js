const path = require('path');
const express = require('express');
const hbs = require('hbs');
const url = require("url").url;
const geocode = require("./utils/geocode");
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
const rootPath = path.join(__dirname,'../public'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(rootPath));

app.get('', (req, resp) =>
{
    resp.render('index', {
        title: 'Root',
        name: 'Randy Kreisel'
    });
})

app.get('/help', (req, resp) =>
{
    resp.render('help', {
        title: 'Help',
        name: 'Randy Kreisel'
    });
})

app.get('/about', (req, resp) =>
{
    resp.render('about', {
        title: 'About',
        name: 'Randy Kreisel',
        description: "Developer Extraordinaire"
    });
})

app.get('/weather', (req, resp) => {
    resp.render("weather", {
        name: 'Randy Kreisel',
        title: "Weather"
    })
});

app.get('/weatherdata', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    if(!req.query.address) {
        return resp.send({
            "error" : 'The Address parameter must be provided!'
        });
    }
    geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return resp.send(error);
        }
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if (error){
                return resp.send(error);
            }
            resp.send({
                forecastData
            });
        })
        return;
    })
});
 
app.get('*', (req, resp) => {
    resp.render("error", {
        name : "Randy Kreisel",
        title: "Error",
        errorText: "Something went horribly wrong",
        queryString: req.url
    });
})

app.listen(port, () =>{
    console.log("running on port " + port);
});
