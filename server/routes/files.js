// server/routes/files.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { getMongoClient } = require('../config/db');
const authMiddleware = require('../helpers/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

function getBucket() {
    const client = getMongoClient();
    const db = client.db(process.env.DB_NAME);
    return new GridFSBucket(db);
}

async function getFiles() {
    const client = getMongoClient();
    const db = client.db(process.env.DB_NAME);
    const filesCollection = db.collection('fs.files');
    return await filesCollection.find({}).toArray();
}

router.get('/manage-files', authMiddleware, async (req, res) => {
    try {
        const files = await getFiles();
        const locals = { title: "Gestion des fichiers" };
        res.render('admin/manage-files', { locals, files, currentRoute: '/manage-files' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors de la récupération des fichiers.');
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const { buffer, originalname } = req.file;
    try {
        const bucket = getBucket();
        const uploadStream = bucket.openUploadStream(originalname);
        uploadStream.end(buffer);
        res.redirect('/files/manage-files');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors de l\'upload du fichier.');
    }
});

router.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    try {
        const bucket = getBucket();
        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erreur lors du téléchargement du fichier.');
    }
});

module.exports = router;
