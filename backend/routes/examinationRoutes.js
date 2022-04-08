const express = require('express');
const router = express.Router();
const { getAllExaminations, setExamination, getSingleExamination } = require('../services/examinationService');

router.get('/', async (req, res) => {
  const allExaminations = await getAllExaminations();
  return res.status(200).json(allExaminations);
});

router.get('/:examinationId', async (req, res) => {
  const examinationId = req.params.examinationId;
  const examination = await getSingleExamination(examinationId);
  return res.status(200).json(examination);
});

router.post('/create', async (req, res) => {
  const patientId = req.body.patient._id;
  const medicalId = req.body.medical._id;

  const newExamination = {
    patient: req.body.patient,
    medical: req.body.medical,
    isCompleted: req.body.isCompleted,
    results: req.body.results
  };
  const result = await setExamination(newExamination, patientId, medicalId);
  res.status(200).json(result);
});

module.exports = router;
