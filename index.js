
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// // middleware
// app.use(express.static('public'));


//database connection
const mongoDB = 'mongodb+srv://test:test@cluster0.avn3o.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((error) => console.log(error));

//routes
app.get('/', (req,res) => res.render('index'));
app.get('/dashboard', (req,res) => res.render('dashboard'));


