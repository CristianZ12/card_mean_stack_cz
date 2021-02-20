const express = require('express');
const cors = require('cors');

const router = require('../routes/router');

module.exports = (app) => {

    //Setting Port
    app.set('Port', process.env.PORT || 4000);

    //Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //Routes
    router(app);

    return app;
}