const express = require("express");
const router = express.Router();
const passport = require("passport");

//calling controllers
const {
  signup,
  login,
  logout,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminShowAllUsers,
  admingetOneUser,
  adminUpdateOneUserDetails,
  adminDeleteOneUser,
} = require("../controllers/userController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

//setting user routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

//injecting first middleware and then user controller function
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(updateUserDetails);

//admin only routes
router
  .route("/admin/users")
  .get(isLoggedIn, customRole("admin"), adminShowAllUsers);
router
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), admingetOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetails)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOneUser);

module.exports = router;
