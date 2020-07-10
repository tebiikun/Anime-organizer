const mongoose = require('mongoose');
const config = require('../config/config')

mongoose
    .connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .catch(e => {
        console.error('Connection error', e.message);
    })

const db = mongoose.connection

module.exports = db