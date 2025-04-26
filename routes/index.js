const express = require('express');

const{ registerUser, loginUser , getUsers} = require('../controller/authController');
const{ addDoctor, getDoctor, getAllDoctor, updateDoctor} = require('../controller/doctorDetailsController');
const{ addPost, getPost, getAllPost, updatePost, addComment, getComment, getAllComment, updateComment} = require('../controller/postController');
const{ addWishlist, getWishlist, getAllWishlist, updateWishlist, toggleWishlist} = require('../controller/wishlistController');

const { userRegisterValidate , userLoginValidate} = require('../utils/userValidation');

const jwtValidation = require('../utils/jwtValidation');

 const routes = express.Router();

 routes.post('/register', userRegisterValidate,  registerUser);

 routes.post('/login', userLoginValidate, loginUser);

 routes.post('/getuser', jwtValidation, getUsers);

 routes.post('/add_doctor', jwtValidation, addDoctor);
 routes.post('/get_all_doctors', getAllDoctor);
 routes.post('/get_doctor', getDoctor);
 routes.post('/update_doctor', jwtValidation, updateDoctor);

 routes.post('/add_post', jwtValidation, addPost);
 routes.post('/get_all_post', getAllPost);
 routes.post('/get_post', getPost);
 routes.post('/update_post', jwtValidation, updatePost);

 routes.post('/add_comment', jwtValidation, addComment);
 routes.post('/get_all_comment', getAllComment);
 routes.post('/get_comment', getComment);
 routes.post('/update_comment', jwtValidation, updateComment);


 routes.post('/add_wishlist', jwtValidation, addWishlist);
 routes.post('/get_all_wishlist', jwtValidation, getAllWishlist);
 routes.post('/get_wishlist', jwtValidation, getWishlist);
 routes.post('/update_wishlist', jwtValidation, updateWishlist);
 routes.post('/toggle_wishlist', jwtValidation, toggleWishlist);


 module.exports = routes;