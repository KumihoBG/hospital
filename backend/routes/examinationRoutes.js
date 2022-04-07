const express = require('express');
const router = express.Router();
const { setExamination } = require('../services/examinationService');

router.post('/create', async (req, res) => {
    const newExamination = {
        patient: req.body.patient,
        medical: req.body.medical,
        isCompleted: req.body.isCompleted,
        results: req.body.results
    };
    const result = await setExamination(newExamination);
    res.status(200).json(result);
  });

module.exports = router;
