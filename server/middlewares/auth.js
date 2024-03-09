const ErrorHandler = require("../utils/errorhandler");

const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");

exports.isAuthenticate = async (req, res, next) => {
  const { isAdmin } = req.query;

  const token = Boolean(isAdmin) ? req.cookies.adminToken : req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please Login", 401, res));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findById(decodedData.id, { password: 0 });

  if (user) {
    req.user = user;
    return next();
  }

  return next(new ErrorHandler("Please Login", 401, res));
};
