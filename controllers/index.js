const routers= require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

routers.use('/', homeRoutes);
routers.use('/api', apiRoutes);

routers.use((req, res) => {
    res.status(404).end();
});

module.exports = routers;