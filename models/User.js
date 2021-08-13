const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    google_id: String,
    display_name: String,
    first_name: String,
    last_name: String,
    picture: String
})


const User = mongoose.model('user', userSchema)
module.exports = User