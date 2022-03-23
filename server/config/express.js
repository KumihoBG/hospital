const express = require('express');
const cookieParser = require('cookie-parser');

const authMiddleware = require('../middleware/authentication.js');
const storageMiddleWare = require('../middleware/storage.js');

module.exports = (app) => {
    app.use('/static', express.static('static'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authMiddleware());
    app.use(storageMiddleWare());

    // Logger - helps with debugging
    app.use((req, res, next) => {
        if (!req.url.includes('favicon')) {
            console.log('>>>', req.method, req.url);
            if (req.user) {
                console.log('Registered user: ', req.user.email);
            }
        }
        next();
    });
};