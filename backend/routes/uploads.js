const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const { uploadResult } = require('../services/examinationService');
const ImageModel = require('../models/imageModel');

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

router.post('/upload/:examinationId/:medicalId/:userId', upload.single('file'), async (req, res) => {
    const examinationId = req.params.examinationId;
    const medicalId = req.params.medicalId;
    const userId = req.params.userId;
    const file = req.file;
    const image = new ImageModel(file);
    image.save();

    const result = await uploadResult(image, examinationId, userId, medicalId);
    console.log('result', result);
    res.status(200).json(result).json({
            message: 'File uploaded successfully!',
            file: req.file
    });
    
});



module.exports = router;