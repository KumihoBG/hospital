const router = require('express').Router();

const { registerUser, loginUser, logoutUser, getSinglePatient, getMyMedical, chooseMedicalAction, cancelMedical, registerAdmin, loginAdmin, deleteSinglePatient, editSinglePatient, getSingleMedical, getMyExaminations, deleteMyExamination } = require('../controllers/userController');
const { registerMedicalProfessional, loginMedicalUser }  = require('../controllers/medicalController');

router.post('/register-patient', registerUser);
router.post('/register-medical', registerMedicalProfessional);
router.post('/register-admin', registerAdmin);
router.post('/login-admin', loginAdmin);
router.post('/patient/login', loginUser);
router.post('/medical/login', loginMedicalUser);
router.get('/medical/:userId', getSingleMedical);
router.get('/patient/:userId', getSinglePatient);
router.delete('/patient/:userId/delete', deleteSinglePatient);
router.put('/patient/:userId/edit', editSinglePatient);
router.get('/patient/:userId/my-medical-professional', getMyMedical);
router.delete('/patient/:userId/my-examinations/delete/:examinationId', deleteMyExamination);
router.get('/patient/:userId/my-examinations', getMyExaminations);
router.post('/patient/:userId/choose-my-medical-professional', chooseMedicalAction);
router.put('/patient/:userId/cancel-my-medical-professional', cancelMedical);
router.get('/logout', logoutUser);

module.exports = router;
