const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/search.json?key=d306f40911d44be8953163933212109&q=' + address
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            if (body.error) {
                callback(body.error, undefined);
            }
            else {
                callback(undefined, {
                    latitude: body[0].lat,
                    longitude: body[0].lon,
                    location: body[0].name
                })    
            }
        }
    })
}

module.exports = geocode