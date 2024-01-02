const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: user,
    });
  } catch (err) {
    res.status(400).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        Success: false,
        Message: "User not found",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          status: 0,
          message: "Wrong Password",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            Email: username,
          },
          "vp@123",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          Success: true,
          Messsage: "Success",
          Data: user,
          token: token,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};
