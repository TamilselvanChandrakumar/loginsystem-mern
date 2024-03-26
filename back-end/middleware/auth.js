const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrive the user details fo the logged in user
    const decodedToken = await jwt.verify(token, process.env.JWT_TOKEN);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
};

const localVariables = function (req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

module.exports = { Auth, localVariables };
