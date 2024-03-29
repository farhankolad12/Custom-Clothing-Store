const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Attributes = require("../models/attributeModel");
const Categories = require("../models/categoryModel");
const Products = require("../models/productModel");
const filterQuery = require("../utils/filterQuery");

const handleUpload = require("../utils/uploadImage");

exports.getProductFilters = catchAsyncErrors(async (req, res, next) => {
  return res.status(200).json({
    attributes: await Attributes.find().sort({ createdAt: -1 }),
    categories: await Categories.find().sort({ createdAt: -1 }),
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const { searchParams } = req.query;

  const params = new URLSearchParams(searchParams);
  const sort = params.get("sort");

  const {
    data: products,
    totalPages,
    currentPage,
    totalDocuments,
    startDocument,
    lastDocument,
  } = await filterQuery(searchParams, ["name", "category"], Products, sort);

  return res.status(200).json({
    products,
    totalPages,
    currentPage,
    totalDocuments,
    startDocument,
    lastDocument,
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
    images,
    _id,
  } = req.body;

  const tags = JSON.parse(unTags);
  const variants = JSON.parse(unVariants);
  const combinations = JSON.parse(unCombinations);

  const images1 = [];

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const icon = { id: cldRes.public_id, link: cldRes.url };
    images1.push(icon);
  }

  let newImages = [];

  if (images) {
    newImages = images1.concat(JSON.parse(images));
  }

  if (_id) {
    await Products.updateOne(
      { _id: _id },
      {
        $set: {
          name,
          category,
          combinations,
          fullDescription,
          images: newImages.length ? newImages : images1,
          isFeatured: Boolean(isFeatured),
          price: +price,
          shortDescription,
          tags,
          variants,
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, product: await Products.findOne({ _id: _id }) });
  }

  const newProduct = new Products({
    category,
    fullDescription,
    images: newImages.length ? newImages : images1,
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

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.body;

  await Products.deleteOne({ _id: _id });

  return res.status(200).json({ success: true });
});
