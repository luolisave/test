const path = require('path')
const express = require('express')
const app = express()

// Database (nedb)
var Datastore = require('nedb')
var db = {}
db.users = new Datastore({ filename: path.join(__dirname, 'private/nedb/users') });
db.users.loadDatabase();

var doc = { username: 'world2'
               , password: '12345'
               , updateDate: new Date()
               , status: 'active'
               };
 
db.users.insert(doc, function (err, newDoc) {   // Callback is optional
    console.log('inserted:', newDoc);
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});

// Express Route
app.use('/static', express.static(path.join(__dirname, 'public/static'))) // app.use(express.static('public')); 
app.use('/mock', express.static(path.join(__dirname, 'public/mock')))     // app.use('/static', express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3333, () => console.log('Example app listening on port 3333!'))
