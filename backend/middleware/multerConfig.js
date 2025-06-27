import multer from 'multer';
import path from 'path';

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination folder for uploaded files
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the original name and current timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if( ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' ) {
        cb(null, true); // Accept the file
    } else{
        cb(new Error('Only images are allowed!'), false); // Reject the file
    }
};

const voiceFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) cb(null, true);
  else cb(new Error('Only audio files allowed'), false);
};

export const voiceUpload = multer({ storage, fileFilter: voiceFilter });

const upload = multer({
    storage: storage,
    fileFilter});
export default upload;
