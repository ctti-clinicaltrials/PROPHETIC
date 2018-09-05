const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const dbConfig = require('../db');
const jwt = require('../middleware/jwtCheck');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');
const progress = require('progress-stream');


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
router.post('/', jwt.check(), upload, (req, res) => {
    res.json({ file: req.file });
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/', jwt.check(), (req, res) => {
    gfs.files.find().toArray((err, files) => {
        return res.json(files);
    });
});

// @route GET /files/download:id
// @desc  download single file object
router.get('/download/:id', jwt.check(), (req, res) => {
    gfs.files.findOne({ _id: mongoose.mongo.ObjectId(req.params.id) }, (err, file) => {
        if (err || !file) {
            res.status(404).send('File not found');
            return
        }
        // res.writeHead(200, {'Content-Length': file.length})
        let str = progress({
            length: file.length,
            time: 100 /* ms */
        });
        str.on('progress', (progress) => {
            console.log(progress);
        });
        // const filesize = file.length;
        // let bytesCopied = 0;
        // let percentage = 0;
        let fsWriteStream = fs.createWriteStream(path.join(os.homedir(), `Desktop/${file.filename}`))
        const readstream = gfs.createReadStream({ _id: req.params.id, content_type: file.contentType, metadata: file.length });
        readstream.on('data', (chunk) => {
            // bytesCopied += chunk.length;
            // console.log(bytesCopied)
            // percentage = ((bytesCopied/filesize)*100).toFixed(2);
            // console.log(percentage+'%')
        });
        readstream.on('error', () => res.end());
        // readstream.pipe(str).pipe(fsWriteStream);
        res.send(readstream.pipe(str).pipe(fsWriteStream))
        // fsWriteStream.on('close', () => console.log('done writing'))
    });
});

// @route GET /files/:id
// @desc  Display single file object
router.get('/:id', jwt.check(), (req, res) => {
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
router.delete('/:id', jwt.check(), (req, res) => {
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