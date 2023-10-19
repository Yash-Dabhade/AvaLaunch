const Report = require("../models/report");
const BigPromise = require("../middlewares/bigPromise.js");
const customError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const doPrediction = require("../utils/predict");
require("dotenv").config();

//sign up controller
exports.intializeReport = BigPromise(async (req, res, next) => {
  //extract data (category name and subcategory will be in numeric format)
  const { companyName, categoryName, subCategoryName, lowerRange, upperRange } =
    req.body;

  // data validation
  if (
    !companyName ||
    !categoryName ||
    !subCategoryName ||
    !lowerRange ||
    !upperRange
  ) {
    return next(new customError("All fields are are mandatory !"));
  }

  const output = doPrediction(
    categoryName,
    subCategoryName,
    lowerRange,
    upperRange
  );
  //   cookieToken(report, res);
  res.status(200).json({
    success: true,
    message: "Successfully executed",
    data: output,
  });

  //saving document to db
  // Report.create({
  //   companyName,
  //   categoryName,
  //   subCategoryName,
  //   lowerRange,
  //   upperRange,
  // })
  //   .then((report) => {

  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ success: false, message: err });
  //   });
});
