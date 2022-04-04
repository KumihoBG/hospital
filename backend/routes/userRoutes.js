const router = require('express').Router();

const { registerUser, loginUser, logoutUser, getSinglePatient, getMyMedical, chooseMedicalAction, cancelMedical, registerAdmin, loginAdmin } = require('../controllers/userController');
const { registerMedicalProfessional, loginMedicalUser, getSingleMedical }  = require('../controllers/medicalController');

// const { protect } = require('../middleware/authMiddleware');

router.post('/register-patient', registerUser);
router.post('/register-medical', registerMedicalProfessional);
router.post('/register-admin', registerAdmin);
router.post('/login-admin', loginAdmin);
router.post('/patient/login', loginUser);
router.post('/medical/login', loginMedicalUser);
router.get('/medical/:userId', getSingleMedical);
router.get('/patient/:userId', getSinglePatient);
router.get('/patient/:userId/my-medical-professional', getMyMedical);
router.post('/patient/:userId/choose-my-medical-professional', chooseMedicalAction);
router.put('/patient/:userId/cancel-my-medical-professional', cancelMedical);
router.get('/logout', logoutUser);

module.exports = router;
