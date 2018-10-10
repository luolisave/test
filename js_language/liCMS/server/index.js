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

//
var auth = require('./src/auth');
var page = require('./src/page');


// var tmpPassword = 'pass1234';
// var doc = { username: 'admin'
//                , role: 'admin'
//                , password: 'pass1234'
//                , token: 'SDJIOQDJL32432DWIDJSKWDJKDS'
//                , tokenTime: 1531235997
//                , updateDate: new Date()
//                , status: 'active'
//                };

// db.users.insert(doc, function (err, newDoc) {   // Callback is optional
//     console.log('inserted:', newDoc);
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
// });

// app config
app.use(bodyParser.json());

// Express Route Configuration
app.use('/', express.static(path.join(__dirname, 'public'))); // app.use(express.static('public'));

app.post('/api/v1/user/login', (req, res) => {
    auth.login(req, res, db);
});

page.appRoute(app, db);

app.listen(3333, () => console.log('LiCMS server listening on port 3333!'));
