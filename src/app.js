const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

const app = express()

// Setup static files
app.use(express.static(publicDir))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ben'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ben'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Ooops! You need some help?',
        name: 'Ben'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    let location = req.query.address
    geocode(location, (error, {lat, lng, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(lat, lng, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Ben'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Ben'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000, baby')
})