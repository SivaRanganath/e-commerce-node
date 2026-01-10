const { UserModel } = require("../models/user-model");
const {
  validateUserSignUpData,
  validateKeysInBody,
} = require("../utils/user-validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "e-commerce-nodejs-backend";
const isProd = process.env.NODE_ENV === "production";

// sign up end point
exports.signUpuser = async (req, res) => {
  try {
    const userData = req.body;
    // checking is user request body is correct
    const isValidBody = validateKeysInBody(userData, UserModel.schema.obj);
    if (!isValidBody) {
      res.status(400);
      return res.send({ message: "Invalid request in request body" });
    }

    // validating user data
    const isUserDataErrors = validateUserSignUpData(userData);
    if (isUserDataErrors.length > 0) {
      res.status(400);
      return res.send({
        message: "Validation Errors",
        errors: isUserDataErrors,
      });
    }

    // let prevuser = User.find({ email: userData.email });
    // if (prevuser?._id) {
    //   return res.status(500).json({
    //     message: "user with same email exists",
    //   });
    // }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = new UserModel(userData);
    await user.save();
    res.status(201);
    res.send({ message: "User signed up successfully", data: user });
  } catch (error) {
    res.status(500);
    res.send({ message: "Internal Server Error", error: error.message });
  }
};

// sign in endpoint
exports.logInUser = async (req, res) => {
  try {
    let reqBody = req?.body;
    if (!reqBody?.email || !reqBody?.password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    } else {
      const user = await UserModel.findOne({ email: reqBody?.email });
      if (user && user._id) {
        const isPasswordMatch = await bcrypt.compare(
          reqBody?.password,
          user.password
        );
        if (isPasswordMatch) {
          let token = await jwt.sign({ userId: user._id }, secretKey);
          res?.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: isProd ? "none" : "lax",
            secure: isProd,
          });
          res.status(200);
          res.json({ message: "Login successful" });
        } else {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.authenticateUser = async (req, res) => {
  res.send(200);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
