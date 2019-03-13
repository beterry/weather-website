const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/a1ebb0b08331a35d981bed74d5c02816/${lat},${lng}`
    request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather services!')
            } else if (body.error) {
                callback('Unable to find that location. Please try another.')
            }else {
                const {temperature, precipProbability} = body.currently
                callback(undefined, `It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
            }
        })
}

module.exports = forecast