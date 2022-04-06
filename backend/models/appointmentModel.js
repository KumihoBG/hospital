const { Schema, model } = require('mongoose');


const schema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
    medical: { type: Schema.Types.ObjectId, ref: 'Medical' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    isApproved: {
        type: String,
        possibleValues: ['Yes','No'],
    }
});

module.exports = model('Appointment', schema);