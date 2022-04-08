const { Schema, model } = require('mongoose');


const schema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
    medical: { type: Schema.Types.ObjectId, ref: 'Medical' },
    isCompleted: {
        type: String,
        possibleValues: ['Yes', 'No'],
    },
    results: [{
        type: Schema.Types.ObjectId,
        ref: 'Image',
        default: []
    }]
});

module.exports = model('Examination', schema);