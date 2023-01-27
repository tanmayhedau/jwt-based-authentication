const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  isValidBody,
  isValid,
  isValidEmail,
  isValidPassword,
  isValidId,
} = require("../validations/validators");

const createUser = async (req, res) => {
  try {
    let data = req.body;

    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter some data" });
    }

    let { name, email, password } = data;
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "please enter full name!" });
    }

    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter valid name" });
    }

    if (!email) {
      return res.status(400).send({
        status: false,
        message: "please enter email address!",
      });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter correct email address" });
    }

    let checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(409).send({
        status: false,
        message: "user with this email is already registered",
      });
    }

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "please enter correct password!",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
      });
    }

    let savedData = await userModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "success", data: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let data = req.body;

    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter some data" });
    }

    let { email, password } = data;

    if (!email) {
      return res.send({
        status: false,
        message: "please enter correct email address",
      });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter correct email address" });
    }

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "please enter correct password!",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
      });
    }
    let checkEmail = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!checkEmail) {
      return res.status(400).send({
        status: false,
        message: "please correct registered email and password",
      });
    }

    let token = jwt.sign(
      { _id: checkEmail._id.toString() },
      "jwt_token_secretkey",
      { expiresIn: "72h" }
    );
    return res.status(200).send({
      status: true,
      message: "token created successfully",
      data: { userId: checkEmail._id, token: token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    let userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "please give userID" });
    }

    if (!isValidId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "please give correct userID" });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).send({ status: false, message: "user not found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "user deatils", data: userData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let data = req.query;
    let { name, email } = data;

    if (name && isValid(name)) {
      let findName = await userModel.findOne({ name: name });
      if (!findName) {
        return res
          .status(400)
          .send({ status: false, message: "please give correct name" });
      }

      return res
        .status(200)
        .send({
          status: true,
          message: "user details fetched successfully",
          data: findName,
        });
    }

    if (email && isValidEmail(email)) {
      let findEmail = await userModel.findOne({ email: email });
      if (!findEmail) {
        return res.status(400).send({
          status: false,
          message: "please give correct email address",
        });
      }

      return res
        .status(200)
        .send({
          status: true,
          message: "user details fetched successfully",
          data: findEmail,
        });
    }

    let getAllUsers = await userModel.find({ isDeletd: false });
    return res
      .status(200)
      .send({
        status: true,
        message: "user details fetched successfully",
        data: getAllUsers,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUser, loginUser, getUserById, getUsers };
