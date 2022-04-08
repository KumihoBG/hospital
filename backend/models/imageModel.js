const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    filename: String,
    metadata: Object,
    bucketName: String,
    chunkSize: Number,
    size: Number,
    md5: String,
    uploadDate: Date,
    contentType: String,
});

module.exports = model('Image', imageSchema);