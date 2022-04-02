const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Medical = require('../models/medicalModel');
const Appointment = require('../models/appointmentModel');

const registerMedicalProfessional = asyncHandler(async (req, res) => {
  const { name, username, email, password, gender, role, imageUrl, phone, age, department, areas, practiceLocation } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await Medical.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await Medical.create({
    name,
    username,
    email,
    hashedPassword: hashedPassword,
    gender,
    role,
    imageUrl,
    phone,
    age,
    department,
    areas,
    practiceLocation
  })

  user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginMedicalUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await Medical.findOne({ email });

  if (user && (await bcrypt.compare(password.toString(), user.hashedPassword))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const logoutUser = ((req, res) => {
  res.status(200).json({
    message: "User logged out"
  })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const getSingleMedical = asyncHandler(async (req, res) => {
  const user = await Medical.findById(req.params.userId);
  res.status(200).json(user);
})

module.exports = {
  loginMedicalUser,
  registerMedicalProfessional,
  logoutUser,
  getSingleMedical,
}
