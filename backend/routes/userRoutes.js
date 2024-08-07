import express from 'express'
const router= express.Router();
import {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile')
.get(protect,getUserProfile)
.put(protect,upload.single('profileImage'),updateUserProfile)

export default router; 