const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Attributes = require("../models/attributeModel");

exports.addAttributes = catchAsyncErrors(async (req, res, next) => {
  const { title, displayName, type, options } = req.body;

  const attribute = new Attributes({
    displayName,
    options,
    title,
    type,
  });

  await attribute.save();

  return res.status(200).json({ success: true });
});
