const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=d306f40911d44be8953163933212109&q=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                city: body.location.name,
                region: body.location.region,
                country: body.location.country,
                currentTempC: body.current.temp_c,
                currentTempF: body.current.temp_f,
                conditions: body.current.condition
            })                
        }
    })
}

module.exports = forecast