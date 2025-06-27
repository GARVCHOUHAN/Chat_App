import express from 'express';
import { uploadFile,uploadvoice } from '../controller/upload.controller.js';
import upload from '../middleware/multerConfig.js';
import { voiceUpload } from '../middleware/multerConfig.js';

const router = express.Router()

router.post('/file', upload.single('file'), uploadFile);
router.post('/voice', voiceUpload.single('voice'), uploadvoice);
export default router;