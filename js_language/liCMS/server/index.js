const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// Database (nedb)
var Datastore = require('nedb')
var db = {}
db.users = new Datastore({ filename: path.join(__dirname, 'private/nedb/users') });
db.users.loadDatabase();
db.pages = new Datastore({ filename: path.join(__dirname, 'private/nedb/pages') });
db.pages.loadDatabase();

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
app.use(bodyParser.json())

// Express Route
app.use('/static', express.static(path.join(__dirname, 'public/static'))) // app.use(express.static('public')); 
app.use('/mock', express.static(path.join(__dirname, 'public/mock')))     // app.use('/static', express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/v1/user/login', (req, res) => {
    console.log('==========> /api/v1/user/login');
    console.log('req.params = ', req.params);
    console.log('req.body = ', req.body);
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(req.body));
    // res.send(JSON.stringify({ a: 1 }));
});

app.get('/api/v1/page/:pageId', (req, res) => {
    console.log('req.params = ', req.params);

    if(req.params && req.params.pageId !== undefined){
        db.pages.findOne({ _id: req.params.pageId }, function (err, doc) {
            // doc is the document Mars
            // If no document is found, doc is null
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                if(doc){
                    res.send(JSON.stringify({ status: 1, info: 'good!', data: doc }));
                }else{
                    res.send(JSON.stringify({ status: 0, info: 'cannot find doc!', data:{} }));
                }
                
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 0, info: err, data:{} }));
            }
        });
    }else{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ status: 0, info: 'pageId not exist!', data:{} }));
    }

    // let pageDoc = {
    //     pageId : 1,
    //     pageTitle: 'page title 1',
    //     pageContent: 'page content 1'
    // }
    // db.pages.insert(pageDoc, function (err, pageDoc) {   // Callback is optional
    //     console.log('inserted:', pageDoc);
    // });
});

app.listen(3333, () => console.log('Example app listening on port 3333!'))
