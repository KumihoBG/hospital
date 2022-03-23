const express = require('express');
const { PORT } = require('./config');
const path = require('path');
const cors = require('cors')
const database = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

start();

async function start() {
    const app = express();
    app.use(cors())
    
    await database(app);
    expressConfig(app);
    routesConfig(app);

    app.use (express.static (path.join (__dirname, 'public')));
  
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}
