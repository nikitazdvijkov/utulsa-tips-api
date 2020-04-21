const express = require('express'); // import express
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nik3ta:HELLOnik3ta@cluster0-9dbij.mongodb.net/test?retryWrites=true&w=majority', 
{useMongoClient: true}); // causes mongodb client to be used under the hood
// mongoose.connect('mongodb+srv://nik3ta:' + process.env.MONGO_ATLAS_PW + '@cluster0-9dbij.mongodb.net/test?retryWrites=true&w=majority') // to make with environment variable

const tipRoutes = require('./api/routes/tips');
const adminRoutes = require('./api/routes/nepeykozlenchikomstanish');

// middleware
// morgan somehow works with NEXT function to log requests to stdout
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false})); // pass in object to configure behavior of url parser: will not accept 'extended' - more complex data whatever that means
app.use(bodyParser.json());

// include some more middleware before routes
// adds CORS-enabling header
// does not send response, only modifies it
app.use((req, res, next) => {
    // first argument is header name, second arg is value
    res.header('Access-Control-Allow-Origin', '*'); 
    // adds (appends) new header
    // res.header('Access-Control-Allow-Origin', 'http://nznz.me'); // RESTRICTIVE, more secure alternative -- protects against other websites using your API, but not against Postman access

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === 'OPTIONS') { // the browser will always send OPTIONS request first when you send a POST or PUT request --- purpose: browser sees if you can send this request
        res.header(
            "Access-Control-Allow-Methods", 
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.header(200).json({}); // sends back emtyp object
    }
    next(); // how does this next thing work???
});

/* 
app.use : middleware that every request is funneled through
first arg : filter - any request that starts with '/tips'
second arg : use to process requests that pass thru filter
*/
// middleware that forwards requests to appropriate js files 

app.use('/tips', tipRoutes);

app.use('/nepeykozlenchikomstanish', adminRoutes);

/*
if script has made it to this line that means that previous were not triggered
because requested URL did not match endpoints
*/
app.use((req, res, next) => {
    const error = new Error('NOT FOUND!!!');
    error.status = 404; // if assigned with parens as METHOD error.status(400) WILL NOT WORK
    next(error)
});

/*
this will catch ANY error in the application
including database access errors
*/
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message // you can rely on all errors having a message property
        }
    });
});

module.exports = app;