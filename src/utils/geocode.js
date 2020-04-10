const rq = require('request-promise')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGlvbmVlcjE1NDEiLCJhIjoiY2s4c2RwdXhjMGJ3cDNtcXo4eGJ5bHA0ZCJ9.HsZysc_G-kaaHTYU_Pz18A'
    rq({url,json:true},(err,{body} = {})=> {
        if (err) {
            callback('Unable to connect to location services!',{undefined,undefined})
        }
        else if (body.features.length == 0){
            callback('Unable to find location,Try another search!',{undefined,undefined})
        }
        else{
            // console.log(body)
            callback(undefined,{
            location:body.features[0].place_name,
            position:body.features[0].center[1] + ', ' + body.features[0].center[0]
        })
        }
    })
}


module.exports = geocode