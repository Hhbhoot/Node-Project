const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async(req,res)=>{
    try{
        let user = await User.findOne({ email : eamil, isDelete : false })
        if(user){
            return res.json({ message : "User Already Exists.."})
        };

        let salt = 10 ;
        let hashPassword = bcrypt.hash(password,salt);
        
        let payload = {
            userId : req.user._id
        }
      
        let token = jwt.sign(payload,process.env.SECRET_KEY);

        user = await User.create({
            password : hashPassword,
            token : token,
            ...req.body
        });
        user.save();
        res.status(201).json({message : "User Created Successfully"})
    }
    catch(err){

    }
}