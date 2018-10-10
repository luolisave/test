const jsonSize = require('json-size');
const auth = require('./auth');
const CONSTANTS = require('./const');

function log(req, res){
    console.log('page.log();');
}


function getX(req, res, db, dbX){
    auth.isloggedIn(req, res, db, dbX, function(req, res, dbX){
        console.log("callback inside auth.isloggedIn();");
        // console.log('getX() req.params = ', req.params, '\n req.headers=', req.headers);
        if(req.params && req.params.xId !== undefined){
            dbX.findOne({ _id: req.params.xId }, function (err, doc) {// If no document is found, doc is null
                if(!err){
                    res.setHeader('Content-Type', 'application/json');
                    if(doc){
                        res.send(JSON.stringify({ status: 1, info: 'Success: document retrieved.', data: doc }));
                    }else{
                        res.send(JSON.stringify({ status: 0, info: 'cannot find document!', data:{} }));
                    }
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ status: 0, info: err, data:{} }));
                }
            });
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'xId not exist!', data:{} }));
        }
    });
}

function listX(req, res, db, dbX){
    auth.isloggedIn(req, res, db, dbX, function(req, res, dbX){
        console.log('listPage() req.params = ', req.params); // , '\n req.headers=', req.headers
        dbX.find({type:'page'}, function (err, docs){
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                if(docs){
                    res.send(JSON.stringify({ status: 1, info: 'Success: documents retrieved.', data: docs }));
                }else{
                    res.send(JSON.stringify({ status: 0, info: 'cannot find doc!', data:{} }));
                }
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 0, info: err, data:{} }));
            }
        });
    });
}

function createX(req, res, db, dbX){
    auth.isloggedIn(req, res, db, dbX, function(req, res, dbX){
        let pageObj = req.body;
        let jsonSizeInBytes = jsonSize(pageObj);
        console.log('--------->',pageObj, ' jsonSizeInBytes=',jsonSizeInBytes);
        if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT){
            dbX.insert(pageObj, function (err, pageDoc) {   // Callback is optional
                if(err){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ status: 0, info: 'Error: page not inserted.', data:{} }));
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ status: 1, info: 'new page inserted', data:pageDoc }));
                }
                // console.log('inserted object:', pageDoc);
            });
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(
                    {
                        status: 0,
                        info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes. Change const.js PAGE_DOC_BYTES_LIMIT to increase the limits.`,
                        data:{}
                    }
                )
            );
        }

    });
}

function updateX(req, res, db, dbX){
    auth.isloggedIn(req, res, db, dbX, function(req, res, dbX){
        let pageObj = req.body;
        // console.log('--------->',pageObj);
        if(req.params && req.params.xId !== undefined) {
            let jsonSizeInBytes = jsonSize(pageObj);
            if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT) {
                dbX.update({_id:req.params.xId}, pageObj, function (err, numUpdated) {   // Callback is optional
                    if(err){
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ status: 0, info: 'Error: page not updated.', data:{} }));
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({ status: 1, info: `Success: ${numUpdated} record updated.`, data:{} }));
                    }
                    // console.log('inserted object:', pageDoc);
                });
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(
                    JSON.stringify(
                        {
                            status: 0,
                            info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes. Change const.js PAGE_DOC_BYTES_LIMIT to increase the limits.`,
                            data:{}
                        }
                    )
                );
            }
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'Error: page id not provided.', data:{} }));
        }
    });
}

function delX(req, res, db, dbX){
    auth.isloggedIn(req, res, db, dbX, function(req, res, dbX){
        if(req.params && req.params.xId !== undefined) {
            dbX.remove({_id:req.params.xId},false,function(err, numRemoved){
                if(err){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ status: 0, info: 'Error: page not deleted.', data:{} }));
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ status: 1, info: `${numRemoved} line(s) removed.`, data:{} }));
                }
            });
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'Error: page id not provided.', data:{} }));
        }
    });
}

// let pageDoc = {
//     xId : 1,
//     pageTitle: 'page title 1',
//     pageContent: 'page content 1'
// }
// db.pages.insert(pageDoc, function (err, pageDoc) {   // Callback is optional
//     console.log('inserted:', pageDoc);
// });


function appRoute(app, db){
    app.post('/api/v1/page/create', (req, res) => {
        createX(req, res, db, db.pages);
    });

    app.get('/api/v1/page/list', (req, res) => {
        listX(req, res, db, db.pages);
    });

    app.patch('/api/v1/page/:xId', (req, res) => {
        updateX(req, res, db, db.pages);
    });

    app.get('/api/v1/page/:xId', (req, res) => {
        getX(req, res, db, db.pages);
    });

    app.delete('/api/v1/page/:xId', (req, res) => {
        delX(req, res, db, db.pages);
    });
}

module.exports.log = log;
module.exports.appRoute = appRoute;