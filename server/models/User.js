const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+$/g, 'Please enter first name and last name.'],
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        isEmail: {
            bail: true,
        },
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 4,
    },
    role: {
        type: String,
        possibleValues: ['patient'],
    },
    myMedicalProfessional: [{
        type: Schema.Types.ObjectId,
        ref: 'Submodel',
        default: []
    }],
    imageUrl: {
        type: String,
    }
});

module.exports = model('User', userSchema);