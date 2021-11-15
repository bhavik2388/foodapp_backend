const express=require('express');
// const userModel=require('../Models/userModel');
const userRouter=express.Router();
//const protectRoute=require('./authHelper')
const {getUser,getallUser,updateUser,deleteUser}=require('../Controller/userController');
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout}=require('../Controller/authController');
// const { application } = require('express');

userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)

userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getallUser)

module.exports=userRouter;