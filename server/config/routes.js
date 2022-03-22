const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const subModelController = require('../controllers/subModelController.js');

module.exports = (app) => {
    // route to map the controller
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trips', subModelController);
    app.use('/shared-trips', homeController);
    // catch 404 and forward to error handler
    
}