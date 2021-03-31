'use strict'
const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true}
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    books: [booksSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;