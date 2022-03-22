const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const authMiddleware = require('../middleware/authentication.js');
const storageMiddleWare = require('../middleware/storage.js');

module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
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