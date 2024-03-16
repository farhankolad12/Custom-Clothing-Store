const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Attributes = require("../models/attributeModel");
const Categories = require("../models/categoryModel");

exports.getProductFilters = catchAsyncErrors(async (req, res, next) => {
  return res.status(200).json({
    attributes: await Attributes.find().sort({ createdAt: -1 }),
    categories: await Categories.find().sort({ createdAt: -1 }),
  });
});
