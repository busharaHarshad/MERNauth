// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js';

const upload = multer({ storage });

export { upload };
