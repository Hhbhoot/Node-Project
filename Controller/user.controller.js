const User = require("../Model/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { resetPasswordSendMail } = require('../Helpers/nodemailler');

exports.signup = async (req, res) => {
  try {
    // const { firstname, lastname, username, email, password ,file  } = req.body;
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    // console.log(user);
    if (user) {
      return res.json({ message: "User Already Exists.." });
    } else {
      let image;
      if (req.file) {
        console.log(req.file);
        image = `${req.file.path.replace(/\\/g, "/")}`;
        // console.log(image);
      }

      let salt = 10;
      let hashPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        image: image,
        is_admin: req.body.is_admin
      });

      let payload = {
        userId: user._id,
      };
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      // console.log(token);

      user.token = token;
      user.save();
      res.status(201).json({ message: "User Created Successfully", user });
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
    res.status(200).json({ message: "Login successful...", userData: user });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error.." });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  let user = await User.find({ email: email, isDelete: false });

  if (!user) {
    return res.json({ message: "Email Not Registered.." });
  } else {
    let payload = {
      userId: user._id,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);

    resetPasswordSendMail(email, token);
    return res.json({ message: "Link send Successfully to your Email" });

  }
};

exports.resetPassword = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.query.token);

    const token = req.query.token;

    let user = await User.find({ token: req.query.token, isDelete: false });
    if (!user) {
      return res.status(404).json({ message: "User Not Found..." });
    } else {
      const { email, newPassword, confirmNewPassword } = req.body;

      if (newPassword === confirmNewPassword) {

        if (newPassword != user.password) {
          let salt = 10;
          let hashPassword = await bcrypt.hash(newPassword, salt);

          let updateUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hashPassword } }
          );
          updateUser.save();
          return res
            .status(200)
            .json({ message: "Password Updated Successfully..", updateUser });
        } else {
          return res.json({ message: "newPassword and currentPassword can not be same.." })
        }
      } else {
        return res.json({
          message: "newpassword and confirmnewpassword are not matching..",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error.." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // console.log(req.user)
    let filepath;
    if (req.file) {
      filepath = `${req.file.path.replace(/\\/g, '/')}`;
    }

    let user = await User.findByIdAndUpdate(req.user._id, { $set: { ...req.body }, image: filepath }, { new: true })
    user.save();
    console.log(user)
    if (user) {
      return res.json({ message: " User updated Successfully" })
    }
    else {
      return res.json({ message: "User not Found.." })
    }

  } catch (error) {
    console.log(error);
    return res.json({ message: "internal server Error... " })
  }
}
exports.changePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;

    if (newPassword === confirmNewPassword) {
      if (password != newPassword) {

        let salt = 10;
        let hashPassword = await bcrypt.hash(newPassword, salt);

        let user = await User.findByIdAndUpdate(req.user._id, { $set: { password: hashPassword } })
        if (user) {
          return res.json({ message: "Password Updated Successfully..." })
        }

      }
      else {
        return res.json({ message: "current password and newpassword can not be same.." })
      }
    } else {
      return res.json({ message: "newpassword and confirmnewpassword are not matching.." })
    }
  } catch (error) {
    console.log(error)
    return res.json({ message: "Internal Server Error.." })
  }
}