const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

const bcrypt = require("bcrypt");

const Users = require("../models/userModel");
const sendToken = require("../utils/sendToken");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { fname, lname, phone, birthDate, gender, email, pass } = req.body;

  const emailExists = await Users.findOne({ email });

  if (emailExists) {
    return next(new ErrorHandler("Email Already Exists", 401));
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
  const { email, password, remember } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return sendToken({ user, cartItems: [] }, 200, res);
  }

  return next(new ErrorHandler("Email/password is incorrect", 401));
});

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
});
