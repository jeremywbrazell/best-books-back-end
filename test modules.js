'use strict'




const Booking = {}


Booking.getAllBooks = async (request, response) => {
    const name = request.query.email;
    console.log('getting: ', name)
    await User.find({email: name.email}, function (err, books){
        if (err)return console.error(err);
        console.log('name: ', name);
        response.status(200).send(books);
    })
    .catch(error => {console.error(error)});
}

Booking.deleteBook = async(req, res) => {
    const index = req.params.index;
    const user = req.query.name
}


module.export = Booking;