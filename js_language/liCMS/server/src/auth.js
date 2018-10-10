const hasha = require('hasha');
var randomstring = require("randomstring");

function log(req, res){
    console.log('auth.log();');
}

function getToken(req, res){
    let token = '';
    if(req.headers.token){
        token = req.headers.token;
        return token;
    }else if(req.params.token){
        token = req.params.token;
        return token;
    }else{
        return false;
    }
}

function login(req, res, db){
    // console.log('==========> auth.login(); /api/v1/user/login');
    // console.log('req.params = ', req.params);
    // console.log('req.body = ', req.body);

    let userLogin = req.body;
    userLogin.password = hasha(userLogin.password); // TODO:  check both username and password.
    // console.log('---userLogin', userLogin);
    db.users.findOne({ username: userLogin.username, password: userLogin.password }, function (err, doc) {
        if(doc){
            doc.token = randomstring.generate();
            doc.tokenTime = Math.floor(new Date() / 1000);
            doc.updateDate = new Date();
            db.users.update({username: userLogin.username}, doc, {}, function(err, numReplaced, affectedDocuments){
                // console.log('update token. err = ', err, 'numReplaced = ', numReplaced, ' affectedDocuments = ', affectedDocuments);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 1, info: 'Success: retrieve user successfully!', data:doc }));
            });
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'Error: Check your username and password and try again!', data:{} }));
        }
    });
}

function isloggedIn(req, res, db, executeFunctionAfterCheck){
    let timeDifference = 3600*24;
    let currentUnixTime = Math.floor(new Date() / 1000);
    let token = getToken(req, res);
    db.users.findOne({ token: token }, function (err, doc) {
        // console.log('doc ======>', doc);
        if(doc){
            timeDifference = currentUnixTime - doc.tokenTime;
            if(timeDifference<3600*8){ //TODO: should not hard code.
                executeFunctionAfterCheck(req, res, db);
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 0, info: 'login expired.', data:{} }));
            }
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'not log in yet.', data:{} }));
        }

    });
    return true;
}

module.exports.log = log;
module.exports.login = login;
module.exports.isloggedIn = isloggedIn;