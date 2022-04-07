const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
  },
  username: {
    type: String,
    maxLength: [15, 'Username must be maximum of 15 characters long'],
    required: [true, 'Username name is required'],
  },
  email: {
    type: String,
    required: true,
    isEmail: {
      bail: true,
    },
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
  gender: {
    type: String,
    possibleValues: ['male','female'],
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
    maxlength: 500,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 1,
    max: 100
  },
  myMedicalProfessional: [{
    type: Schema.Types.ObjectId,
    ref: 'Medical',
    default: []
  }],
  myAppointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    default: []
  }],
  myExaminations: [{
    type: Schema.Types.ObjectId,
    ref: 'Examination',
    default: []
  }]
},
  {
    timestamps: true,
  }
)

module.exports = model('User', userSchema);
