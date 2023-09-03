const request = require('request');

const forecast = (Address, Callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf423043ced7b8e4cd1165a04854fb47&query=' + Address + '';
    
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            Callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            Callback('Unable to find location', undefined);
        } else {  
            const { current: { temperature, feelslike } } = body;  
            Callback(undefined, `It is currently ${temperature} degree outside and it feels like ${feelslike} degree`);
        }
    });    
}

module.exports = forecast;