const express = require('express');
const { register, signup, login, userLogin, forgotPassword } = require('../Controller/user.controller');
const userRoutes = express.Router();
const {verifyToken} = require('../helpers/verifyToken');

userRoutes.get('/register',register);
userRoutes.post('/signup',signup);
userRoutes.get('/login',login);
userRoutes.post('/userlogin',userLogin);
userRoutes.post('/forgotpassword',forgotPassword)

module.exports = userRoutes;