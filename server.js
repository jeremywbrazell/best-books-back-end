'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const User = require('./modules/User');
const app = express();
app.use(cors());
app.use(express.json())

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_CONN, { 
    dbName: "BestBooksDev",
    dbCollection: "users",
    user: process.env.JCLOUD_ATLAS_USER,
    pass: "Postman1234",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useFindAndModify: false 
})
.then(()=>{
console.log(`Mongo connected to atlus?!`)})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected in DB once!')
}).catch(error => console.log("DB Connection down" , error));

async function getBooks(request, response) {
    const name = request.query.email;
console.log('getting: ', name)
    await User.find({email: name.email}, function (err, books){
        if (err)return console.error(err);
 console.log('name: ', name);
        response.status(200).send(books);
    }).catch(error => {console.error(error)});
}

async function posty(req, res){
    const data = req.query.book;
    const own = req.query.email;
    await User.find({own}, (err, itm)=>{
        if(err) return console.error(err);
        itm.books.push({name: data.name, description: book.description, status: book.status })
        itm.save()
        res.status(200).send(itm.books)
    }) 
}

// async function putter (req, res){
//     const me = req.query.name;
//     const changer = req.query.index;
//     await User.find({me}, (err, change)=>{
//         if(err) return console.error(err);
//     }
    
//     )

// }

async function killer(req,res){
    const data = parseInt(req.query.index);
    const me = req.query.email

    await User.find({email: me}, (err, hit)=>{
        if(err) return console.error(err);
        const neew = hit.books.filter((thing, i)=>{
            i !== data
        })
        hit.books = neew
        hit.books.save();
        res.status(200).send(`Title at index ${data} deleted`)
    })
}


app.get('/', function (req, res){
    console.log('hello')
    res.send('Welcome')
})

app.get('/books', getBooks);
app.post('/books', posty);
app.delete('/books', killer);
// app.put('/books', putter)



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

