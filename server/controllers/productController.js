const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Attributes = require("../models/attributeModel");
const Categories = require("../models/categoryModel");
const Products = require("../models/productModel");

const handleUpload = require("../utils/uploadImage");

exports.getProductFilters = catchAsyncErrors(async (req, res, next) => {
  return res.status(200).json({
    attributes: await Attributes.find().sort({ createdAt: -1 }),
    categories: await Categories.find().sort({ createdAt: -1 }),
  });
});

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    shortDescription,
    fullDescription,
    price,
    isFeatured,
    category,
    tags: unTags,
    variants: unVariants,
    combinations: unCombinations,
    _id,
  } = req.body;

  const tags = JSON.parse(unTags);
  const variants = JSON.parse(unVariants);
  const combinations = JSON.parse(unCombinations);

  const images = [];

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const icon = { id: cldRes.public_id, link: cldRes.url };
    images.push(icon);
  }

  const newProduct = new Products({
    category,
    fullDescription,
    images,
    isFeatured: Boolean(isFeatured),
    name,
    price: +price,
    shortDescription,
    tags,
    variants,
    combinations,
  });

  await newProduct.save();

  return res.status(200).json({ success: true, newProduct });
});
