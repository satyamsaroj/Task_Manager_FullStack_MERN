

import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signupUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new userModel({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({
      success: true,
      token,
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      const token = generateToken(existingUser._id);
      res.status(200).json({
        token,
        _id: existingUser._id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

const google = asyncHandler(async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const { password, ...rest } = user._doc;
      return res.status(200).json({ token, ...rest });
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new userModel({
      firstname: name.split(" ")[0],
      lastname: name.split(" ")[1] || "",
      email,
      profilePicture: googlePhotoUrl,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { password, ...rest } = newUser._doc;
    return res.status(200).json({ token, ...rest });

  } catch (error) {
    throw new Error(error.message);
  }
});

export { signupUser, loginUser, logoutUser, google };
