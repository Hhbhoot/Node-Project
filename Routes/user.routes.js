const express = require('express');
const {  signup,  userLogin,  resetPassword } = require('../Controller/user.controller');
const userRoutes = express.Router();
const {verifyToken} = require('../helpers/verifyToken');
const {upload} = require('../helpers/imageupload')
const { register} = require('../views/rendor/registerPage')
const { login } = require('../views/rendor/loginPage');
const { forgotPassword} = require('../views/rendor/resetPassword');


userRoutes.get('/register',register);
userRoutes.post('/signup',upload.single('image'),signup);
userRoutes.get('/login',login);
userRoutes.post('/userlogin',userLogin);
userRoutes.get('/forgotpassword',forgotPassword)
userRoutes.post('/resetpassword',resetPassword)

module.exports = userRoutes;