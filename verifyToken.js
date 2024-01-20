const jwt = require('jsonwebtoken');
const User = require('./Model/user.model');

exports.verifyToken = async (req,res,next)=>{
    
        let token =await req.headers['authorization'].split(' ')[1];
        // console.log(token)

        const { userId } = jwt.verify(token,process.env.SECRET_KEY)
        // console.log(userId);
        req.user= await User.findById(userId);
        // console.log(req.user);

        if(req.user){
            next();
        } 
        else{
            console.log("invalid User..");
        }

    }
     
    // exports.verifyToken = async (req,res,next)=>{

    // let token = req.headers["authorization"].split(" ")[1]

    // let { userId } = jwt.verify(token,process.env.SECRET_KEY);
    // // console.log(userId);
    // req.user = await User.findById(userId);
    // if(req.user){
    //     next();
    // }
    // else{
    //     res.json({message : "invalid User.."})
    // }
