
const Examination = require('../models/examinationModel');

async function setExamination(newExamination) {
    const examination = new Examination(newExamination);
    try {
        await examination.save();
        return examination;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

module.exports = {
    setExamination
}