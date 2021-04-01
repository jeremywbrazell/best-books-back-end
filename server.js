'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const User = require('./modules/User');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    const me = new User({
        email: 'one',
        books: [{
            name: 'the one',
            description: 'the Two',
            status: 'in'
        }]
    })
    me.save();

    const you = new User({
        email: '2',
        books: [{
            name: 'the onee',
            description: 'the Twos',
            status: 'out'
        }]
    })
    you.save();

    const everyoneweknow = new User({
        email: 'jwbrazell@gmail.com',
        books: [{
            name: 'the odne',
            description: 'the Twdo',
            status: 'in'
        }]
    })
    console.log(you, everyoneweknow);
    everyoneweknow.save();
});


const silence = new User({ email: 'Silence' });
silence.save();

console.log(silence.email); // 'Silence'
app.use(express.json());
app.get('/books', getBooks);

async function getBooks(request, response) {
    const name = request.query.email;
    await User.find({ email: name }, function (err, books) {
        if (err) return console.error(err);
        console.log(name);
        response.status(200).send(books);
    })
    // .catch(error => {console.error(error)});
}
function createBook(request, response) {
    const book = request.body.aBook;
    console.log(book);
    const email = request.body.email;
    console.log('email', email);
    // const newBook = { name: book.name, description: book.description, status: book.status }
    User.findOne({ email }, (err, entry) => {
        console.log('testing for something', entry);
        console.log(book);
        if (err) return console.error('Something went wrong', err);
        entry.books.push({ name: book.name, description: book.description, status: book.status })
        entry.save();
        response.status(200).send(entry.books);
    })
}
app.post('/books', createBook);
// app.delete('/books/:id', deleteBook);

const PORT = process.env.PORT || 3002;

// console.log(getBooks({params: {email: 'free'}}));
app.listen(PORT, () => console.log(`listening on ${PORT}`));
