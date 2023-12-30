const User = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  res.render("register");
};

exports.login = async (req, res) => {
  res.render("login");
};

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    console.log(user);
    if (user) {
      return res.json({ message: "User Already Exists.." });
    }

    let salt = 10;
    let hashPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      ...req.body,
      password: hashPassword,
      
    });
    user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "internal server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email, isDelete: false });
    if (!user) {
      res.status(404).json({ message: "User Not Found..." });
    }
    let checkPassword = await bcrypt.compare(user.password, password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res.json({ message: "Please Enter Correct Password" });
    }
    let payload = {
      userId: user._id
    };

    let token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log(token);
  
    let setToken = await User.findOneAndUpdate({email : email} , { $set : { token : token}})
    setToken.save();

    res.status(200).json({ message: "Login successful...", userData: user });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error.." });
  }
};

exports.forgotPassword = async (req, res) => {
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
