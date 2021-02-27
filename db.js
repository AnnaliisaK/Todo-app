const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise

module.exports = {
   
    Users: require('./src/model/users.model')
    
}
