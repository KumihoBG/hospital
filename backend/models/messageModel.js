const { Schema, model } = require('mongoose');


const schema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
    medical: { type: Schema.Types.ObjectId, ref: 'Medical' },
    messages: [ ],
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

module.exports = model('Message', schema);