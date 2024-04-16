const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Categories = require("../models/categoryModel");

const Cart = require("../models/cartModel");
const Products = require("../models/productModel");

exports.homePage = catchAsyncErrors(async (req, res, next) => {
  const date = new Date();

  // Add five days to current date
  date.setDate(date.getDate() - 6);

  const myDate = new Date(date); // Your timezone!
  const myEpoch = myDate.getTime() / 1000.0;

  const featuredProducts = await Products.find({ isFeatured: true }).limit(8);
  const newCollections = await Products.find({
    createdAt: { $gte: myEpoch, $lte: Date.now() },
  }).limit(8);
  const categories = await Categories.find();

  return res.status(200).json({ featuredProducts, newCollections, categories });
});

exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const currentUser = req.user;

  const userCart = await Cart.findOne({ uid: currentUser._id });

  if (!userCart) {
    return res.status(200).json({ products: [] });
  }

  const resData = [];

  for (let i = 0; i < userCart?.products.length; i++) {
    const cartProduct = userCart.products[i];

    const product = await Products.findOne({ _id: cartProduct.productId });

    resData.push({
      ...product._doc,
      quantity: cartProduct.quantity,
      selectedVariantIds: cartProduct.selectedVariationIds,
    });
  }

  return res.status(200).json({
    ...userCart._doc,
    products: resData,
  });
});

exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, selectedVariantIds, quantity } = req.body;

  const currentUser = req.user;

  const userCart = await Cart.findOne({ uid: currentUser._id });

  if (!userCart) {
    const newCart = new Cart({
      uid: currentUser._id,
      products: [
        {
          productId: productId,
          selectedVariationIds: selectedVariantIds,
          quantity,
        },
      ],
    });

    console.log("hello");

    await newCart.save();
    return res.status(200).json({ success: true });
  }

  console.log("world");

  const updatedProducts = [];

  let isProductId = false;

  for (let i = 0; i < userCart?.products.length; i++) {
    const cartProduct = userCart.products[i];

    if (cartProduct.productId === productId) {
      isProductId = true;
      updatedProducts.push({
        ...cartProduct._doc,
        quantity: ++cartProduct.quantity,
      });
    } else {
      updatedProducts.push({
        ...cartProduct._doc,
      });
    }
  }

  if (!isProductId) {
    await Cart.updateOne(
      { uid: currentUser._id },
      {
        $push: {
          products: {
            productId: productId,
            selectedVariationIds: selectedVariantIds,
            quantity,
          },
        },
      }
    );

    return res.status(200).json({ success: true });
  }

  await Cart.updateOne(
    { uid: currentUser._id },
    {
      $set: {
        products: updatedProducts,
      },
    }
  );

  return res.status(200).json({ success: true });
});
