'use strict'
import ReadingCard from './ReadingCard';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    books: [ReadingCard]
});

const User = mongoose.model('User', userSchema);

module.exports = User;