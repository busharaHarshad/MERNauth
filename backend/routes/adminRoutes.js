import express from "express";
const router=express.Router()
import { adminLogin,logoutAdmin,getAdminProfile,getUsers,deleteUser,searchUsers,updateUser,createUser } from "../controllers/adminController.js";
import { protect,admin } from "../middleware/authMiddleware.js";
router.post('/login',adminLogin)
router.post('/logoutadmin',logoutAdmin)
router.get('/adminprofile',protect,admin,getAdminProfile)
router.post('/createusers', protect, admin, createUser);
// User management routes
router.get('/users', getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/search', searchUsers);  
router.put('/users/:id', protect, admin, updateUser);

export default router