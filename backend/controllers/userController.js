const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Medical = require('../models/medicalModel');
const Admin = require('../models/adminModel');

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
  res.status(200).redirect('/home').json({
    message: "User logged out"
  })
})

const getSinglePatient = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
});

const getSingleMedical = asyncHandler(async (req, res) => {
  const user = await Medical.findById(req.params.userId);
  res.status(200).json(user);
});

const getMyMedical = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const myDoctor = user.myMedicalProfessional;
  res.status(200).json(myDoctor);
});

const getMyExaminations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const myExaminations = user.myExaminations;
  res.status(200).json(myExaminations);
});

const deleteMyExamination = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  console.log('req.params.userId', req.params.userId);
  console.log('examId', req.params.resultId);
  const examinationId = req.params.resultId;
  const myExaminations = user.myExaminations;
  const index = myExaminations.findIndex(examination => examination._id.toString() === examinationId);
  myExaminations.splice(index, 1);
  await user.save();
  res.status(200).json(myExaminations);
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

async function getUserByEmail(email) {
  try {
      const pattern = new RegExp(`^${email}$`, 'i');
      const user = await User.findOne({ email: { $regex: pattern }});
      return user;
  } catch (error) {
  console.error(error);
  }
}

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

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await Admin.findOne({ username });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user
  const user = await Admin.create({
    username,
    hashedPassword: hashedPassword,
    role: 'admin'	,
  })

  user.save();
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const user = await Admin.findOne({ username });
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
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials');
    }
  }
})

const deleteSinglePatient = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
        throw new Error('You are not authorized to delete this account.');
    }
    res.redirect('/home');
    return await User.findByIdAndDelete(user._id);
} catch(err) {
    console.log(err.message);
    return err;
}});

const editSinglePatient = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

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
    user.address = newUser.address.trim();
    user.phone = newUser.phone.trim();
    user.age = newUser.age.trim();
    user.myMedicalProfessional = user.myMedicalProfessional;
    user.myAppointments = user.myAppointments;
    await user.save();
    return res.status(200).json(user);
} catch(err) {
    console.log(err.message);
    return err;
}});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getSinglePatient,
  getMyMedical,
  chooseMedicalAction,
  cancelMedical,
  registerAdmin,
  loginAdmin,
  deleteSinglePatient,
  editSinglePatient,
  getSingleMedical,
  getMyExaminations,
  deleteMyExamination
}
