const mongoose = require('mongoose');

const userSchems = mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
});

const Contact = mongoose.model('Users',userSchems);

module.exports = Contact;