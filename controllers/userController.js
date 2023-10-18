const User = require("../models/user");
const user = require("../models/user");
const BigPromise = require("../middlewares/bigPromise.js");
const customError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const crypto = require("crypto");
const passport = require("passport");
require("dotenv").config();

//sign up controller
exports.signup = BigPromise(async (req, res, next) => {
  //extract data
  const { name, email, password, companyName } = req.body;

  // data validation
  if (!name || !email || !password || !companyName) {
    return next(
      new customError("Name, Email ,CollegeName and  Password are mandatory !")
    );
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(503)
      .json({ success: false, message: "Email already registered" });
  }
  //saving document to db
  User.create({
    name,
    email,
    password,
    companyName,
  })
    .then((user) => {
      cookieToken(user, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: err });
    });
});

//login controller
exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next(new customError("All fields are mandatory !", 400));
  }

  //get user  from the db
  const user = await User.findOne({ email }).select("+password");

  //if user not found in database
  if (!user) {
    return next(
      new customError(
        "Email or password is incorrect or user not registered !",
        404
      )
    );
  }
  //check password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //password is incorrect
  if (!isPasswordCorrect) {
    return next(new customError("Email or password is incorrect !", 404));
  }

  //send cookie token
  cookieToken(user, res);
});

//logout controller
exports.logout = BigPromise(async (req, res, next) => {
  //clear logout token from cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  //success response
  res.status(200).json({
    success: "true",
    message: "Logged out successfull !",
  });
});

//send details to userdashboard
exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//change password
exports.changePassword = BigPromise(async (req, res, next) => {
  //grab user from db
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new customError("Log In first to access !", 400));
  }
  //compare password
  const isCorrectOldPassword = await user.isValidatedPassword(
    req.body.oldPassword
  );

  if (!isCorrectOldPassword) {
    return next(new customError("Old password is incorrect", 400));
  }

  //update to new password
  user.password = req.body.newPassword;

  //save to database
  await user.save();

  //send updated cookie token
  cookieToken(user, res);
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  //checking the data
  // console.log(req.body.formData.get("name"));

  if (
    !(req.body.name && req.body.email && req.body.password && req.body.userId)
  ) {
    return next(
      new customError("Please provide all the data while updating !", 400)
    );
  }
  // console.log(req.body);
  //collect data from the body
  const newData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //update the data in user
  const user = await User.findByIdAndUpdate(req.body.userId, newData, {
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    newData,
  });
});

//get all users info : ADMIN ONLY ROUTE
exports.adminShowAllUsers = BigPromise(async (req, res, next) => {
  //get all users from database
  const users = await User.find();

  //return all users
  res.status(200).json({
    success: true,
    users,
  });
});

//get all users info : MANAGER ONLY ROUTE
exports.managerShowAllUsers = BigPromise(async (req, res, next) => {
  //get all users from database
  const users = await User.find({ role: "user" });

  //return all users
  res.status(200).json({
    success: true,
    users,
  });
});

//get single user info admin
exports.admingetOneUser = BigPromise(async (req, res, next) => {
  // get id from url and get user from database
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError("No user found", 400));
  }

  // send user
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminUpdateOneUserDetails = BigPromise(async (req, res, next) => {
  // add a check for email and name in body

  // get data from request body
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // update the user in database
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.adminDeleteOneUser = BigPromise(async (req, res, next) => {
  // get user from url
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No Such user found", 401));
  }

  // remove user from databse
  await user.remove();

  res.status(200).json({
    success: true,
  });
});
