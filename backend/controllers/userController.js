import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
import { cloudinary } from "../config/cloudinaryConfig.js";

//Auth user/set token
//route POST/api/users/auth
//access public
const authUser = asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    res.status(201).json({ 
       _id:user._id,
       name:user.name,
       email:user.email,
       profileImage:user.profileImage,
    })
   }else{
    res.status(401)
    throw new Error('Invalid email or password')
   }
})

//Register a new user
//route POST/api/users
//access public
const registerUser = asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body;

   const userExists=await User.findOne({email})
   if(userExists){
    res.status(400);
    throw new Error('user already exist')
   }

   const user = await User.create({
    name,
    email,
    password
   })

   if(user){
    generateToken(res,user._id);
    res.status(201).json({
       _id:user._id,
       name:user.name,
       email:user.email,
       profilImage:user.profileImage,
    })
   }else{
    res.status(400)
    throw new Error('Invalid user data')
   }
   
})

//Logout User
//route POST/api/users/logout
//access public
const logoutUser = asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
       httpOnly:true,
       expires:new Date(0), 
    })
    res.status(200).json({message:' Logout User '})
})

//User profile
//route POST/api/users/profile
//access private
const getUserProfile = asyncHandler(async(req,res)=>{
   
   const user={
      _id:req.user._id,
      name:req.user.name,
      email:req.user.email,
      profileImage:req.user.profileImage,
     
   }
   
   res.status(200).json(user)
})

//update User profile
//route POST/api/users/profile
//access private
/*const updateUserProfile = asyncHandler(async(req,res)=>{
  
  const user= await User.findById(req.user._id)

  if(user){
   user.name=req.body.name || user.name;
   user.email=req.body.email || user.email;
   if(req.body.password){
      user.password=req.body.password;
   }
    // Handle image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.profileImage = result.secure_url; // Save Cloudinary URL to the user's profile
    }
   const updatedUser=await user.save();
   res.status(200).json({
     _id:updatedUser._id,
     name:updatedUser.name,
     email:updatedUser.email,
     profileImage: updatedUser.profileImage,
     
   })
  }else{
   res.status(404)
   throw new Error('User not found')
  }

   res.status(200).json({message:' update user profile'})
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const isPasswordCorrect = await user.matchPassword(
      req.body.currentPassword
    );
    if (!isPasswordCorrect) {
      console.log("matchPassword error");
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.file) {
      try {
        if (user.profileImage) {
          console.log(user.profilImage);
          const publicId = user.profilImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        const res = await cloudinary.uploader.upload(req.file.path);
        user.profilImage = res.secure_url;
      } catch (err) {
        console.log("Error uploading to cloudinary");
        return res
          .status(400)
          .json({ error: "Image upload to cloudinary failed" });
      }
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profilImage,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Update user profile" });
});
 */
// Update user profile controller
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    
    if (password) {
      user.password = password; // Make sure to hash the password before saving
    }

    if (req.file) {
      // Cloudinary image URL is available in req.file.path
      user.profileImage = req.file.path;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};