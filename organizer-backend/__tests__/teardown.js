const dbHandler = require('../db/db-handler')
//const server = require('../server.js')

module.exports = async () => {
    //server.close();
    await dbHandler.closeDatabase();
};