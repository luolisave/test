const jsonSize = require('json-size');

const auth = require('./auth');
const CONSTANTS = require('./const');

function listX(req, res, db, dbX, options){
    let promise = new Promise(function(resolve, reject) {
        auth.isloggedIn(req, res, db, dbX, options, function(req, res, dbX){
            console.log('listX()'); // , '\n req.headers=', req.headers
            dbX.find({}, function (err, docs){
                if(!err){
                    if(docs){
                        resolve({ status: 1, info: 'Success: document retrieved.', data: docs });
                    }else{
                        reject({ status: 0, info: 'cannot find document!', data:{} });
                    }
                }else{
                    reject({ status: 0, info: 'Error:', data:{} });
                }
            });
        });
    });
    return promise;
}

function getX(req, res, db, dbX, options){
    let promise = new Promise(function(resolve, reject) {
        auth.isloggedIn(req, res, db, dbX, options, function(req, res, dbX){
            console.log("callback inside auth.isloggedIn();");
            // console.log('getX() req.params = ', req.params, '\n req.headers=', req.headers);
            if(req.params && req.params.xId !== undefined){
                dbX.findOne({ _id: req.params.xId }, function (err, doc) {// If no document is found, doc is null
                    if(!err){
                        if(doc){
                            resolve({ status: 1, info: 'Success: document retrieved.', data: doc });
                        }else{
                            reject({ status: 0, info: 'cannot find document!', data:{} });
                        }
                    }else{
                        reject({ status: 0, info: 'Error:', data:{} });
                    }
                });
            }else{
                reject({ status: 0, info: 'xId not exist!', data:{} });
            }
        });
    });
    return promise;
}

function createX(req, res, db, dbX, options){
    let promise = new Promise(function(resolve, reject) {
        auth.isloggedIn(req, res, db, dbX, options, function(req, res, dbX){
            let pageObj = req.body;
            let jsonSizeInBytes = jsonSize(pageObj);
            console.log('--------->',pageObj, ' jsonSizeInBytes=',jsonSizeInBytes);
            if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT){
                dbX.insert(pageObj, function (err, doc) {   // Callback is optional
                    if(err){
                        reject({ status: 0, info: 'Error: page not inserted.:', data:{} });
                    }else{
                        resolve({ status: 1, info: 'Success: new page inserted.', data: doc });
                    }
                    // console.log('inserted object:', pageDoc);
                });
            }else{
                reject({ status: 0, info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes. Change const.js PAGE_DOC_BYTES_LIMIT to increase the limits.`, data:{} });
            }

        });
    });
    return promise;
}

function updateX(req, res, db, dbX, options){
    let promise = new Promise(function(resolve, reject) {
        auth.isloggedIn(req, res, db, dbX, options, function(req, res, dbX){
            let pageObj = req.body;
            // console.log('--------->',pageObj);
            if(req.params && req.params.xId !== undefined) {
                let jsonSizeInBytes = jsonSize(pageObj);
                if(jsonSizeInBytes < CONSTANTS.PAGE_DOC_BYTES_LIMIT) {
                    dbX.update({_id:req.params.xId}, pageObj, function (err, numUpdated) {   // Callback is optional
                        if(err){
                            reject({ status: 0, info: 'Error: document not inserted.', data:{} });
                        }else{
                            resolve({ status: 1, info: `Success: ${numUpdated} record updated.`, data: {} });
                        }
                        // console.log('inserted object:', pageDoc);
                    });
                }else{
                    reject({ status: 0, info: `Error: exceeding document limits. Document size must less than ${CONSTANTS.PAGE_DOC_BYTES_LIMIT} bytes. Change const.js PAGE_DOC_BYTES_LIMIT to increase the limits.`, data:{} });
                }
            }else{
                reject({ status: 0, info: 'Error: document id not provided.', data:{} });
            }
        });
    });
    return promise;
}

function delX(req, res, db, dbX, options){
    let promise = new Promise(function(resolve, reject) {
        auth.isloggedIn(req, res, db, dbX, options, function(req, res, dbX){
            if(req.params && req.params.xId !== undefined) {
                dbX.remove({_id:req.params.xId},false,function(err, numRemoved){
                    if(err){
                        reject({ status: 0, info: 'Error: document not deleted.', data:{} });
                    }else{
                        resolve({ status: 1, info: `Success: ${numRemoved} line(s) removed.`, data: {} });
                    }
                });
            }else{
                reject({ status: 0, info: 'Error: page id not provided.', data:{} });
            }
        });
    });
    return promise;
}


module.exports.getX = getX;
module.exports.listX = listX;
module.exports.createX = createX;
module.exports.updateX = updateX;
module.exports.delX = delX;