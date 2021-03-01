const dotenv = require('dotenv');
const express = require('express')
const path = require('path')
const http = require('http');
const app = express();
const bodyParser = require('body-parser')
const server = http.createServer(app);
const session = require('express-session');
const mongoose = require('mongoose')
const User = require('./models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./routes/verifyToken');

dotenv.config();

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true
  }));

app.use(verify)

app.get('/', verify, function(request, response) {
	response.sendFile(path.join(__dirname + '/public/main.html'));
});


//const JWT_SECRET = 'saswqi9x#¤&""/Lödoad'

//const mongoDB = 'mongodb+srv://test:test@cluster0.avn3o.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true
})



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {

  const {username, password} = req.body

  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.json({ 
      status: 'error', 
      error: 'Invalid username/password' 
    })
  }

  if (await bcrypt.compare(password, user.password)) {
    //the username, password combination is successful

    const token = jwt.sign({ 
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      id: user._id, 
      username: user.username 
    }, 
    process.env.JWT_SECRET)

    req.session.token = token

    return res.json({ status: 'ok', data: token })
  }

  res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/logout', async (req, res) => {
  req.session.destroy()
  return res.json({ status: 'ok' })
})

app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword} = req.body

  if (!username || typeof username !== 'string') {
    return res.json({ 
      status: 'error', 
      error: 'Invalid username'
    })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ 
      status: 'error', 
      error: 'Invalid password'
    })
  }

  if (plainTextPassword.length < 5) {
    return res.json({ 
      status: 'error', 
      error: 'Password too small. Should be atleast 6 characters'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  try {
     const response = await User.create({
        username,
        password
    })
    console.log('User created successfully: ', response)
  } catch(error) {
    if (error.code === 11000) {
      //duplicate key
      return res.json({ status: 'error', error: 'Username already in use'})
    }
    throw error
  }

  res.json({ status: 'ok'})
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`See server töötab pordil: ${PORT}`));