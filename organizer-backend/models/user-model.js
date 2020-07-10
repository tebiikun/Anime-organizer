const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        username: {type: String, required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model('UserSchema', UserSchema)

