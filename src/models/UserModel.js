const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('UserModel', UserModel);