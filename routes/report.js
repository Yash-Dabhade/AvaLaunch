const express = require("express");
const router = express.Router();
const passport = require("passport");

//calling controllers
const { intializeReport } = require("../controllers/reportController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

//setting user routes
router.route("/report/intialize").post(isLoggedIn, intializeReport);

module.exports = router;
