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
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      userModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};

exports.generateOtp = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

exports.verifyOtp = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
};

exports.createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
};

exports.resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

    try {
      UserModel.findOne({ username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              UserModel.updateOne(
                { username: user.username },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  req.app.locals.resetSession = false; // reset session
                  return res.status(201).send({ msg: "Record Updated...!" });
                }
              );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Username not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};
