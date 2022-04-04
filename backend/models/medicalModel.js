const { Schema, model } = require('mongoose');

const medicalSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Full name is required'],
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
      possibleValues: ['patient','medical-professional','admin'],
    },
    gender: {
      type: String,
      possibleValues: ['male','female'],
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
