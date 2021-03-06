const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  // userID tuleb süsteemi poolt
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50,
    match: [/^[a-zA-Z0-9-.]+$/, 'is invalid'],
  },
  password: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);
