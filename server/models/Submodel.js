const { Schema, model } = require('mongoose');

const submodelSchema = new Schema({
    startPoint: {
        type: String,
        required: [true, 'Start point is required.'],
        minlength: [4, 'Starting point must be at least 4 characters long']
    },
    endPoint: {
        type: String,
        required: [true, 'End point is required.'],
        minlength: [4, 'Ending point must be at least 4 characters long']
    },
    date: {
        type: String,
        required: [true, 'Date is required.'],
    },
    time: {
        type: String,
        required: [true, 'Time is required.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required.'],
        match: /^https?:\/\//i,
    },
    carBrand: {
        type: String,
        required: [true, 'Brand is required.'],
        minlength: [4, 'Car brand must be at least 4 characters long']
    },
    seats: {
        type: Number, 
        required: [true, 'Seats are required.'],
        min: 0,
        max: 4
    },
    price: {
        type: Number, 
        required: [true, 'Price is required.'],
        min: 1,
        max: 50
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    buddies: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
});

module.exports = model('Submodel', submodelSchema);