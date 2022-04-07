
const Examination = require('../models/examinationModel');
const User = require('../models/userModel');
const Medical = require('../models/medicalModel');

async function setExamination(newExamination, patientId, medicalId) {
    const examination = new Examination(newExamination);
    const user = await User.findById(patientId);
    const medical = await Medical.findById(medicalId);

    try {
        if(!user.myExaminations.length >= 1){
            user.myExaminations.push(examination);
        }
        else{
            throw new Error('You already have an examination');
        }
        if(medical.myExaminations.includes(examination._id)){
            throw new Error('Examination already exists');
        } else {
            medical.myExaminations.push(examination);
        }
        return Promise.all([medical.save(), user.save(), examination.save()]);
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

module.exports = {
    setExamination
}