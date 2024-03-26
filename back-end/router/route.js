const contorller = require("../controller/appController.js");
const router = require("express").Router();

// post methods
router.route("/register").post(contorller.register); //register user
// router.route("/registerMail").post(); //send the mail
router.route("/authenticate").post((req, res) => res.end("autenticate")); //authenticate user
router.route("/login").post(contorller.verfiedUser, contorller.login); //login app

// get methods
router.route("/user/:username").get(contorller.getUser); //user with username
router.route("generateOtp").get(contorller.generateOtp); //generate random otp
router.route("/verifyOtp").get(contorller.verifyOtp); //verify generated otp
router.route("/createResetSession").get(contorller.createResetSession); //reset all variables

// put methods
router.route("/updateUser").put(contorller.updateUser); //update the user profle
router.route("/resetPassword").put(contorller.resetPassword); //use to reset password

module.exports = router;
