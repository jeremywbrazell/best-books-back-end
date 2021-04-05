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

    const andme = new User({
        email: 'julienwedwards@gmail.com',
        books: [{
            name: 'you wanna hear a',
            description: 'secret',
            status: 'hush'
            },
            {   
                name: 'you wanna hear a',
                description: 'secret',
                status: 'hush'
            },
            {
                name: 'you wanna hear a',
                description: 'secret',
                status: 'hush'
                },]
    })
    console.log(you, everyoneweknow);
    everyoneweknow.save();
    andme.save();
});


app.use(express.json());
app.get('/books', getBooks);

async function getBooks(request, response) {
    const name = request.query.email;
    await User.find({ email: name }, function (err, books) {
        if (err) return console.error(err);
        console.log('get books name: ', name);
        response.status(200).send(books);
    })
    // .catch(error => {console.error(error)});
}

async function deleteBook (request, response) {
    const name=request.query.email;
    const badBook=parseInt(request.query.index);
    console.log('deleting', request);
    await User.find({email: name}, function(err, list){
        if (err) return console.error(err);
       const newArray = list.books.filter((book, i) => {
           return i !== badBook;
       })
       list.books=newArray
       list.save();
       response.status(200).send('success -- you have deleted a book!');

    })
}
function createBook(request, response) {
    const book = request.query.aBook;
    console.log(book);
    const email = request.query.email;
    console.log('email', email);
    // const newBook = { name: book.name, description: book.description, status: book.status }
    User.findOne({ email }, (err, entry) => {
        console.log('testing for something', entry);
        console.log('testing for book', book);
        if (err) return console.error('Something went wrong', err);
        // const get = entry
        entry.books=[...entry.books, { name: book.bookName, description: book.bookDescription, status: book.bookStatus }]
        entry.save();
        response.status(200).send(entry);
    })
}
app.post('/books', createBook);
app.delete('/books/:id', deleteBook);

const PORT = process.env.PORT || 3002;

// console.log(getBooks({params: {email: 'free'}}));
app.listen(PORT, () => console.log(`listening on ${PORT}`));
