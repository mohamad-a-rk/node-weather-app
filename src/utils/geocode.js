const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9oYW1hZGt1a2h1biIsImEiOiJja3l5c3E4NGIwcGxzMnZxdm5penY3b2trIn0.93xvnlT8ve93-Wu1GCOOLw&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the service", undefined)
        } else if (response.body.features.length == 0) {
            callback("Location is not found", undefined)
        } else {
            const data = response.body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode