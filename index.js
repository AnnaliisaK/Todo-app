require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const router = require('./src/router')
const mongoose = require('mongoose')

const mongoDB = 'mongodb+srv://test:test@cluster0.rsfz8.mongodb.net/Nodejututuba?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use('/', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
  console.log(req.body)
  res.json({ status: 'ok'})
})

app.get('/', (req, res) => {
  res.send('Hakkama said! Server töötab!')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
