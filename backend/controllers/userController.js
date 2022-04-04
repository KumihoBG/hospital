const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Medical = require('../models/medicalModel');
const { getUserByEmail } = require('../services/userService');

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, role, gender, imageUrl, address, phone, age } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    throw new Error('This email is already taken.');
  }
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await User.create({
    name,
    username,
    email,
    hashedPassword: hashedPassword,
    role,
    gender,
    imageUrl,
    address,
    phone,
    age
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid user credentials");
  } 
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  
  if (isMatch === false) {
      throw new Error('Wrong password.');
  } else {
    if (user && isMatch === true) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        medical: user.myMedicalProfessional || undefined,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials');
    }
  }
})

const logoutUser = ((req, res) => {
  res.status(200).json({
    message: "User logged out"
  })
})

const getSinglePatient = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
})

const getMyMedical = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const myDoctor = user.myMedicalProfessional;
  res.status(200).json(myDoctor);
});

const chooseMedicalAction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const medical = await Medical.findById(req.body._id);

  const checkOne = medical.myPatients.includes(user._id);
  const checkTwo = user.myMedicalProfessional.length >= 1;

  if (!checkOne) {
    medical.myPatients.push(user);
  } else {
    throw new Error('Patient already exists');
  }

  if (!checkTwo) {
    user.myMedicalProfessional.push(medical);
  } else if (checkTwo) {
    user.myMedicalProfessional.pop();
    user.myMedicalProfessional.push(medical);
  } else {
    throw new Error('Only one medical professional can be chosen');
  }
  return Promise.all([user.save(), medical.save()]);
})

const cancelMedical = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const medical = await Medical.findById(req.body._id);

  const checkOne = medical.myPatients.includes(user._id);
  const checkTwo = user.myMedicalProfessional.includes(medical._id);

  if (checkOne) {
    let index = medical.myPatients.indexOf(user._id);
    medical.myPatients.splice(index, 1);
  } else {
    throw new Error('Patient does not exists');
  }

  if (checkTwo) {
    user.myMedicalProfessional.pop();
  } else {
    throw new Error('You still haven\'t chosen a medical professional');
  }
  return Promise.all([user.save(), medical.save()]);
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getSinglePatient,
  getMyMedical,
  chooseMedicalAction,
  cancelMedical
}