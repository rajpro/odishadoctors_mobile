const express = require('express');

const{ registerUser, loginUser , getUsers} = require('../controller/authController');
const{ addDoctor, getDoctor, getAllDoctor, updateDoctor} = require('../controller/doctorDetailsController');

const { userRegisterValidate , userLoginValidate} = require('../utils/userValidation');

const jwtValidation = require('../utils/jwtValidation');

 const routes = express.Router();

 routes.post('/register', userRegisterValidate,  registerUser);

 routes.post('/login', userLoginValidate, loginUser);

 routes.post('/getuser', jwtValidation, getUsers);

 routes.post('/add_doctor', jwtValidation, addDoctor);
 routes.post('/get_all_doctors', jwtValidation, getAllDoctor);
 routes.post('/get_doctor', jwtValidation, getDoctor);
 routes.post('/update_doctor', jwtValidation, updateDoctor);
 

 module.exports = routes;