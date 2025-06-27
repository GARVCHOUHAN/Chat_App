import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";


export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      const token = createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
        token,
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    const token = createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.user._id:", req.user?._id, typeof req.user?._id);

    const all = await User.find().select("-password");
    console.log("All users in DB:", all.map(u => ({ _id: u._id, fullname: u.fullname, email: u.email })));

    const loggedInUser = new mongoose.Types.ObjectId(req.user._id);
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    console.log("Filtered users:", filteredUsers.map(u => ({ _id: u._id, fullname: u.fullname, email: u.email })));

    res.status(201).json({ users: filteredUsers });
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};