const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// middleware for verfified user:

exports.verfiedUser = async (req, res, next) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;
    let exist = await userModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "can't find user" });
    next();
  } catch (err) {
    return res.status(404).send({ error: "Authentication error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // Check if username already exists
    const existUserName = userModel.findOne({ username }).exec();

    // Check if email already exists
    const existEmail = userModel.findOne({ email }).exec();

    Promise.all([existUserName, existEmail])
      .then(([existingUser, existingEmail]) => {
        if (existingUser) {
          throw new Error("Please use a unique username");
        }
        if (existingEmail) {
          throw new Error("Please use a unique email");
        }

        // Hash password
        return bcrypt.hash(password, 10);
      })
      .then((hashedPassword) => {
        // Create new user
        const user = new userModel({
          username,
          email,
          password: hashedPassword,
          profile: profile || "",
        });

        // Save user to database
        return user.save();
      })
      .then(() => {
        // Return success response
        res.status(201).send({ msg: "User registration successful" });
      })
      .catch((error) => {
        // Return error response
        res.status(500).send({ error: error.message });
      });
  } catch (error) {
    // Handle synchronous errors
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    userModel
      .findOne({ username })
      .then((user) => {
        bcrypt.compare(password, user.password).then((passwordcheck) => {
          if (!passwordcheck)
            return res.status(400).send({ error: "Dont have a password" });

          // craeate jwt token
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "24h",
            }
          );

          return res.status(200).send({
            msg: "Login successfull...!",
            usrname: user.username,
            token,
          });
        });
      })
      .catch((err) => {
        return res.status(404).send({ error: "Username not found" });
      });
  } catch (err) {
    return res.status(500).send({ error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);

    if (!username) {
      return res.status(400).send({ error: "Invalid username" });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  res.json("updateUser route");
};

exports.generateOtp = async (req, res) => {
  res.json("generateOtp route");
};

exports.verifyOtp = async (req, res) => {
  res.json("verifyOtp route");
};

exports.createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

exports.resetPassword = async (req, res) => {
  res.json("resetPassword route");
};
