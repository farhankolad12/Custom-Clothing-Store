const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const bcrypt = require("bcrypt");

const Users = require("../models/userModel");
const Orders = require("../models/orderModel");

const sendToken = require("../utils/sendToken");
const filterQuery = require("../utils/filterQuery");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const {
    fname,
    lname,
    phone,
    birthDate,
    gender,
    email,
    pass,
    editing,
    _id,
    currPass,
    newPass,
  } = req.body;

  if (editing) {
    const user = await Users.findOne({ _id: _id });

    if (currPass) {
      if (await bcrypt.compare(currPass, user.password)) {
        await Users.updateOne(
          { _id: _id },
          {
            $set: {
              fname,
              lname,
              email,
              phone,
              password: await bcrypt.hash(newPass, 10),
            },
          }
        );
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Current password is invalid!" });
      }

      return res.status(200).json({ success: true });
    }

    await Users.updateOne(
      { _id: _id },
      {
        $set: {
          fname,
          lname,
          email,
          phone,
        },
      }
    );

    return res.status(200).json({ success: true });
  }

  const emailExists = await Users.findOne({ email });

  if (emailExists) {
    return res
      .status(401)
      .json({ success: false, message: "Email Already Exists" });
  }

  const hashPassword = await bcrypt.hash(pass, 10);

  const user = await Users.create({
    fname,
    lname,
    phone,
    birthDate: new Date(birthDate).getMilliseconds(),
    email,
    gender,
    password: hashPassword,
  });

  sendToken({ user, cartItems: [] }, 200, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, remember, isAdmin } = req.body;

  if (isAdmin) {
    const user = await Users.findOne({ email, role: "admin" });

    if (user && (await bcrypt.compare(password, user.password))) {
      return sendToken({ user, cartItems: [] }, 200, res);
    }

    return res
      .status(401)
      .json({ success: false, message: "Email/password is incorrect" });
  }

  const user = await Users.findOne({ email, role: "customer" });

  if (user && (await bcrypt.compare(password, user.password))) {
    return sendToken({ user, cartItems: [] }, 200, res);
  }

  return res
    .status(401)
    .json({ success: false, message: "Email/password is incorrect" });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  return res
    .status(200)
    .cookie(req.user.role === "customer" ? "token" : "adminToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ success: true });
});

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
});

exports.getCustomers = catchAsyncErrors(async (req, res, next) => {
  const { searchParams } = req.query;

  const params = new URLSearchParams(searchParams);
  const sort = params.get("sort");

  const {
    data: customers,
    totalPages,
    currentPage,
    totalDocuments,
    startDocument,
    lastDocument,
  } = await filterQuery(
    searchParams,
    ["fname", "lname", "email", "phone", "gender"],
    Users,
    sort,
    "or"
  );

  return res.status(200).json({
    customers,
    totalPages,
    currentPage,
    totalDocuments,
    startDocument,
    lastDocument,
  });
});

exports.getAdminUserOrders = catchAsyncErrors(async (req, res, next) => {
  const { searchParams, id } = req.query;

  const params = new URLSearchParams(searchParams);

  const currentPage = Number(params.get("page")) || 1;
  const pageSize = 5;
  const totalDocuments = await Orders.countDocuments({ uid: id });

  const orders = await Orders.find({ uid: id })
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1));

  return res.status(200).json({
    orders,
    totalPages: Math.ceil(totalDocuments / pageSize),
    currentPage,
    totalDocuments,
    startDocument: pageSize * (currentPage - 1) + 1,
    lastDocument: pageSize * (currentPage - 1) + orders.length,
  });
});
