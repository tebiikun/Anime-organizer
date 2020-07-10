const db = require('./db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app = require('./App')();

module.exports = app.listen(app.get('port'), err => {
    if (err) throw err
    console.log(`Server running on port: ${app.get('port')}`)
})