const mongoose = require("mongoose");
const validator = require("validator");

const reportSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  categoryName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  subCategoryName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  lowerRange: {
    type: String,
    default: "100",
  },
  upperRange: {
    type: String,
    default: "1000",
  },
  createdAt: {
    type: Date,
    default: Date.now, // don't write with paranthesis to make it execute when instance is created
  },
});

module.exports = mongoose.model("Report", reportSchema);
