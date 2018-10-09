
function log(req, res){
    console.log('page.log();');
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

function getPage(req, res, db){
    let token = getToken(req, res);

    if(token){
        // console.log('getPage() req.params = ', req.params, '\n req.headers=', req.headers);
        if(req.params && req.params.pageId !== undefined){
            db.pages.findOne({ _id: req.params.pageId }, function (err, doc) {// If no document is found, doc is null
                if(!err){
                    res.setHeader('Content-Type', 'application/json');
                    if(doc){
                        res.send(JSON.stringify({ status: 1, info: 'Success: document retrieved.', data: doc }));
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
    }else{
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ status: 0, info: 'No token provided or token expired, please login again.', data:{} }));
    }
}


// let pageDoc = {
//     pageId : 1,
//     pageTitle: 'page title 1',
//     pageContent: 'page content 1'
// }
// db.pages.insert(pageDoc, function (err, pageDoc) {   // Callback is optional
//     console.log('inserted:', pageDoc);
// });

module.exports.log = log;
module.exports.getPage = getPage;