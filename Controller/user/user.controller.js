const User = require("../../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 const cookieParser = require('cookie-parser');
 const nodemailer = require('nodemailer');
 const config = require('../../config/config');

exports.signup = async (req, res) => {
  try {
       
    // const { firstname, lastname, username, email, password ,file  } = req.body;
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    // console.log(user);
    if (user) {
      return res.json({ message: "User Already Exists.." });
    }

    else{
      let image ;

      if (req.file) {
        console.log(req.file);
        image = `${req.file.path.replace(/\\/g, "/")}`;
        console.log(image)
      }

     let salt = 10;
    let hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
       firstname : req.body.firstname ,
       lastname : req.body.lastname,
      username : req.body.username ,
      email : req.body.email ,
       password: hashPassword,
      image : image
    });
    user.save();
    res.status(201).json({ message: "User Created Successfully" , user});
   }
  } catch (err) {
     console.log(err);
    return res.json({ message: "internal server error" });
 }
 };

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User Not Found..." });
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res.json({ message: "Please Enter Correct Password" });
    }
    let payload = {
      userId: user._id
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);
    // console.log(token);

     res.cookie('jwt',token ,{
      expires : new Date(Date.now()+24*60*60*1000),
      httpOnly : true,
      secure : true
     })

  
    let setToken = await User.findOneAndUpdate({email : email} , { $set : { token : token}})
    setToken.save();

  res.status(200).json({ message: "Login successful...", userData: user });
  

  } catch (error)
   {    console.log(error);
   res.json({ message: "Internal Server Error.." });
 }
 };

 const sendResetPasswordMail = async(name,email,token)=>{

     try {
       
       transporter : nodemailer.createTransport({
        host :"smtp.gmail.com",
        port : 587,
        secure : false,
        requireTLS : true,
        auth : {
          User : config.emailUser,
          Pass : config.emailPassword
        }

       });

       const mailOptions = {
        from : config.emailUser,
        to : email,
        subject : 'for Reset Password',
        html : '<p> Hii ' +name+ ', please copy the link and reset your password'
       }
       transporter.sendMail(mailOptions,function(err , info){

        if(err){
          console.log(err)
        }else{
          console.log("Mail Has Been Sent :-",info.response )
        }

       })

     } catch (error) {
      
     }

 }

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    if (!user) {
      return res.status(404).json({ message: "User Not Found..." });
    }
    if (newPassword === confirmNewPassword) {
      let salt = 10;
      let hashPassword = await bcrypt.hash(newPassword, salt);

      let updateUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hashPassword } }
      );
      updateUser.save();
      return res
        .status(200)
        .json({ message: "Password Updated Successfully.." });
    } else {
      return res.json({
        message: "newpassword and confirmnewpassword are not matching..",
      });
    }
    

  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error.." });
  }
};
