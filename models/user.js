const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: String,
    secondName: String,
    age: Number
})

module.exports = mongoose.model('User', userSchema);