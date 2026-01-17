const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Contact = require('./models/users.model');

mongoose.connect('mongodb://127.0.0.1:27017/contact_app')
.then(()=>{ console.log('Database Connected'); })
.catch((err)=>{ console.log(err.stack); })

// Built In Middleware
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Routes
app.get('/',async (req,res)=>{
    // Using Contact Model
    let contacts = await Contact.find();
    res.render('home',{contacts:contacts});
});

app.get('/add-contact',(req,res)=>{
    res.render('add_contact');
});

app.post('/add-contact',async (req,res)=>{
    // If your database collection field name and html form <input name=> is notsame then pass data as object in curly brackets{} in method insertOne()
    // key name -> database field name 
    // value -> from req.body
    await Contact.insertOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    });

    // If your database collection field name and html form <input name=> both are same then pass the req.body property direct to method
    
    // MongoDB Method insertOne()
    // await Contact.insertOne(req.body);
    
    // mongoose package Method create()
    // await Contact.create(req.body);

    res.redirect('/');
});

app.get('/view-contact/:id', async (req,res)=>{
    // findOne() method is of mongodb which reqiures the parameter in (which we are searching) as (key : value) pair of object.
    let singleContact = await Contact.findOne({_id : req.params.id});
    res.render('view_contact',{contact : singleContact});
});

app.get('/edit-contact/:id',async (req,res)=>{
    // findById() method is of mongoose package use this method if you already know that searching is done by id only.
    let edit_contact = await Contact.findById(req.params.id);
    res.render('edit_contact',{edt_contact : edit_contact});
});

app.post('/edit-contact/:id',async (req,res)=>{
    // let {firstname,lastname,email,phone,address} = req.body;
    // await Contact.updateOne({firstname,lastname,email,phone,address});
    
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
})

app.get('/delete-contact/:id',async (req,res)=>{
    // deleteOne() method is of mongodb which reqiures the parameter in (which we are searching) as (key : value) pair of object.
    // await Contact.deleteOne({_id : req.params.id});

    // findByIdAndDelete() method is of mongoose package use this method if you already know that searching is done by id only.
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Server is running on port : 3000');
});