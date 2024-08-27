import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";


const adminLogin= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password)) && user.isAdmin) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password or not an admin');
    }
  });
/*...................
const registerAdmin=expressAsyncHandler(async(req,res)=>{
res.status(200).json({message:'Register Admin'})
})*/
//...........
const logoutAdmin= asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out' });
  });
//..................
const getAdminProfile= asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user && user.isAdmin) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});
//...................
// Get all users
const getUsers = asyncHandler(async (req, res) => {
 
  const users = await User.find({ isAdmin: false });
  res.json(users);
});
//.........................
// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    if (user) {
      console.log("remove if")
      await User.findByIdAndDelete(req.params.id);
      console.log('removed')
      res.status(200).json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  //search................
  const searchUsers = asyncHandler(async (req, res) => {
    const { query } = req.query; // Get search query from request
    let users;
  
    if (query) {
      // Search for users by name or email
      users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      });
    } else {
      // Fetch all users if no query is provided
      users = await User.find({ isAdmin: false });
    }
  
    res.status(200).json(users);
  });

  //user update
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
  
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
  
    // Check if the user already exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    // Create and save a new user in the database
    const user = new User({
      name,
      email,
      password,
    });
  
    const createdUser = await user.save();
  
    if (createdUser) {
      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
export{
    adminLogin,
    logoutAdmin,
    getAdminProfile,
    getUsers,
    deleteUser,
    searchUsers,
    updateUser,
    createUser,
}