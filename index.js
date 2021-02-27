require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const router = require('./src/router')
const mongoose = require('mongoose')
const User = require('./src/model/users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const JWT_SECRET = 'saswqi9x#¤&""/Lödoad'

const mongoDB = 'mongodb+srv://test:test@cluster0.avn3o.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true
})

app.use(express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
      id: user._id, 
      username: user.username 
    }, 
      JWT_SECRET
    )

    return res.json({ status: 'ok', data: token })
  }

  res.json({ status: 'error', error: 'Invalid username/password' })
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

app.get('/', (req, res) => {
  res.send('Hakkama said! Server töötab!')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
