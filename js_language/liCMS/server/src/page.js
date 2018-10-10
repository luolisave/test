const crud = require('./crud');

function appRoute(app, db){
    app.post('/api/v1/page/create', (req, res) => {
        crud.createX(req, res, db, db.pages);
    });

    app.get('/api/v1/page/list', (req, res) => {
        crud.listX(req, res, db, db.pages);
    });

    app.patch('/api/v1/page/:xId', (req, res) => {
        crud.updateX(req, res, db, db.pages);
    });

    app.get('/api/v1/page/:xId', (req, res) => {
        crud.getX(req, res, db, db.pages);
    });

    app.delete('/api/v1/page/:xId', (req, res) => {
        crud.delX(req, res, db, db.pages);
    });
}

module.exports.appRoute = appRoute;