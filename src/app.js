const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 8080


//define paths for Express config

const publicDirectoryPath = path.join(__dirname,'../public')

//setup handlebars engine and views location
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/index',(req,res) =>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a address for search'
        })
    }
    geocode(req.query.search, (error, {location,position} = {}) => {
        // console.log('1111111111 ' + error)
        if (error){
            return res.send({
                error:error
            })
        }
        forecast(position, (error, forecastData = {}) => {
            if (error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecastData:forecastData,
                address:req.query.search
            })
          })
      })


    // res.send({
    //     forecast:'It is raining',
    //     location:'Palmerston North',
    //     address:req.query.search
    // })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Vincent'
    })
    console.log('User requests the about page')
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help you',
        message:'What do you want to know about me?',
        name:'Vincent'
    })
    console.log('User requests the help page')
})

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Vincent'
    })
    console.log('User requests the index page')
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        errorMessage:"Help article not found",
        title:'Weather App',
        name:'Vincent'
    })
    console.log('User requests the help.404 page')
})


app.get('/products',(req,res) =>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:"Page not found",
        title:'Weather App',
        name:'Vincent'
    })
    console.log('User requests the 404 page')
})



app.listen(port,() => {
    console.log('Service is up on port')
});