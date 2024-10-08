const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  register: async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //save user and send response
      const savedUser = await newUser.save();
      res.status(200).json(savedUser._id);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      //find the user
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(400).json("Wrong username or passowrd");
      }
      //validate the user
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        res.status(400).json("Wrong username or passowrd");
      }
      //send response
      res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
