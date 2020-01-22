// get dependencies
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
//const mongoose = require('mongoose');
const routes = require('./routes');

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./product.routes.js')(app);
require('./customer.routes.js')(app);
//require('./index.html')(app);
//require('./routes.js')(app);
app.use(express.json());
app.use('/api/routes', routes);
//app.use('./routes', routes)
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to ZeptoBook Product app" });
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});