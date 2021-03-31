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
            statis: 'in' }]})
    me.save();
    
    const you = new User({
        email: '2',
        books: [{
            name: 'the onee',
            description: 'the Twos',
            status: 'out'
        }]})
    you.save();
    
    const everyoneweknow = new User({
        email: 'free', 
        books: [{ name: 'the odne', 
        description: 'the Twdo', 
        status: 'in' }]})
    console.log(you, everyoneweknow);
    everyoneweknow.save();
});


const silence = new User({ email: 'Silence' });
silence.save();

console.log(silence.email); // 'Silence'


app.get('/books', getBooks);

async function getBooks(request, response) {
    const name = request.query.email;
    await User.find({name}, function(err, books){
        if (err)return console.error(err);
        console.log(name);
        response.status(200).send(books);
    })
    // .catch(error => {console.error(error)});
}
const PORT = process.env.PORT || 3002;
// console.log(getBooks({params: {email: 'free'}}));
app.listen(PORT, () => console.log(`listening on ${PORT}`));
