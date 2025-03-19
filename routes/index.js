const express = require('express');

const{ registerUser, loginUser , getUsers} = require('../controller/authController');
const{ addDoctor, getDoctor, updateDoctor} = require('../controller/doctorDetailsController');

const { userRegisterValidate , userLoginValidate} = require('../utils/userValidation');

const jwtValidation = require('../utils/jwtValidation');

 const routes = express.Router();

 routes.post('/register', userRegisterValidate,  registerUser);

 routes.post('/login', userLoginValidate, loginUser);

 routes.post('/getuser', jwtValidation, getUsers);

 routes.post('/add_doctor', jwtValidation, addDoctor);
 routes.post('/get_doctors', jwtValidation, getDoctor);11
 routes.post('/update_doctor', jwtValidation, updateDoctor);
 

 module.exports = routes;