const jwt = require("jsonwebtoken");

const jwtValidation = (req, res, next) =>{
    if(!req.headers['authorization']){
        return res.status(403).json({message:'Token is required.'})
    }

    try{
        const token = req.headers['authorization'].split(" ");
        const decode = jwt.verify(token[1], process.env.SECRET)
        return next();
    }catch(err){
        return res.status(403).json({message:"Token is not valid, or it's expired"});
    }
}

module.exports = jwtValidation