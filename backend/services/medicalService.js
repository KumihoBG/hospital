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

async function createAppointment(appointment) {
  const newAppointment = new Appointment(appointment);
  await newAppointment.save();
}

async function requestAppointment(medicalId, userId, newAppointment) {
  const medical = await Medical.findById(medicalId);
  const user = await User.findById(userId);

  if (!medical || !user) {
    throw new ReferenceError('No such ID in database');
  }
  await createAppointment(newAppointment);
  return Promise.all([user.save(), medical.save()]);
}

async function approveAppointment(medicalId, userId, appointmentId) {
  const medical = await Medical.findById(medicalId);
  const user = await User.findById(userId);
  const appointment = await Appointment.findById(appointmentId);
  medical.myAppointments.push(appointment);
  user.myAppointments.push(appointment);
  return Promise.all([user.save(), medical.save()]);
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

const updateMedical = asyncHandler(async (req, res) => {
  const medical = await Medical.findById(req.params.id)

  if (!medical) {
    res.status(400)
    throw new Error('Medical not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the medical user
  if (medical.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedMedical = await Medical.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedMedical)
})

const deleteMedical = asyncHandler(async (req, res) => {
  const medical = await Medical.findById(req.params.id)

  if (!medical) {
    res.status(400)
    throw new Error('Medical not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the medical user
  if (medical.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await medical.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getAll,
  setMedical,
  updateMedical,
  deleteMedical,
  getAllPatients,
  requestAppointment
}
