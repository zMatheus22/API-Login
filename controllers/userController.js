const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidate, registerValidate } = require("./validate");

const userController = {
  register: async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) {
      res.status(405).send(error.message);
    }

    const selectedUser = await User.findOne({ email: req.body.email });

    if (selectedUser) {
      return res.status(400).send("Email já utilizado!");
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    try {
      const saveUser = await user.save();
      res.send(saveUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  login: async function (req, res) {
    const { error } = loginValidate(req.body);
    if (error) {
      res.status(405).send(error.message);
    }
    
    const selectedUser = await User.findOne({ email: req.body.email });

    if (!selectedUser) {
      return res.status(400).send("Email ou senha incorreta, tente novamente!");
    }

    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      selectedUser.password
    );
    if (!passwordAndUserMatch) {
      return res.status(400).send("Email ou senha incorreta, tente novamente!");
    }

    const token = jwt.sign(
      { _id: selectedUser._id, admin: selectedUser.admin },
      process.env.TOKEN_SECRET
    );

    res.header("authoriztion-token", token);

    res.send("User Logged!");
  },
};

module.exports = userController;
