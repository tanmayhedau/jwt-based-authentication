const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];

    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "please enter correct token" });
    }

    jwt.verify(token, "jwt_token_secretkey", (error, decodeToken) => {
      if (error) {
        return res
          .status(400)
          .send({ status: false, message: "token is not correct" });
      }
      req["decodeToken"] = decodeToken;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: `this is catch error ${error.message}` });
  }
};



module.exports = {authentication}