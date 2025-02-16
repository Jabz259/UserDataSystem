const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const methodOverride = require("method-override");

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');  // Set EJS as view engine
app.use(methodOverride('_method')); //allow to send a delete requset from form 

//Middleware to parse urlencoded data without this we cant really get our post data to our textarea
app.use(express.urlencoded({ extended: true }));

//serving static html
const path = require('path');

// connecting to mongodb
mongoose.connect('mongodb://127.0.0.1/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// open a promise for error handling
.then(() => console.log("Connected to Mongo"))
.catch((error) => {console.error("Cannot connect to database" , error)}
);

//home route, redirect users to users page
app.get('/', (req,res) => {
    res.redirect('/users');
})


app.get('/users', async (req,res) => {
//find all data in User collection
    try {
        const users = await User.find();
        await res.render('form',{users});
        // res.json(users); 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})


//connect form submissions and store data to mongodb
app.post('/users', async (req,res) => {
    try {
    const {firstName, secondName, age} = req.body
    //retrieve incoming data and pass thorugh constructor
    const newUser = new User({firstName, secondName, age});
    //save data
    await newUser.save();
    // Redirect back to /users page after submission
    res.redirect('/users');
    
    //show us what is being submitted in the post in json format
    //res.status(201).json(newUser);
        
    } catch (error) {
        res.status.json({error: 'Internal server error'});
    }
})


app.delete('/users', async (req, res) => {
    try {
        //retireve data from deleteUser from form and trim to remove whitespace
        const userID = req.body.deleteUser.trim();
        await User.findByIdAndDelete(userID);
        res.redirect('/users');
    } catch (error) {
        console.log(error, "error")
        
    }
});

//listen to the port
app.listen(3000, ()=> {
    console.log("listening at port 3000");

})