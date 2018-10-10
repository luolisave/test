const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Database (nedb)
var Datastore = require('nedb');
var db = {};
db.users = new Datastore({ filename: path.join(__dirname, 'private/nedb/users') });
db.users.loadDatabase();
db.pages = new Datastore({ filename: path.join(__dirname, 'private/nedb/pages') });
db.pages.loadDatabase();

// import modules
var auth = require('./src/auth');
var user = require('./src/user');
var page = require('./src/page');


// app config
app.use(bodyParser.json());

// Express Route Configuration
app.use('/', express.static(path.join(__dirname, 'public'))); // app.use(express.static('public'));
page.appRoute(app, db);
user.appRoute(app, db);

// Start app
app.listen(3333, () => console.log('LiCMS server listening on port 3333!'));
