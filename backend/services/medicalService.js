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
  let query = await Appointment.find();
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
  const appointment = new Appointment(newAppointment);
  appointment.isApproved = 'No';
  user.myAppointments.push(appointment);
  return Promise.all([user.save(), medical.save(), appointment.save()]);
}

async function approveAppointment(medicalId, userId, appointmentId) {
  const medical = await Medical.findById(medicalId);
  const user = await User.findById(userId);
  const appointment = await Appointment.findById(appointmentId);
  medical.myAppointments.push(appointment);
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

// const updateMedical = asyncHandler(async (req, res) => {
//   const medical = await Medical.findById(req.params.id)

//   if (!medical) {
//     res.status(400)
//     throw new Error('Medical not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the medical user
//   if (medical.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedMedical = await Medical.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedMedical)
// })

// const deleteMedical = asyncHandler(async (req, res) => {
//   const medical = await Medical.findById(req.params.id)

//   if (!medical) {
//     res.status(400)
//     throw new Error('Medical not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the medical user
//   if (medical.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await medical.remove()

//   res.status(200).json({ id: req.params.id })
// })

const deleteSingleMedical = asyncHandler(async (req, res) => {
  try {
    const user = await Medical.findById(req.params.userId);
    if (!user) {
        throw new Error('You are not authorized to delete this account.');
    }
    res.redirect('/home');
    console.log('deleting');
    return await Medical.findByIdAndDelete(user._id);
} catch(err) {
    console.log(err.message);
    return err;
}});

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
} catch(err) {
    console.log(err.message);
    return err;
}});

module.exports = {
  getAll,
  setMedical,
  // updateMedical,
  // deleteMedical,
  getAllPatients,
  requestAppointment,
  approveAppointment,
  deleteSingleMedical,
  editSingleMedical,
  getAllAppointments,
  getCurrentAppointment
}
