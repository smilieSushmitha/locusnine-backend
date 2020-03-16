const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Sushmitha'
  },
  email: {
    type: String,
    required: true,
    default: 'test@gmail.com'
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: true
  },
  mobileNumber: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
