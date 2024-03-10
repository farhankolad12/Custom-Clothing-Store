const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Attributes = require("../models/attributeModel");

exports.addAttributes = catchAsyncErrors(async (req, res, next) => {
  const { title, displayName, type, options, _id } = req.body;

  if (_id) {
    await Attributes.updateOne(
      { _id: _id },
      { $set: { title, displayName, type, options } }
    );

    return res.status(200).json({
      success: true,
      attribute: await Attributes.findOne({ _id: _id }),
    });
  }

  const attribute = new Attributes({
    displayName,
    options,
    title,
    type,
  });

  await attribute.save();

  return res.status(200).json({ success: true, attribute });
});

exports.getAttributes = catchAsyncErrors(async (req, res, next) => {
  const { searchParams } = req.query;

  const params = new URLSearchParams(searchParams);

  const currentPage = Number(params.get("page")) || 1;
  const pageSize = 5;

  const filterQuery = {
    $or: [
      { displayName: { $regex: params.get("query") || "", $options: "i" } },
      { title: { $regex: params.get("query") || "", $options: "i" } },
    ],
  };

  const totalDocuments = await Attributes.countDocuments(filterQuery);

  const attributes = await Attributes.find(filterQuery)
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .sort({ createdAt: -1 });

  return res.status(200).json({
    attributes,
    totalPages: Math.ceil(totalDocuments / pageSize),
    currentPage,
    totalDocuments,
    startDocument: pageSize * (currentPage - 1) + 1,
    lastDocument: pageSize * (currentPage - 1) + attributes.length,
  });
});

exports.deleteAttribute = catchAsyncErrors(async (req, res, next) => {
  await Attributes.deleteOne({ _id: req.body._id });

  return res.status(200).json({ success: true });
});
