const express = require("express");
const cors = require("cors");

const {
  homePage,
  getCart,
  updateCart,
  updateWishlist,
  getWishlists,
  deleteWishlist,
} = require("../controllers/homeController");
const { isAuthenticate } = require("../middlewares/auth");

const router = express.Router();

router.use(
  cors({
    origin: [process.env.CLIENT_HOST_NAME, process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.route("/home-page").get(homePage);

router.route("/get-cart").get(isAuthenticate, getCart);

router.route("/update-cart").post(isAuthenticate, updateCart);

router.route("/update-wishlist").post(isAuthenticate, updateWishlist);

router.route("/wishlists").get(isAuthenticate, getWishlists);

router.route("/delete-wishlist").post(isAuthenticate, deleteWishlist);

module.exports = router;
