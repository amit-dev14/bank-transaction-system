const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userRegisterController(req, res) {
  const { email, name, password } = req.body;

  const isEmailExists = await userModel.findOne({
    email: email,
  });

  if (isEmailExists) {
    return res.status(422).json({
      message: "User is already exists with this email.",
      status: "Failed",
    });
  }
  const user = await userModel.create({ email, name, password });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETS, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res
    .status(201)
    .json({
      message: "User registered successfully!",
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
}

module.exports = { userRegisterController };
