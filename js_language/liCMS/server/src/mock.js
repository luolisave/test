const crud = require('./crud');

function appRoute(app, db){
    app.post('/api/v1/mock/create', (req, res) => {
        crud.createX(req, res, db, db.mocks, {method:'passcode'});
    });

    app.get('/api/v1/mock/list', (req, res) => {
        crud.listX(req, res, db, db.mocks, {method:'passcode'});
    });

    app.patch('/api/v1/mock/:xId', (req, res) => {
        crud.updateX(req, res, db, db.mocks, {method:'passcode'});
    });

    app.get('/api/v1/mock/:xId', (req, res) => {
        crud.getX(req, res, db, db.mocks, {method:'passcode'});
    });

    app.delete('/api/v1/mock/:xId', (req, res) => {
        crud.delX(req, res, db, db.mocks, {method:'passcode'});
    });
}

module.exports.appRoute = appRoute;