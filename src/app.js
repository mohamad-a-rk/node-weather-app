const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')
const port = process.env.PORT || 3000

console.log(__dirname)
let pathOfPublic = path.join(__dirname, '../public')
let pathOfPartials = path.join(__dirname, '../public/partials')
app.use(express.static(pathOfPublic))
// app.get('', (req, res) => {
//     res.send('<h1>Hello express </h1>')
// })

hbs.registerPartials(pathOfPartials)
app.set('view engine', 'hbs')

app.get('/help', (req, res) => {
    res.render('help', { title: "This is help page", name: "Mohammad" })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About page", name: "Mohammad" })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohammad'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: data.location,
                forecastData: forecastData
            })
        })
    })
    // res.send({
    //     forcast: 'cloudy',
    //     location: 'Palestine',
    //     address: req.query.address
    // })
})


app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMessage: "Articale not found !",
        title: 'Error 404',
        name: 'Mohammad'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        errorMessage: "Error 404",
        title: 'Error 404',
        name: "Mohammad"
    })
})

app.listen(port, () => {
    console.log('Server has started !')
})