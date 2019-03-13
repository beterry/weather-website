const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmV0ZXJyeTEyIiwiYSI6ImNqc3RiZ25qZDA2cHkzeXVzcGdneTc1NzYifQ.Fd4wo9bwixEbDMLk61HsyQ`
    request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!')
            } else if (body.features.length === 0) {
                callback('Unable to find that location. Please try another.')
            }else {
                callback(undefined, {
                    lat: body.features[0].center[1],
                    lng: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = geocode