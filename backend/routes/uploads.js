const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const { uploadResult } = require('../services/examinationService');
const ImageModel = require('../models/imageModel');
const Grid = require('gridfs-stream');

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

router.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
    gfs.files.findOne({filename: filename}, (err, file) => {
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'File not found'
            });
        }
        return res.json(file);
    });
});

router.get('/image/:filename', async (req, res) => {
    const filename = req.params.filename;
    let gridfsBucket;
    let gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gridfsBucket = new mongoose.mongo.GridFSBucket(gfs.db, {
          bucketName: 'uploads'
    });
    gfs = Grid(gfs.db, mongoose.mongo);
    gfs.collection('uploads');

    gfs.files.findOne({filename: filename}, (err, file) => {
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'File not found'
            });
        }
        // Check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

router.get('/images/:imageId', async (req, res) => {
    const imageId = req.params.imageId;
    const image = await ImageModel.findById(imageId);
    if(!image) {
        return res.status(404).json({
            err: 'Image not found'
        });
    }

    return res.status(200).json(image);
});

module.exports = router;