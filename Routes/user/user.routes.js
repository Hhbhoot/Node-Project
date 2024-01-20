const express = require('express');
const {  signup,  userLogin,  resetPassword, forgotPassword, updateProfile, changePassword } = require('../../Controller/user.controller');
const userRoutes = express.Router();
const {verifyToken} = require('../../verifyToken');
const { register} = require('../../views/rendor/registerPage')
const { login } = require('../../views/rendor/loginPage');
const { rendorForgotPassword } = require('../../views/rendor/forgot-password');
const { upload } = require("../../imageupload");
const { renderResetPassword } = require('../../views/rendor/resetPassword');


userRoutes.get('/register',register);
userRoutes.post('/signup',upload.single('image'),signup);
userRoutes.get('/login',login);
userRoutes.post('/userlogin',userLogin);

userRoutes.get('/forgotpassword',rendorForgotPassword)
userRoutes.post('/forgotpassword',forgotPassword);

userRoutes.get('/resetpassword',renderResetPassword)
userRoutes.post('/resetpassword',resetPassword);

userRoutes.put('/updateprofile',verifyToken,upload.single("image"),updateProfile);
userRoutes.put('/changepassword',verifyToken,changePassword);


module.exports = userRoutes;