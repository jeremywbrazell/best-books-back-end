'use strict'
const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
});
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    books: [booksSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;