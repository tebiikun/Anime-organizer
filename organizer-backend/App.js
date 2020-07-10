const express = require('express');
const bodyparser = require('body-parser')
const userRouter = require('./routes/user-router')
const config = require('./config/config')
const cors = require('cors')

module.exports = function() {
    const app = express();
    app.set('port', config.PORT);

    app.use(bodyparser.urlencoded({ extended: true}))
    app.use(cors())
    app.use(bodyparser.json())

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    app.use('/api', userRouter)

    return app;
};