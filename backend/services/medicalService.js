const asyncHandler = require('express-async-handler');
const Medical = require('../models/medicalModel');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

async function getAll() {
  const medicals = await Medical.find({ isPublic: true }).lean();
  return medicals;
}

async function getAllPatients(userId) {
  let query = await Medical.findById(userId).populate('myPatients').populate('myAppointments').exec();
  return query.myPatients;
}

async function getAllAppointments() {
  let query = await Appointment.find().populate('patient').populate('medical').exec();
  return query;
}

async function getCurrentAppointment(id) {
  let query = await Appointment.findById(id).populate('patient').populate('medical').exec();
  return query;
}

async function requestAppointment(medicalId, userId, newAppointment) {
  const medical = await Medical.findById(medicalId);
  const user = await User.findById(userId);
  if (!medical || !user) {
    throw new ReferenceError('User does not exist');
  }
  const check = user.myAppointments.length >= 1;
  if (!check) {
    const appointment = new Appointment(newAppointment);
    appointment.isApproved = 'No';
    user.myAppointments.push(appointment);
  } else {
    throw new Error('You already have an appointment');
  }

  return Promise.all([user.save(), medical.save(), appointment.save()]);
}

async function approveAppointment(appointmentId) {
  const appointment = await Appointment.findById(appointmentId);
  const medical = await Medical.findById(appointment.medical._id);
  const medicalAppointments = medical.myAppointments;
  const checkIfExisting = medicalAppointments.find(appointment => appointment._id.toString() === appointmentId);
  if (!checkIfExisting) {
    if (appointment.isApproved === 'No') {
      appointment.isApproved = 'Yes';
      medical.myAppointments.push(appointment);
      console.log('appointment', appointment);
      return Promise.all([medical.save(), appointment.save()]);
    } else {
      throw new ReferenceError('Appointment already approved');
    }
  } else {
    return new ReferenceError('Appointment already exists');
  }
}

const setMedical = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const medical = await Medical.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(medical);
})

const deleteSingleMedical = asyncHandler(async (req, res) => {
  try {
    const user = await Medical.findById(req.params.userId);
    if (!user) {
      throw new Error('You are not authorized to delete this account.');
    }
    res.redirect('/home');
    console.log('deleting');
    return await Medical.findByIdAndDelete(user._id);
  } catch (err) {
    console.log(err.message);
    return err;
  }
});

const editSingleMedical = asyncHandler(async (req, res) => {
  try {
    const user = await Medical.findById(req.params.userId);

    const newUser = req.body;
    if (!user) {
      throw new Error('You are not authorized to edit this account.');
    }
    user.name = newUser.name.trim();
    user.username = newUser.username.trim();
    user.email = newUser.email.trim();
    user.hashedPassword = newUser.hashedPassword.trim();
    user.role = user.role;
    user.gender = user.gender;
    user.imageUrl = newUser.imageUrl.trim();
    user.phone = newUser.phone.trim();
    user.age = newUser.age.trim();
    user.department = newUser.department.trim();
    user.areas = newUser.areas.trim();
    user.practiceLocation = newUser.practiceLocation.trim();
    user.myPatients = user.myPatients;
    user.myAppointments = user.myAppointments;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    return err;
  }
});

module.exports = {
  getAll,
  setMedical,
  getAllPatients,
  requestAppointment,
  approveAppointment,
  deleteSingleMedical,
  editSingleMedical,
  getAllAppointments,
  getCurrentAppointment
}
