const jsonSize = require('json-size');
const auth = require('./auth');
const CONSTANTS = require('./const');

function log(req, res){
    console.log('page.log();');
}


function getPage(req, res, db){
    auth.isloggedIn(req, res, db, function(req, res, db){
        console.log("callback inside auth.isloggedIn();");
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
    });
}

function listPage(req, res, db){
    auth.isloggedIn(req, res, db, function(req, res, db){
        console.log('listPage() req.params = ', req.params); // , '\n req.headers=', req.headers
        db.pages.find({type:'page'}, function (err, docs){
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

function createPage(req, res, db){
    auth.isloggedIn(req, res, db, function(req, res, db){
        let pageObj = req.body;
        let jsonSizeInBytes = jsonSize(pageObj);
        console.log('--------->',pageObj, ' jsonSizeInBytes=',jsonSizeInBytes);
        if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT){
            db.pages.insert(pageObj, function (err, pageDoc) {   // Callback is optional
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
            res.send(JSON.stringify({ status: 0, info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes.`, data:{} }));
        }

    });
}

function updatePage(req, res, db){
    auth.isloggedIn(req, res, db, function(req, res, db){
        let pageObj = req.body;
        // console.log('--------->',pageObj);
        if(req.params && req.params.pageId !== undefined) {
            let jsonSizeInBytes = jsonSize(pageObj);
            if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT) {
                db.pages.update({_id:req.params.pageId}, pageObj, function (err, numUpdated) {   // Callback is optional
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
                res.send(JSON.stringify({ status: 0, info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes.`, data:{} }));
            }
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: 0, info: 'Error: page id not provided.', data:{} }));
        }
    });
}

function delPage(req, res, db){
    auth.isloggedIn(req, res, db, function(req, res, db){
        if(req.params && req.params.pageId !== undefined) {
            db.pages.remove({_id:req.params.pageId},false,function(err, numRemoved){
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
//     pageId : 1,
//     pageTitle: 'page title 1',
//     pageContent: 'page content 1'
// }
// db.pages.insert(pageDoc, function (err, pageDoc) {   // Callback is optional
//     console.log('inserted:', pageDoc);
// });


function appRoute(app, db){
    app.post('/api/v1/page/create', (req, res) => {
        createPage(req, res, db);
    });

    app.get('/api/v1/page/list', (req, res) => {
        listPage(req, res, db);
    });

    app.patch('/api/v1/page/:pageId', (req, res) => {
        updatePage(req, res, db);
    });

    app.get('/api/v1/page/:pageId', (req, res) => {
        getPage(req, res, db);
    });

    app.delete('/api/v1/page/:pageId', (req, res) => {
        delPage(req, res, db);
    });
}

module.exports.log = log;
module.exports.appRoute = appRoute;
module.exports.getPage = getPage;
module.exports.listPage = listPage;
module.exports.createPage = createPage;
module.exports.delPage = delPage;
module.exports.updatePage = updatePage;