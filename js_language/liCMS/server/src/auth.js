const CONSTANTS = require('./const');

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

function isloggedIn(req, res, db, executeFunctionAfterCheck){
    let timeDifference = 0;
    let currentUnixTime = Math.floor(new Date() / 1000);
    let token = getToken(req, res);
    db.users.findOne({ token: token }, function (err, doc) {
        // console.log('doc ======>', doc);
        if(doc){
            timeDifference = currentUnixTime - doc.tokenTime;
            if(timeDifference < CONSTANTS.USER_LOGIN_TIMEOUT){
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

module.exports.isloggedIn = isloggedIn;