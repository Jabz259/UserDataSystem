const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');  // Set EJS as view engine
//serving static html
const path = require('path');
console.log(path.join(__dirname, 'views', 'index.html'));


mongoose.connect('mongodb://127.0.0.1/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to Mongo"))
.catch((error) => {console.error("Cannot connect to database" , error)}
);


function data() {
    const user = new User({"firstName": "cheese", "secondName" : "beans", "age" : "5"});
    user.save();
}

data();