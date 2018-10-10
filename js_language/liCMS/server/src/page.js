var auth = require('./auth');

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
        // console.log('getPage() req.params = ', req.params, '\n req.headers=', req.headers);
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
        // let pageDoc = {
        //     pageTitle: 'page title 1',
        //     type: 'page',
        //     pageContent: 'page content 1',
        //     status: 'active',
        //     updateDate: new Date()
        // }
        // db.pages.insert(pageDoc, function (err, pageDoc) {   // Callback is optional
        //     console.log('inserted:', pageDoc);
        // });
        console.log('--------->',pageObj);
        db.pages.insert(pageObj, function (err, pageDoc) {   // Callback is optional
            if(err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 0, info: 'Error: page not inserted.', data:{} }));
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ status: 1, info: 'new page inserted', data:pageDoc }));
            }
            console.log('inserted object:', pageDoc);
        });

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

module.exports.log = log;
module.exports.getPage = getPage;
module.exports.listPage = listPage;
module.exports.createPage = createPage;