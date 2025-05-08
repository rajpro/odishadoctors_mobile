
const UserModel = require("../models/UserModel")

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");


module.exports = {
    registerUser : async (req, res) =>{
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try{

            const email_validate = await UserModel.findOne({email:req.body.email});
            if(email_validate){
                return res.status(200).json({status:"fail",message:'email already used. use diffrent email.'});
            }
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({message:'sucess', data:response});
        }catch(err){
            return res.status(500).json({message:'error', err});
        }
    },
    
    loginUser : async (req, res) =>{
        try{
            const user = await UserModel.findOne({email:req.body.email});
            if(!user){
                return res.status(401).json({message:'authentication failed, Invalid usernmae/password'});
            }

            const given_password = await bcrypt.compare(req.body.password, user.password);

            if(!given_password){
                return res.status(401).json({message:'authentication failed, Invalid usernmae/password'})
            }

            const tokenObject = {
                _id: user._id,
                user_name: user.user_name,
                email: user.email
            };

            const jwtToken = jwt.sign(tokenObject, process.env.SECRET , {expiresIn:'4h'});
            return res.status(200).json({message:'sucess' , jwtToken:jwtToken, tokenObject: tokenObject });
        }catch(err){
            return res.status(500).json({message:'error', err});
        }
    },

    getUsers : async (req, res) =>{
        try{
            const { user_id } = req.body;
            let user;
            if(user_id){
                user = await UserModel.findOne({_id:user_id}, {password:0});
            }else{
                user = await UserModel.find({}, {password:0});
            }
            if (!user || (Array.isArray(user) && user.length === 0)) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({message:'sucess' , data:user});
        }catch(err){
            return res.status(500).json({message:'error', err});
        }
    } 

}

