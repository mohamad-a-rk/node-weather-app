const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a071d2ec1fc3ba87e1a288bf8766af43&query=" + latitude + "," + longitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Couldn't connect to the service", undefined)
        }
        else if (!response.body.current) {
            callback("Couldn't find", undefined)
        }
        else {
            const data = response.body.current
            callback(undefined, "It's currently " + data.temperature + " and it feels like " + data.feelslike)
        }
    })
}
module.exports = forcast