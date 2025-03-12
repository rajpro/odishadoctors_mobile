const express = require('express');

const{ registerUser, loginUser , getUsers} = require('../controller/authController');

const { userRegisterValidate , userLoginValidate} = require('../utils/userValidation');

const jwtValidation = require('../utils/jwtValidation');

 const routes = express.Router();

 routes.post('/register', userRegisterValidate,  registerUser);

 routes.post('/login', userLoginValidate, loginUser);

 routes.post('/getuser', jwtValidation, getUsers);

 module.exports = routes;