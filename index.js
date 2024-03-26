// a node.js api authentication with jwt 
const express = require('express')
const app = express();
const dotenv = require ('dotenv');
const mongoose= require('mongoose');
const postRoute= require('./routes/post');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// import Routes 
const authRoute = require('./routes/auth')
// middlware
app.use(express.json());

// route middleware  
app.use('/api/user',authRoute)
app.use('/api/posts', postRoute)

app.listen(3000,()=>
console.log(` App is listening on port 3000 `) )