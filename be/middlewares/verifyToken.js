const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          message: "Invalid access token",
        });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: "Require authenication!!",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "1") throw new Error("Require admin role");
  next();
});
module.exports = {
  verifyAccessToken,
  isAdmin,
};
