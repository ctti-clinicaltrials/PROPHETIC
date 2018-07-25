const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const dbConfig = require('../db');
const router = express.Router();


const conn = mongoose.createConnection(dbConfig.DB);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: dbConfig.DB,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: file.originalname,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage: storage }).single('file');

// @route POST /upload
// @desc  Uploads file to DB
router.post('/', upload, (req, res) => {
    res.json({ file: req.file });
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        return res.json(files);
    });
});

// @route GET /files/download:id
// @desc  download single file object
router.get('/download/:id', (req, res) => {
    const id = req.params.id;
    gfs.files.findOne({ _id: mongoose.mongo.ObjectId(req.params.id) }, (err, file) => {
        if (err || !file) {
            res.status(404).send('File not found');
            return
        }
        const readstream = gfs.createReadStream({ _id: id });
        readstream.pipe(res);
    });
});

// @route GET /files/:id
// @desc  Display single file object
router.get('/:id', (req, res) => {
    gfs.files.findOne({ _id: mongoose.mongo.ObjectId(req.params.id) }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'File not found'
            });
        }
        return res.json(file);
    });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:id', (req, res) => {
    // delete file
    conn.db.collection('uploads.files', {}, (err, files) => {
        files.remove({_id: mongoose.mongo.ObjectId(req.params.id)}, (err, res) => {
            if (err) {
                res.status(500);
            }
        });
    });
    // delete file chunks
    conn.db.collection('uploads.chunks', {}, (err, chunks) => {
        chunks.removeMany({files_id: mongoose.mongo.ObjectId(req.params.id)}, (err, res) => {
            if (err) {
                res.status(500);
            }
        });
    });
    return res.json({ success: `deleted file with ID ${req.params.id}`,  });
});

module.exports = router;