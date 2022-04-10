const express = require('express');
const router = express.Router();

const { getAll, getAllPatients, requestAppointment, editSingleMedical, deleteSingleMedical, getAllAppointments, getCurrentAppointment, approveAppointment, getCurrentExamination, getMyExaminations } = require('../services/medicalService');

router.get('/', async (req, res) => {
  const medicals = await getAll();
  return res.status(200).json(medicals);
});

router.get('/my-patients/:userId', async (req, res) => {
  const patients = await getAllPatients(req.params.userId);
  return res.status(200).json(patients);
});

router.get('/request-appointment', async (req, res) => {
  const appointments = await getAllAppointments();
  return res.status(200).json(appointments);
});

router.post('/request-appointment/:userId', async (req, res) => {
  const medicalId = req.params.userId;
  const userId = req.body.patient;
  const newAppointment = req.body;
  const result = await requestAppointment(medicalId, userId, newAppointment);
  return res.status(200).json(result);
});

router.get('/appointments', async (req, res) => {
  const allAppointments = await getAllAppointments();
  return res.status(200).json(allAppointments);
});

router.get('/appointments/:id', async (req, res) => {
  const currentAppointment = await getCurrentAppointment(req.params.id);
  return res.status(200).json(currentAppointment);
});

router.get('/:userId/my-examinations',async (req, res) => {
  const myExaminations = await getMyExaminations(req.params.userId);
  return res.status(200).json(myExaminations);
});

router.put('/appointments/approve/:id', async (req, res) => {
  const appointmentId = req.params.id;
  const approvedAppointment = await approveAppointment(appointmentId);
  return res.status(200).json(approvedAppointment);
});

router.get('/appointments/check-for-approval/:userId', async (req, res) => {
  const allAppointments = await getAllAppointments();
  const allDoctors = [];
  const patient = [];

  for (let appointment in allAppointments) {
    allDoctors.push(allAppointments[appointment].medical);
    patient.push(allAppointments[appointment].patient);
  }
  const userId = req.params.userId;
  const result = allDoctors.map(doctor => {
    if(doctor._id.toString() === userId) {
      const newEntry = {
        doctor: doctor,
        patient: patient[0]
      };
      return newEntry;
    }
  });
  return res.status(200).json(result);
});


router.delete('/delete/:userId', deleteSingleMedical);
router.put('/edit/:userId', editSingleMedical);

module.exports = router;
