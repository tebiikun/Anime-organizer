const dbHandler = require('../db/db-handler')

module.exports = async () => {
    await dbHandler.connect();
};