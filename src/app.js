const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Best Weather',
        name: 'vimal sutariya'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'vimal sutariya'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!'
        });
    }

    forecast(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error,
            });    
        }

        res.send({
            weather: response,
        });
    });
});

app.get('/about/*', (req, res) => {
    res.render('404Page', {
        message: 'About article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404Page', {
        message: '404 Page Found'
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})