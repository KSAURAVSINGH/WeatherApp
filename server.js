const express =  require('express');
const bodyParser = require('body-parser')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/.env'})

const app=express();
const apiKey = process.env.apiKey;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{
        weather:null,
        error:null
    })
});

app.post('/',function(req,res){

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url,function(err,response,body){
        if(err)
        {
            res.render('index',{
                weather:null,
                error:'Sorry, there is an error. Please try again!'
            });
        }
        else
        {
            let weather = JSON.parse(body)
            if(weather.main==undefined)
            {
                res.render('index',{
                    weather:'Not able to predict the weather for this city.',
                    error: null
                });
            }
            else
            {
                let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
                res.render('index',{
                    weather:weatherText,
                    error: null
                });
            }
            
        }
    })
});



app.listen(8000,()=>{
    console.log("The server has started");
});











