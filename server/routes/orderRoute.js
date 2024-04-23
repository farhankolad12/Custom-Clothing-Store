const express = require("express");
const cors = require("cors");

const { isAuthenticate } = require("../middlewares/auth");
const {
  getOrders,
  getOrder,
  updateStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.use(
  cors({
    origin: [process.env.CLIENT_HOST_NAME, process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.route("/orders").get(isAuthenticate, getOrders);

router.route("/order").get(isAuthenticate, getOrder);

router.route("/update-status").post(isAuthenticate, updateStatus);

module.exports = router;