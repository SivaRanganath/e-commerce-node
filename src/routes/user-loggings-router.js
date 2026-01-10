const express = require("express");
const {
  signUpuser,
  logInUser,
  getAllUsers,
  authenticateUser,
} = require("../controllers/user-log-controller");
const authorizationRouter = express.Router();
const { userAuth } = require("../middlewares/user-auth");

authorizationRouter.post("/signup", signUpuser);
authorizationRouter.post("/login", logInUser);
authorizationRouter.get("/authenticateUser", userAuth, authenticateUser);
authorizationRouter.get("/getAllUsers", userAuth, getAllUsers);

module.exports = authorizationRouter;
