const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Home page controller
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to my world..........this is the controller");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register logic
const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "Registration is successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

// Login logic
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
  
      const isPasswordCorrect = await userExist.comparePassword(password);
  
      if (isPasswordCorrect) {
        res.status(200).json({
          msg: "Login Successful",
          token: userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ msg: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error in login controller:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }


  // To send user data - user Logic

  const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({userData});
      res.status(200).json({ msg: "Hi user"});
        } catch (error) {
      console.log(`error from the user route ${error}`);
    }
  }


module.exports = { home, register, login, user };
