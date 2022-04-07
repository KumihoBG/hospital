const { Schema, model } = require('mongoose');


const schema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
    medical: { type: Schema.Types.ObjectId, ref: 'Medical' },
    isCompleted: {
        type: String,
        possibleValues: ['Yes','No'],
    },
    results: []
});

module.exports = model('Examination', schema);