const express = require("express");
const cors = require("cors");

const { isAuthenticate } = require("../middlewares/auth");
const { addAttributes } = require("../controllers/attributeController");

const router = express.Router();

router.use(
  cors({
    origin: [process.env.CLIENT_HOST_NAME, process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.route("/attributes").post(isAuthenticate, addAttributes);

module.exports = router;
