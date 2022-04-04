const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    maxLength: [15, 'Username must be maximum of 15 characters long'],
    required: [true, 'Username name is required'],
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 4,
  },
  role: {
    type: String,
    possibleValues: ['patient','medical-professional','admin'],
  },
},
  {
    timestamps: true,
  }
)

module.exports = model('Admin', userSchema);
