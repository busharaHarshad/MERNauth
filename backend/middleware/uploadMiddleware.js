// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js';

const upload = multer({ storage });

export { upload };

/*import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;*/