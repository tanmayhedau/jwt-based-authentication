const express = require("express");
const {
  createUser,
  loginUser,
  getUserById,
  getUsers,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.get("/getuser/:userId", authentication, getUserById);
router.get("/getuser", authentication, getUsers);

module.exports = { router };
