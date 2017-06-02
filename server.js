var express = require('express');
var hbs = require('hbs');
var app = express();
var fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/partials');
//hbs.registerPartials(__dirname + '/views');

app.set('view engine','hbs');


//if we dont use next page load nhi hoyega ohdo tk

app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log  = `Date${now}..${req.method}...${req.url} `
    fs.appendFile('serverMessg',log + '\n',(err)=>{
        if(err){
            console.log('unable to append file');
        }
    })
    console.log(log);
    next();
});
//eh ohdo use hou jdo site bnd hove te jo v kholange ta ahi page sahmne au... 
//app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
//});


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views/cal'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})


//var person = {
//    name : 'saravjot',
//    age : 23,
//    bikes : [
//        'bullet',
//        'yamhaba',
//        'mopad'
//    ]
//
//}

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        title:'Project',
    });
})

app.get('/calculator',(req,res)=>{
    res.render('calculator.hbs');
})

app.get('/calculator',(req,res)=>{
    res.render('index.css');
})

app.get('/',(req,res) => {
   //res.send('<h1>Hello Express!</h1>'); 
    res.render('home.hbs',{
        homeTitle : 'Home Page',
        //currentYear : new Date().getFullYear()
    });   
       
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle : 'About Page',
        //currentYear : new Date().getFullYear()
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'404 Error'
    });
});


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});