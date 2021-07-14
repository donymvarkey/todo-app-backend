const mongoose = require('mongoose');

const TodoModel = mongoose.Schema({
    name: {type: String, required: true, unique: false},
    isCompleted: {type: Boolean, default: false},
    createdAt: {type: Date, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: "UserModel"}
})

module.exports = mongoose.model('TodoModel', TodoModel);