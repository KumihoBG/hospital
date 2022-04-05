const express = require('express');
const router = express.Router();

const { getAll, getAllPatients, requestAppointment, editSingleMedical, deleteSingleMedical } = require('../services/medicalService');

router.get('/', async (req, res) => {
  const medicals = await getAll();
  res.status(200).json(medicals);
});

router.get('/my-patients/:userId', async (req, res) => {
  const patients = await getAllPatients(req.params.userId);
  res.status(200).json(patients);
});

router.post('/request-appointment/:userId', async (req, res) => {
  const medicalId = req.params.userId;
  const userId = req.body.patient;
  const newAppointment = req.body;
  const result = await requestAppointment(medicalId, userId, newAppointment);
  res.status(200).json(result);
});

router.delete('/delete/:userId', deleteSingleMedical);
router.put('/edit/:userId', editSingleMedical);

module.exports = router;
