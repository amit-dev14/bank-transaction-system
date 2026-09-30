const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
  const user = req.user;

  const account = accountModel.create({
    userId: user._id,
  });

  res.status(201).res({ message: "Account created successfully!" }, account);
}

module.exports = {createAccountController};
