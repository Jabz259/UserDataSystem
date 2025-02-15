const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');  // Set EJS as view engine

//Middleware to parse urlencoded data without this we ant really get our post data to our textarea
app.use(express.urlencoded({ extended: true }));

//serving static html
const path = require('path');


mongoose.connect('mongodb://127.0.0.1/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to Mongo"))
.catch((error) => {console.error("Cannot connect to database" , error)}
);

app.get('/users', async (req,res) => {

    try {
        const users = await User.find();
        await res.render('form',{users});
        // res.json(users); 

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/users', async (req,res) => {
    try {
    const {firstName, secondName, age} = req.body;
    const newUser = new User({firstName, secondName, age});
    await newUser.save();
    // Redirect back to /users page after submission
    res.redirect('/users');
    
    //show us what is being submitted in the post in json format
    //res.status(201).json(newUser);
        
    } catch (error) {
        res.status.json({error: 'Internal server error'});
    }
})


app.listen(3000, ()=> {
    console.log("listening at port 3000");

})