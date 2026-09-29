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
  res.status(201).json({
    message: "User registered successfully!",
    user: { _id: user._id, name: user.name, email: user.email },
    token,
  });
}

async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Email or password is invalid." });
  }

  const isValidPassword = user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Email or password is invalid." });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETS, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res.status(200).json({
    message: "User login successfully!",
    user: { _id: user._id, name: user.name, email: user.email },
    token,
  });
}

module.exports = { userRegisterController, userLoginController };
