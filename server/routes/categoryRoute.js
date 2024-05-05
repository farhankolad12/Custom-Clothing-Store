const express = require("express");
const cors = require("cors");
const Multer = require("multer");

const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");
const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const router = express.Router();

router.use(
  cors({
    origin: [process.env.CLIENT_HOST_NAME, process.env.CLIENT_ADMIN_HOST_NAME],
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  })
);

router.route("/category").post(isAuthenticate,authorizeRoles("admin"), upload.any(), addCategory);
router.route("/category").get(isAuthenticate, authorizeRoles("admin"), getCategories);
router.route("/remove-category").post(isAuthenticate, authorizeRoles("admin"), deleteCategory);

module.exports = router;
