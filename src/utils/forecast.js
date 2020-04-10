const rq = require('request-promise')
const forecast = (position,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=04f4886df8c83de9584036bc588a8274&query=' + position
    // console.log(url)
    rq({url,json:true},(error,{ body }) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to weather services!',undefined)
        }else if (body.current.observation_time == null){
            callback('Unable to find the location,Try another search',undefined)
        }else{
            callback(undefined,body.location.name + ',its weather is ' + body.current.weather_descriptions[0] + ' and its temperature is ' + body.current.temperature + '  degrees! ')
        }
    })
}

module.exports = forecast