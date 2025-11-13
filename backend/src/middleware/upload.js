import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

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
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const optionalResumeUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.startsWith('multipart/form-data')) {
    return uploader.single('resume')(req, res, next);
  }
  return next();
};

export const uploadResume = uploader;

