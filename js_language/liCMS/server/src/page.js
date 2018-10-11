const crud = require('./crud');

function appRoute(app, db){
    app.post('/api/v1/page/create', (req, res) => {
        crud.createX(req, res, db, db.pages, {method:'token'});
    });

    app.get('/api/v1/page/list', (req, res) => {
        crud.listX(req, res, db, db.pages, {method:'token'});
    });

    app.patch('/api/v1/page/:xId', (req, res) => {
        crud.updateX(req, res, db, db.pages, {method:'token'});
    });

    app.get('/api/v1/page/:xId', (req, res) => {
        let promise = crud.getX(req, res, db, db.pages, {method:'token'});
        promise.then(
            function(result){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            },
            function(err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err));
            });
    });

    app.delete('/api/v1/page/:xId', (req, res) => {
        crud.delX(req, res, db, db.pages, {method:'token'});
    });
}

module.exports.appRoute = appRoute;