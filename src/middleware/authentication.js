const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};
module.exports = async (req, res, next) => {
  // if we recieve Bearer token
  const breaertoken = req?.headers?.authorization;

  if (!breaertoken || !breaertoken.startsWith("Bearer"))
    return res.status(400).json({
      status: "Failed",
      message: "Please provide correct valid token",
    });
  //if token is no beares then throw error
  const token = breaertoken.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: "Please provide correct valid token",
    });
  }
  //eles we find user by token
  //if no user then throw error
  if (!user)
    return res.status(400).json({
      status: "Failed",
      message: "Please provide correct valid token",
    });
  //else we attach the user to the req
  req.user = user;
  //return next
  return next();
};
