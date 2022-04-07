
const Examination = require('../models/examinationModel');
const User = require('../models/userModel');
const Medical = require('../models/medicalModel');

async function getAllExaminations() {
    let query = await Examination.find().populate('patient').populate('medical').exec();
    return query;
  }

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

async function uploadResult(selectedFile, examinationId, userId, medicalId) {
    const examination = await Examination.findById(examinationId);
    const user = await User.findById(userId);
    const medical = await Medical.findById(medicalId);
    console.log('selectedFile', selectedFile);
    console.log(typeof examination.results);
    try {
        if(examination) {
            examination.results.push(selectedFile);
            examination.isCompleted = true;
        } else {
            throw new Error('Examination does not exist');
        }
        if(user.myExaminations.includes(examination._id)){
            user.myExaminations = [];
        } else {
            throw new Error('Examination does not exist');
        }
        if(medical.myExaminations.includes(examination._id)){
            const filtered = medical.myExaminations.filter(examination => examination._id !== examinationId);
            medical.myExaminations = filtered;
        } else {
            throw new Error('Examination does not exist');
        }

        return Promise.all([medical.save(), user.save(), examination.save()]);
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
}

module.exports = {
    getAllExaminations,
    setExamination,
    uploadResult
}