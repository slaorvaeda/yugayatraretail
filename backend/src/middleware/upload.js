import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Allowed MIME types for resumes
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// File validation function
const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
  }
  
  // Additional validation: check file extension
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
  
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error('Invalid file extension. Only .pdf, .doc, and .docx files are allowed.'), false);
  }
  
  cb(null, true);
};

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'intern-resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx'],
    transformation: [{ quality: 'auto' }]
  }
});

const uploader = multer({
  storage: resumeStorage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1 // Only allow one file
  },
  fileFilter: fileFilter
});

export const optionalResumeUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.startsWith('multipart/form-data')) {
    return uploader.single('resume')(req, res, next);
  }
  return next();
};

export const uploadResume = uploader;

