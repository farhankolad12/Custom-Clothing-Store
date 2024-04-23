const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const jwt = require("jsonwebtoken");

const Cart = require("../models/cartModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");
const Categories = require("../models/categoryModel");
const Wishlists = require("../models/wishlistModel");
const ErrorHandler = require("../utils/errorhandler");

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

  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({
      featuredProducts: featuredProducts,
      newCollections,
      categories,
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findOne(
    { _id: decodedData.id, role: "customer" },
    { password: 0 }
  );

  const fProducts = [];
  const cProducts = [];

  if (user) {
    for (let i = 0; i < featuredProducts.length; i++) {
      const product = featuredProducts[i];
      const collectionProduct = newCollections[i];

      const inWishlist = await Wishlists.countDocuments({
        uid: user._id,
        products: { $elemMatch: { productId: product._id } },
      });

      const inWishlist1 = await Wishlists.countDocuments({
        uid: user._id,
        products: { $elemMatch: { productId: collectionProduct._id } },
      });

      if (inWishlist1 > 0) {
        cProducts.push({ ...collectionProduct._doc, inWishlist: true });
      } else {
        cProducts.push({ ...collectionProduct._doc, inWishlist: false });
      }

      if (inWishlist > 0) {
        fProducts.push({ ...product._doc, inWishlist: true });
      } else {
        fProducts.push({ ...product._doc, inWishlist: false });
      }
    }
  }

  return res.status(200).json({
    featuredProducts: user ? fProducts : featuredProducts,
    newCollections: user ? cProducts : newCollections,
    categories,
  });
});

exports.getWishlists = catchAsyncErrors(async (req, res, next) => {
  const currentUser = req.user;

  const wishlists = await Wishlists.findOne({ uid: currentUser._id });

  const resWishlists = [];

  for (let i = 0; i < wishlists.products.length; i++) {
    const wishlistProduct = wishlists.products[i];

    const product = await Products.findOne({ _id: wishlistProduct.productId });

    resWishlists.push({ ...product._doc, inWishlist: true });
  }

  return res.status(200).json(resWishlists);
});

exports.deleteWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const currentUser = req.user;

  await Wishlists.updateOne(
    { uid: currentUser._id },
    { $pull: { products: { productId } } }
  );

  return res.status(200).json({ success: true });
});

exports.updateWishlist = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const currentUser = req.user;

  const inWishlist = await Wishlists.findOne({
    uid: currentUser._id,
  });

  if (
    inWishlist &&
    inWishlist.products.some((product) => product.productId === productId)
  ) {
    await Wishlists.updateOne(
      {
        uid: currentUser._id,
        products: { $elemMatch: { productId } },
      },
      {
        $pull: {
          products: { productId },
        },
      }
    );
  } else if (
    inWishlist &&
    !inWishlist.products.some((product) => product.productId === productId)
  ) {
    await Wishlists.updateOne(
      {
        uid: currentUser._id,
      },
      {
        $push: {
          products: {
            productId,
          },
        },
      }
    );
  } else {
    const newWishlist = new Wishlists({
      uid: currentUser._id,
      products: [
        {
          productId,
        },
      ],
    });

    await newWishlist.save();
  }

  return res.status(200).json({ success: true });
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
      selectedCombination: cartProduct.selectedCombination,
    });
  }

  if (resData.length) {
    return res.status(200).json({
      ...userCart._doc,
      products: resData,
    });
  }

  return res.status(200).json({
    products: [],
  });
});

exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, selectedVariantIds, quantity, selectedCombination } =
    req.body;

  if (quantity === 0) {
    return next(new ErrorHandler("Please select quantity bigger than 0", 401));
  }

  const currentUser = req.user;

  const userCart = await Cart.findOne({ uid: currentUser._id });

  if (!userCart) {
    const newCart = new Cart({
      uid: currentUser._id,
      subTotalPrice: selectedCombination.salePrice * quantity,
      totalPrice: selectedCombination.salePrice * quantity,
      products: [
        {
          productId: productId,
          selectedVariationIds: selectedVariantIds,
          quantity,
          selectedCombination,
        },
      ],
    });

    // console.log("hello");

    await newCart.save();
    return res.status(200).json({ success: true });
  }

  // console.log("world");

  let updatedProducts = [];

  let isProductId = false;
  const subTotalPrice = userCart?.products.some(
    (productC) =>
      productC.productId === productId &&
      productC.selectedCombination.id === selectedCombination.id
  )
    ? (userCart?.subTotalPrice || 0) +
      selectedCombination.salePrice * quantity -
      selectedCombination.salePrice
    : (userCart?.subTotalPrice || 0) + selectedCombination.salePrice * quantity;

  await (async () => {
    userCart?.products.some(
      (productC) =>
        productC.productId === productId &&
        productC.selectedCombination.id === selectedCombination.id
    )
      ? (updatedProducts = userCart?.products.map((productC) => {
          isProductId = true;
          return productC.productId === productId &&
            productC.selectedCombination.id === selectedCombination.id
            ? { ...productC._doc, quantity }
            : productC._doc;
        }))
      : userCart?.products.some(
          (productC) =>
            productC.productId === productId &&
            productC.selectedCombination.id !== selectedCombination.id
        )
      ? (updatedProducts = [
          ...userCart?.products,
          {
            productId,
            quantity,
            selectedVariantIds,
            selectedCombination,
          },
        ])
      : [];
  })();

  if (!isProductId) {
    await Cart.updateOne(
      { uid: currentUser._id },
      {
        $push: {
          products: {
            productId: productId,
            selectedVariationIds: selectedVariantIds,
            selectedCombination,
            quantity,
          },
        },
        $set: {
          subTotalPrice,
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
        subTotalPrice,
      },
    }
  );

  return res.status(200).json({ success: true });
});

exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, selectedCombination, quantity } = req.body;
  const currentUser = req.user;

  const cartItems = await Cart.findOne({ uid: currentUser._id });

  await Cart.updateOne(
    { uid: currentUser._id },
    {
      $pull: { products: { "selectedCombination.id": selectedCombination.id } },
      $set: {
        subTotalPrice: cartItems?.products.some(
          (productC) =>
            productC.productId === productId &&
            productC.selectedCombination.id === selectedCombination.id
        )
          ? (cartItems?.subTotalPrice || 0) -
            selectedCombination.salePrice * quantity /*  -
              product.selectedCombination.salePrice */
          : (cartItems?.subTotalPrice || 0) +
            selectedCombination.salePrice * quantity,
      },
    }
  );

  return res.status(200).json({ success: true });
});