const submodelService = require('../services/subModelService.js');
const userService = require('../services/userService.js');

module.exports = () => (req, res, next) => {
    // Import services
    req.storage = {
        // destructuring for direct access to the service functions
        ...submodelService,
        ...userService
    };

    next();
}