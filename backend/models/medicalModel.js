const { Schema, model } = require('mongoose');

const medicalSchema = new Schema({
    name: {
      type: String,
      required: true,
      match: [/^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+$/g, 'Please enter first name and last name.'],
    },
    username: {
      type: String,
      required: true,
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
    },
    gender: {
      type: String,
    },
    imageUrl: {
      type: String,
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
    department: {
      type: String,
      maxlength: 50,
    },
    areas: {
      type: Array
    },
    practiceLocation: {
      type: String
    },
    myPatients: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }],
    myAppointments: [{
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      default: []
    }]
    },
  {
    timestamps: true,
  }
)

module.exports = model('Medical', medicalSchema);
