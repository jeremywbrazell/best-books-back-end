'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const User = require('./modules/User');
const app = express();
app.use(cors());
app.use(express.json())
// import Booking from './test modules'

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb://HVVZOZJW:dcd6c5f5-2fde-48be-b010-2c3429ee2f5f@cluster0.ktbir.mongodb.net";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const connectionString = "mongodb+srv://cluster0.ktbir.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/"

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_CONN, { 
    dbName: "BestBooksDev",
    user: process.env.JCLOUD_ATLUS_USER,
    pass: "Postman1234",
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false })
.then(()=>{
    
    console.log(`Mongo connected to atlus?!`)})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('connected in DB once!');
    
});
async function getBooks(request, response) {
    const name = request.query.email;
    console.log('getting: ', name)
    await User.find({email: name.email}, function (err, books){
        if (err)return console.error(err);
        console.log('name: ', name);
        response.status(200).send(books);
    })
    .catch(error => {console.error(error)});
}

// async function booky(req,res) {
//     const useremail = req.query.email;
//     console.log(useremail)
//     await User.find({email: useremail.email}, function(err,item){
//         if(err) return console.error(err);
//         res.status(200).send(item)
//     })
// }

async function posty(req, res){
    const data = req.body.book;
    const own = req.body.email;
    await User.find({own}, (err, itm)=>{
        if(err) return console.error(err);
        itm.books.push({name: data.name, description: book.description, status: book.status })
        itm.save()
        res.status(200).send(itm.books)
        
    }) 
}

async function putter (req, res){
    const me = req.query.name;
    const changer = req.query.index;
    await User.find({me}, (err, change)=>)

}

async function killer(req,res){
    const data = parseInt(req.query.index);
    const me = req.query.email

    await User.find({me}, (err, hit)=>{
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
app.put('/books', putty)



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

