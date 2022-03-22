const { Schema, model } = require('mongoose');
const { checkSchema } = require('express-validator');

const userSchema = new Schema({
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
    gender: {
        type: String,
        possibleValues: ['male','female'],
        required: true
    },
    tripsHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'Submodel',
        default: []
    }],
    image: {
        type: String,
    }
});

module.exports = model('User', userSchema);