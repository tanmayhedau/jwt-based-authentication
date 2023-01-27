const mongoose = require("mongoose");

const isValidBody = (data) => {
  return Object.keys(data).length > 0;
};

const isValidPassword = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
    password
  );
};

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidEmail = (mail) => {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
};

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) {
    return false;
  }

  if (typeof value === "string" && value.trim().length === 0) {
    return false;
  }

  return true;
};

module.exports = {
  isValid,
  isValidBody,
  isValidEmail,
  isValidId,
  isValidPassword,
};
